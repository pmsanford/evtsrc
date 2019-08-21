## Server Sent Events

This app is a fairly minimal example of how to generate and handle server-sent events with nginx, uwsgi, flask, and gevent.

**Note:** Both the Flask and webpack development servers are incapable of handling SSE. You must build and run the dockerfile to test this out:

1. In the repo root, run `docker build . -t evtsrc && docker run --rm -p 5000:80 evtsrc`
2. Visit [http://localhost:5000](http://localhost:5000) in a browser.