const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1997');

client.on('connect', () => {
    console.log('connected');
    client.subscribe('temperature')
    client.publish('temperature',(Math.random() * (0.00 - 100.00) + 100.00).toFixed(2))
    // setInterval(client.publish('temperature',(Math.random() * (0.00 - 100.00) + 100.00).toFixed(2)),10000);
})

client.on('message', (topic, message) => {
    console.log('=============received %s %s', topic, message);

    // client.publish('temperature',(Math.random() * (0.00 - 100.00) + 100.00).toFixed(2))
})

function handleAppExit (options,err) {
    if(err) {
        console.log(err.stack);
    }
    if(options.cleanup) {
        client.publish('connect/status', 'disconnect');
    }
    if (options.exit) {
        process.exit();
    }
};

process.on('exit', handleAppExit.bind(null, {
    cleanup: true
}))
process.on('SIGINT', handleAppExit.bind(null, {
    exit: true
}))
process.on('uncaughtException', handleAppExit.bind(null, {
    exit: true
}))
