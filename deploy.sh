#!/bin/sh

heroku container:push web --app bucketfinder
heroku container:release web
