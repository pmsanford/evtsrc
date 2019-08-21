import gevent
from flask import Flask, Response, jsonify
import random
import json

app = Flask(__name__)

def poll_results():
    # Send the first event, which is just a notification the results
    # are still pending.
    yield "event: jobinitiated\ndata: {}\n\n"
    # This counter will represent our database
    counter = 0
    while True:
        # instead of checking the counter, we'd check for results in the
        # database here
        if counter == 5:
            yield f"event: jobprogress\ndata: {json.dumps(dict(counter_value=counter))}\n\n"
        elif counter == 10:
            yield f"event: jobfinished\ndata: {json.dumps(dict(counter_value=counter))}\n\n"
            return
        else:
            yield ":non-event comment - to keep connection alive\n\n"
        counter += 1
        gevent.sleep(1)

@app.route("/rest/get_results")
def generate_results():
    resp = Response(poll_results(), mimetype="text/event-stream")
    resp.headers["Cache-Control"] = "no-cache"
    resp.headers["X-Accel-Buffering"] = "no"
    return resp

@app.route("/rest/sync_results")
def sync_results():
    return jsonify(dict(counter_value=random.randint(1, 100)))