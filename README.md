## Server Sent Events

This app is a fairly minimal example of how to generate and handle server-sent events with nginx, uwsgi, flask, and gevent.

**Note:** Both the Flask and webpack development servers are incapable of handling SSE. You must build and run the dockerfile to test this out:

1. In the repo root, run `docker build . -t evtsrc && docker run --rm -p 5000:80 evtsrc`
2. Visit [http://localhost:5000](http://localhost:5000) in a browser.

### Important notes

* The [custom_nginx.conf](custom_nginx.conf) file has some proxy options that are important for SSE to work. You might want to only set them on the paths you expect to serve streaming events.
* The [main.py](main.py) method sets headers that are important to get nginx (and anything else between your server and the client) to cooperate with SSE.
* The client side portions are pretty standard; You can read about them at the [EventSource page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)