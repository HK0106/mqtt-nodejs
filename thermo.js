const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1997');

client.on('connect', () => {
    console.log('connected');
    client.subscribe('get/temperature');
})

client.on('message', (topic, message) => {
    console.log('[RECEIVED SUCCESS!] Message received = ' + message);
    if (topic === 'get/temperature' ) {
        var temperature = (Math.random() * (0.00 - 100.00) + 100.00).toFixed(2);
        client.publish('temperature', temperature);
        console.log('Current ' + topic + ' is ' + temperature);
        log_temp(topic,temperature);
    }
})

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

function log_temp(topic, message) {
    var sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    var params = ['tbl_record_temperature','datetime','topic', 'temperature', date, topic, message];
    sql = mysql.format(sql, params);
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("--------1 record insert to SQL----------")
        console.log("-------- "+ result.toString() +" ----------")

    })
}



