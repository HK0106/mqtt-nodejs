const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1997');

var state = 'closed';

client.on('connect', () => {
    console.log('=== When garage connected print this. ===');
    client.subscribe('garage/open');
    client.subscribe('garage/close');

    client.publish('garage/connected', 'true');
    sendStateUpdate ();
});

client.on('message', (topic, message) => {
    console.log('=====> received message %s %s', topic, message)
    switch (topic) {
        case 'garage/open':
            log_garage(topic, message);
            return handleOpenRequest(message)
        case 'garage/close':
            log_garage(topic, message);
            return handleCloseRequest(message)
    }
})

function handleOpenRequest(message) {
    if ( state != 'open' && state != 'opening') {
        console.log('~~~~~~~~~~~~~opening garage door')
        state = 'opening'
        sendStateUpdate()

        setTimeout(() => {
            state = 'open'
            sendStateUpdate()
        }, 5000)
    }
}

function handleCloseRequest (message) {
    if (state !== 'closed' && state !== 'closing') {
        console.log('~~~~~~~~~~~~~closing garage door')
        state = 'closing'
        sendStateUpdate()

        // simulate door closed after 5 seconds (would be listening to hardware)
        setTimeout(() => {
            state = 'closed'
            sendStateUpdate()
        }, 5000)
    }
}

function sendStateUpdate () {
    console.log('======> sending state %s', state);
    client.publish('garage/state', state)
};

////////////////////////////////////////////////////////////////////////
////////////////////////////  MY SQL ///////////////////////////////////
////////////////////////////////////////////////////////////////////////
const mysql = require('mysql');
const dateTime = require('node-datetime');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'mqtttest'
});

connection.connect(err => {
    if (err) {
        throw err;
    }
})

function log_garage(topic, message) {
    var sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    var params = ['tbl_log_garage','date_time','topic', 'state', date, topic, message];
    sql = mysql.format(sql, params);
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("--------1 record insert to SQL----------")
        console.log("-------- "+ result.toString() +" ----------")

    })
}
