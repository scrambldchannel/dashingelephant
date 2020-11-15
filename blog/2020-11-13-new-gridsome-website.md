---
title: Moving on to Gridsome
path: /new-gridsome-website
date: 2020-11-13
summary: I've been using Pelican, a static site generator written in Python, to generate my blog. I wanted to try something new an shiny and wanted to leverage some of the tools in the Jamstack ecosystem. Given I've already played with Vue, Gridsome seemed like a good choice.
tags: ['netlify', 'gridsome', 'vue', 'jamstack', 'forestry']
---

I've been using Pelican, a static site generator written in Python, to generate my blog. I wanted to try something new an shiny and wanted to leverage some of the tools in the Jamstack ecosystem. Given I've already played with Vue, Gridsome seemed like a good choice.

### Motivation

Pelican has been good fun to use and when I set it up initially, I was attracted to the idea of static site generators for the speed and security benefits but I was comfortable with Python and wanted something relatively simple. I'm hardly a frequent bloger, I tend to prefer messing with the technology behind websites rather than producing content so from a self indulgent perspective, I want to play with some new tools.

I've kept javascript at arm's length until now but that's were all the interesting web stuff is happening and learning at least a little bit more won't hurt. I've also got a couple of small websites to build for others and I wanted to start assembling a basic stack that would allow me to role out small to medium sites and wanted to explore a CDN solution to host the site and find a nice headless CMS to allow my clients to edit content easily. 

### My work in progress stack

It's a work in progress but here are some of the tools I've chosen so far and some quick thoughts on them. 

#### Gridsome

When I started thinking about this, I wanted to use a static site generator written in javascript. Despite this, I did look at Hugo (written in Go) but while it's a great tool, the small sites I'm building don't need to optimised for build time which seems to a main selling point. So looking at the javascript world, I thought about Eleventy, Gatsby and Gridsome. Eleventy I discarded pretty early on as I thought I might as well try to learn a modern javascript framework.

Working briefly with the original Angular had left me scarred though. While Gatsby gets rave reviews, I'd already lent towards Vue over React, largely because it promises an easier learning curve. Gridsome is relatively new but is often described as Gatsby for Vue. I looked very briefly at Nuxt too but I felt it probably did more than I really needed, however unfair that is. 

So Gridsome it is and I loved how quickly I was able to get up and running. Indeed, if you have basic knowledge of HTML/CSS, git, the command line and can install a node package, you can probably knock out a starter site in a matter of minutes. To do so, you don't really need to know much about Vue or Graphql to get going either. The built in Graphql developer tool makes it easier to play with queries once you're ready.

#### Netlify

Delivering sites from CDN's is all the rage now and Netlify seemed the obvious choice. The free plan gives you 300 minutes a month build time and a much bigger data quota than I'm ever likely to need. I've been hacking away furiously so 300 minutes actually doesn't seem that much. Each build of my simple site takes about a minute and I've not really tried to restrain myself. I'm sure it will be enough if I'm a little bit more sensible. 

One other thing that attracted me was their built in forms service. It promises that with minimal effort, you can add a form to your static site and their form service will capture the input and forward it to you. It's limited but I am unlikely to get that many messages. It has proved a little bit more fiddly than I'd hoped but I think the complication is more on the Gridsome side and I've got it working now.

One thing that can be a bit frustrating is finding that a site that works perfectly in your local dev environment doesn't work properly once deployed to Netlify. I've run into this a couple of times and found a couple of things magically resolved themselves without me really understanding what had fixed it. I'm sure I'll get better at it. There is a docker image that simulates their build process that you can use for debugging without burning build minutes. I haven't worked with it in depth yet. 

#### Forestry

While I like hacking markdown files together in vscode to produce content, not everyone is going to be down with that. I settled on using Forestry pretty early as it provides a nice, customisable interface for you (or your clients) to update content. Everything they enter gets pushed to git so you get that audit trail out of the box without users having to worry about whatever a commit is. 

I mainly chose Forestry because I was playing with a Gridsome starter template that had it baked in. I've found it nice enough and I should be OK on the free plan for my needs. It's also cool that you can continue to edit content manually if you like and it will read them from git and show them in the frontend. It also allows me to easily check created content with Grammarly to weed out any glaring errors.

I did struggle to provide an interface that would easily help manage one to many relationships between graph nodes but that's probably me being a newbie rather than a problem with Forestry. I'm going to sit one of my clients down with it in a week and see how she finds it. 

#### Other stuff

A few other things that I'm playing around with but am less settled on.

##### Snipcart

One of my clients is interested in setting up a simple shop so I've got a PoC ready to show them of Snipcart enabled in their site. This was relatively easy to get up and running and there's no fixed cost involved, they just charge a percentage. You also need a payment gateway setup so that will be someone else to pay but I'm hoping to find a solution with minimal initial outlay. Shopify's monthly rates are just way to high to justify for the kind of businesses I'm supporting. 

##### Vuetify

I started playing around with Vuetify which I think will be great for the retail site I'm working on. I feel a little bit as though I don't quite understand what's going on beneath well enough to really use it properly yet.

##### Tailwind

I've heard a bit about Tailwind.css too and have added it this site. I confess that messing around with css is one of my least favourite things so anything that can help is much appreciated!

##### Charts

For my blog, I really want to be able to easily embed graphics and visualisations. I'm trying to find a good choice for my use cases that will integrate well with Gridsome. Charts.js looks interesting and people seem to use it happily with Vue, I just can't find a detailed how to for Gridsome. 

And much more.... While I've got some time off, I'm happily falling down the Gridsome rabbit hole.