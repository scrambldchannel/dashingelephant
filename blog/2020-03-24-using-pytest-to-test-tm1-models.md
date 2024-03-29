---
title: Using pytest to test TM1 models
date: 2020-03-24
summary:
  I wanted an excuse to explore TM1py in more depth and had been thinking for
  a while about the possibilities offered by using a test framework like pytest to
  run automate tests of a TM1 model. This is really a quick proof of concept to gauge
  how feasible it might prove.
tags:
  - tm1
  - python
  - pytest
  - tm1py
---

I wanted an excuse to explore TM1py in more depth and had been thinking for a while about the possibilities offered by using a test framework like pytest to run automated tests of a TM1 model. This is really a quick proof of concept to gauge how feasible it might prove.

### Environment setup

TM1py requires python 3.6 or greater and can be installed using pip:

```bash{promptUser: "alex"}{promptHost: "thinky"}
pip install TM1py
```

We also need pytest to run our tests:

```bash{promptUser: "alex"}{promptHost: "thinky"}
pip install pytest
```

### Create a PoC of a test in pytest

A pytest file is just a simple python script and tests can be straightforward easy to read functions and fixture management quite straightforward once you've got your head around it. I created a simple bit of boilerplate to manage the config and connection and a couple of trivial tests.

#### Setup the test

I created a file and added the following lines of code:

```python{codeTitle: "test_poc.py"}
import pytest
import json
from TM1py.Services import TM1Service

# read in connection configuration
with open('connection_settings.json') as f:
  config = json.load(f)

# create connection to TM1 as a fixture
@pytest.fixture(scope="session")
def tm1_dev():
    with TM1Service(**config['tm1_dev']) as tm1:
        yield tm1
```

This imports a few things, reads a config file with connection details and then creates an instance of the TM1Service class from TM1py as a fixture called `tm1_dev`. This object manages our connections to the TM1 REST API and can be passed to each test as an argument.

Here is an example of how the connection settings might look:

```json{codeTitle: "connection_settings.py"}
{
    "tm1_dev" : {
        "address" : "localhost",
        "port" : 12345,
        "user" : "Admin",
        "password" : "anything_but_apple",
        "ssl" : false
    }
}
```

#### Now for some actual tests

Tests essentially run a bit of code and then make sure the result is within the desired parameters based on the input. The tests themselves don't do anything particularly interesting but illustrate the idea. Note each of these take the the `tm1_dev` fixture as an argument so can access its methods for communicating with TM1 API.

```python{codeTitle: "test_poc.py"}
def test_cube_exists(tm1_dev):
    assert tm1_dev.cubes.exists("}ClientGroups")

def test_dimension_exists(tm1_dev):
    assert tm1_dev.dimensions.exists("}Clients")

def test_value(tm1_dev):
    cube_name = "}ClientGroups"
    data = tm1_dev.cubes.cells.get_value(cube_name, "Admin,ADMIN")
    assert data == "ADMIN"
```

The tests can now be run from the command line with:

```bash{promptUser: "alex"}{promptHost: "thinky"}
$ pytest ./test_poc.py
```

If everything goes well (and these tests should pass), you'll receive a summary that looks something like this:

```
I need to insert the pytest output here
```
