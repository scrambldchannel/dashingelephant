---
title: Hack to autogenerate TM1py convenience functions for reading data from cubes
date: 2022-10-08
summary: I'm currently building a testing and validation framework using python for a very old an uirky TM1 model. TM1py provides all the functionality you need to pull data from a cell but I found myself writing wrappers for specific cubes to make this a bit easier. Rather than writing them all by hand, I hacked together this little script to autogenerate the code so I thought I'd share it in case someone else had a similar need.
tags:
  - tm1
  - python
  - hack
---

I'm currently building a testing and validation framework using python for a very old an uirky TM1 model. TM1py provides all the functionality you need to pull data from a cell but I found myself writing wrappers for specific cubes to make this a bit easier. Rather than writing them all by hand, I hacked together this little script to autogenerate the code so I thought I'd share it in case someone else had a similar need.

### Using TM1py's `get_value` method

TM1py gives you the ability to read a value from a cell via the `get_value` method of the [CellService object](https://github.com/cubewise-code/tm1py/blob/master/TM1py/Services/CellService.py). This provides functionality much akin to the native TM1 `DB` function used in rules and TI.

```python
cube = "Sales Planning"

intersection = f"Actuals, Base Case, 202301, EMEA, Direct, Widget No. 5, Amount"

# "tm1" is an instance of a TM1py TM1Service object
val = tm1.cells.get_value(cube, intersection)

```

**Note:** I've provided unqualified element names here but you can specific a different hierarchy, see the TM1py code for details.

This is perfectly adequate but I found myself creating an internal library of "wrapper" functions that made fetching data from a specific cube a bit more intuitive. These tended to look something like this (although names have been changed to protect the guilty):

```python
def get_value_sales_planning(tm1, version, scenario, month, region, channel, product, measure):

    cube = "Sales Planning"

    intersection = f"{version}, {scenario}, {month}, {region}, {channel}, {product}, {measure}"

    val = tm1.cells.get_value(cube, intersection)

    if val is None:
        val = 0

    return val

```

There's nothing particularly complicated going on and it may look like a lot of typing for not much action. It does cast `None` to `0` (which I always end up doing anyway and am yet to find a reason not to) however the real value, to me at least, is the usability gain when using an IDE like vscode. If I'm using this function, I can simply hover over it and get a helpful reminder of the **order of the dimensions** in the cube. This is especially helpful if you're grappling with a model within which there is no consist ordering.

**As an aside, please try to use a consistent ordering system when building new models**. That is, ensure that every non trivial cube uses the same core dimensions and places them in the same order. If your team hasn't done that, think seriously about fixing that. It makes development so much easier, especially given that an invalid `DB` statement in a cube rule will just fail silently (although improved tooling has mitigated against this).

### Create Python code with Python

Very meta, I know but after creating a handful of such functions, and looking with sadness at the 80 or so remaining model cubes, I realised it would be pretty easy to generate the code automatically by just looping through the cubes using the API. So in less time than it's taken me to write this blog post, I came up with this simple, if unnatractive, code:

```python
def write_func(cube: Cube):

    # ensure string is a valid python var/function name
    cube_name = cube.name.lower().replace(" ", "_").replace("-", "_").replace("}", "_")

    params = ""
    intersection = ""

    for d in cube.dimensions:

        d_original_name = d

        # I ran into dimensions that start with numbers which made me a bit sad
        if d[0].isnumeric():

            d = "_" + d

        # replace everything that will cause a problem with underscores
        d = d.lower().replace(" ", "_").replace("-", "_").replace("}", "_")

        # add in a type hint for the param, why not since we're automating?
        params = params + f"{d.lower()}: str, "
        intersection = intersection + "{" + d.lower() + "},"

    params = params.removesuffix(", ")
    intersection = intersection.removesuffix(",")

    measure_param = intersection.split(",")[-1].removeprefix("{").removesuffix("}")
    measures_dim = tm1.dimensions.get(d_original_name)

    string_measures = []
    for h in measures_dim.hierarchies:
        for el_name, el in h.elements.items():
            if el.element_type.__str__() == "String":
                string_measures.append(el_name)


    if string_measures:
        string_measures_string = "["
        return_type = "Union[float, str]"

        for m in string_measures:
            string_measures_string = string_measures_string + f'"{m}", '

        string_measures_string = string_measures_string + "]"

        return_statement = f"""if val is None:
        if {measure_param} in {string_measures_string}:
            val = ""
        else:
            val = 0

    return val"""

    else:
        return_type = "float"
        return_statement = """if val is None:
        val = 0

    return val"""

    return f'''
def get_value_{cube_name}(tm1: TM1Service, {params}) -> {return_type}:

    cube = "{cube_name}"

    intersection = f"{intersection}"

    val = tm1.cells.get_value(cube, intersection)

    {return_statement}
'''
```

I iterated on this code a bit to drive out edge cases (cubes and dims starting with or containing problematic characters). I did briefly play with using a library like [stringcase](https://github.com/okunishinishi/python-stringcase) to convert everything to snake case (i.e. pythonic names) but I was dealing with a bunch of cubes with weird names like `cBSPL_xyz` and it gave me something like `c_B_S_P_L_xyz` which didn't seem ideal but the code I've written does result in function names prefixed with and underscore which may offend purists.

Once I had it working it was easy to also add type hints and attempt to detect whether the cube contained string measures and thus should return a string (though full disclosure, I haven't actually tested the string part yet!). One other slight drawback is that I found the dimension names weren't always particularly useful names. For example I've learned that `dCntObj3` is better described as the `Project` dimension so when I wrote the functions by hand, I used the more meaningful name. The root cause is really that the dimension has a crap in the first place, I'm not accepting any blame there.

Given the function that writes the wrapper function, it's trivial to loop through the cubes and spew the result to stdout and direct that to a file of your choice. You could change this to include model cubes if that was your thing.

```python
imports = """from typing import Union
from TM1py import TM1Service
"""

print(imports)

for c in tm1.cubes.get_model_cubes():

    # write_func(c)
    print(write_func(c))
```

### Code and possible enhancements

I've stuck the rough PoC in [https://github.com/scrambldchannel/tm1py_wrapper_gen](a Github Repo). This was a quick hack that helped me get productive on a project and while I originally started thinking about using djinja templates and other fancy tools, fstrings took me a long way. A quick fiddle might be to use cube and dimension aliases to improve the readability of the generated code but that feels like a laborious workaround for a poorly designed model.

I did wonder if it would be possible to create a [Cookiecutter template](https://github.com/cookiecutter/cookiecutter) but not sure how the auth part would work (but it's a fun idea). This I might explore as it would be the ideal way to share this hack more widely.

One other idea I had was that rather than creating a bunch of functions that use a `TM1Service` object as a parameter, I could instead generate a custom subclass of `TM1Service` for a given TM1 model. This would obviously result in a bloated object but does that really matter if you're generating the code?

There are probably other functions you could feasibly autogenerate. The only thing that springs to mind is to fetch specific attribute values for dimension elements but maybe there are other options.

Anyway, it was a fun hack on a Friday.
