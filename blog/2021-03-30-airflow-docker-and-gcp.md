---
title: Airflow, Docker and GCP - from PoC to Production
date: 2021-03-30
summary: We're implementing Apache Airflow at work to manage our data stack. I thought I'd keep track of how to get Airflow up and running in GCP.
tags:
- apache
- airflow
- python
- docker
- google
- gcp

---

I'm a big fan of Airflow for orchestrating data pipelines. We're starting to use it at work and I wanted to document the decisions we made along the way. Our use case is anything but "big", at least in terms of data, but an orchestration tool like Airflow can definitely solve some problems for us. We use Big Query as our data warehouse solution and are mainly pulling data in via federated queries that hit a replica of the app's MySQL database. Thus far we've managed to manage the reporting stack using Terraform to create views and scheduled jobs to fill tables but it's messy and we've hit all sorts of issues with Terraform dependency hell. Terraform was great for deploying changes to our stack of views into a new Big Query dataset for testing but made it really easy to kill or truncate tables. 

So enter Airflow as a way to pull the strings to get our data where we wanted it. Other solutions exist but within the team we had a bit of experience already so it was a no brainer from that perspective. I promise that one day I'll go an check out options like Luigi and Oozie but I couldn't really justify the effort at this point given I knew Airflow could do what we needed it to this time.

As a first step, I wanted to create a simple PoC running locally. This is where Docker comes in, it allows us to run a containerised Airflow instance on most operating systems with a minimum of fuss. This avoids any need to install all the supporting Python libraries or database server stuff that Airflow uses, instead we can just run a ringfenced environment that we can start and stop at our leisure. This will, of course, require Docker to be installed.

## Installing Docker and Docker Compose

So I'm on Ubuntu (side note, it's pretty awesome to finally have a job where I don't need to run Windows on my workstation machine). That said, as of the time of writing, getting it all up and running on Ubuntu 20.04. Initially, I tried installing all the Docker stuff via the standard Ubuntu repos but as per the docs for the official Airflow docker image, this requires a docker-compose version >= 1.27.0 which the version in the repos didn't fulfill. Instead, I followed the instructions from Docker on how to install [docker engine](https://docs.docker.com/engine/install/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/).

As an aside, running Docker Compose as a unelevated user on Ubuntu gave a permissions error by default. You can run it using sudo but it's more elegant to add your user to the docker group and run without recourse to sudo. This can be done as follows:

`sudo usermod -aG docker $USER`

You can check that it has taken effect by running `groups` to get a list of the groups you're in. You will probably need to restart your shell for this to take effect. 

You also want to restart the docker daemon:

`sudo service docker restart`

## Setup and run Airflow

Docker Compose is a tool that manages running of multi-container applications. In simple terms, it reads a definition of an application in YAML format and then with a single command allows you to create and start all the services your application requires. To run Airflow via Docker Compose, all you need to do is download the YAML file, set up some directories it expects by default and then Docker Compose will do the rest. To paraphrase the [Airflow docs](https://airflow.apache.org/docs/apache-airflow/stable/start/docker.html), all I had to do was:

Download the YAML file for the latest version:

`curl -LfO 'https://airflow.apache.org/docs/apache-airflow/2.0.1/docker-compose.yaml'`

Create some directories Airflow will expect:

`mkdir ./dags ./logs ./plugins`

Create a basic .env file:

`echo -e "AIRFLOW_UID=$(id -u)\nAIRFLOW_GID=0" > .env`

Then initialise the db (this only needs to be done once):

`docker-compose up airflow-init`

This may take a while as it will download any containers defined in the `docker-compose.yaml` file. Once this has completed, Airflow can be started by running:

`docker-compose up`

At this point, it's probably worth having a bit of a look at the `docker-compose.yaml` file. 