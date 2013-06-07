/**
 * @file
 * JJG Node Ping
 *
 * Uses the system's ping utility to ping a server and return the status and
 * latency of the ping.
 */

var sys = require('util');
var cp = require('child_process');
var os = require('os');

exports.ping = function ping(address, callback) {
    // Determine the host OS; set up ping arguments and vars accordingly.
    var platform = os.platform();
    var process = null;
    var result_line = 1; // Default for POSIX-based systems.
    var time_param = 6; // Default for POSIX-based systems.

    // Linux.
    if (platform == 'linux') {
        process = cp.spawn('/bin/ping', ['-n', '-w 2', '-c 1', address]);
    }
    // Mac OS X.
    else if (platform == 'darwin') {
        process = cp.spawn('/sbin/ping', ['-n', '-t 2', '-c 1', address]);
    }
    // Windows.
    else if (platform.match(/^win/)) {
        process = cp.spawn('C:/windows/system32/ping.exe', ['-n', '1', '-w', '5000', address]);
        result_line = 2;
        time_param = 4;
        platform = 'windows'; // Set explicitly to prevent further regex.
    }
    // Platform not recognized.
    else {
        throw new Error('ping.ping: Operating system could not be identified.');
    }

    // If ping returned stdout output the host was valid. Find the latency for
    // the ping if there is one (if not, the host was unreachable).
    process.stdout.on('data', function (data) {
        var status = null;
        var latency = null;

        // Split the returned output by line.
        var lines = data.toString().split('\n');

        // Split the result line into an array.
        var array = lines[result_line].split(' ');

        // If the time parameter is not present, or the second line of output
        // contains 'Unreachable', address is unreachable.
        if (!array[time_param] || array[1].indexOf('Unreachable') > -1) {
            status = false;
            latency = 0;
        }
        // If it is present, find the latency value in ms.
        else {
            status = true;

            // Remove 'time=' from latency stat.
            latency = array[time_param].replace('time=', '', array[time_param]);
            // If on a windows machine, also remove the 'ms'.
            if (platform == 'windows') {
              latency = latency.replace('ms', '', latency);
            }

            // Sanity check.
            if (isNaN(latency)) {
                latency = 0;
                status = 0;
            }

            // Round latency to nearest ms value.
            latency = Math.round(latency);
        }

        // Return the latency and status (one extra type check in case of odd
        // domain names that cause the callback to be hit with invalid data).
        if (typeof status === 'boolean') {
            callback && callback(latency, status);
        }
    });

    // Handle errors.
    process.on('error', function(e) {
        throw new Error('ping.ping: There was an error while executing the ping program. check your path or filesystem permissions.');
    });
    process.stderr.on('data', function (data) {
        callback && callback(0, false);
    });
}
