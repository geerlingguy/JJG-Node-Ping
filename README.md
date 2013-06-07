# JJG Node Ping

by Jeff Geerling, originally created in 2013.

## Description

JJG Node Ping is a simple ping wrapper for Node.js which returns the latency and
result of a ping to a given address.

## Installation

Use NPM:

    $ npm install jjg-ping

## Usage

    // Use the jjg-ping library.
    var ping = require('jjg-ping');

    // Ping google.com.
    ping.system.ping('google.com', function(latency, status) {
        if (status) {
            // Host is reachable/up. Latency should have a value.
            console.log('Google is reachable (' + latency + ' ms ping).');
        }
        else {
            // Host is down. Latency should be 0.
            console.log('Google is unreachable.');
        }
    });

## Why jjg-ping?

Because Node.js' package manager, npm, doesn't support namespacing (as of 2013),
and ping, node-ping, and all the other namespaces I wanted were already taken.

## License

JJG Node Ping is licensed under the MIT (Expat) License.
