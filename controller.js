const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1997');

var garageState = '';
var connected = false;

client.on('connect', () => {
    console.log('=== Recive message form topic (garage/connected) when controller connect with broker ===');
    client.subscribe('garage/connected');
    client.subscribe('garage/state');
});

client.on('message', (topic, message) => {
    if (topic === 'garage/connected') {
        console.log('===> garage connected status %s', message);
        connected = (message.toString() === 'true');
    }
    if (topic === 'garage/state') {
        console.log('===> garage state update to %s', message);
        garageState = message;
    }
});


function openGarageDoor() {
    if (connected && garageState != 'open'){
        return  client.publish('garage/open', 'true');
    }
}

function closeGarageDoor() {
    if (connected && garageState != 'closed') {
        return  client.publish('garage/close', 'true');
    }
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////        simulate        ////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// simulate open garage door
setTimeout(() => {
    console.log('----[open door]----')
    openGarageDoor()
}, 5000)

// simulate closing garage door
setTimeout(() => {
    console.log('----[close door]----')
    closeGarageDoor()
}, 20000)
