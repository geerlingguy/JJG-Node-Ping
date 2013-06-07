<img src="https://raw.github.com/geerlingguy/JJG-Node-Ping/master/Resources/Ping-Logo.png" alt="Ping for Node.js Logo" />

# JJG Ping

JJG Ping is a simple ping wrapper for Node.js which returns the latency and result of a ping to a given address.

Ping was created by [Jeff Geerling](http://www.lifeisaprayer.com/) of [Midwestern Mac, LLC](http://www.midwesternmac.com/) in 2013.

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

Because npm [doesn't support namespacing](https://npmjs.org/doc/faq.html#Why-no-namespaces), and ping, node-ping, and all the other namespaces I wanted were already taken.

## License

JJG Ping is licensed under the MIT (Expat) license. See included LICENSE.md.
