const mqtt = require('mqtt');
const Topic = '#';

const client = mqtt.connect('mqtt://localhost:1997');

client.on('connect', mqtt_connect);

function mqtt_connect() {
    console.log("Connecting mqtt broker")
    client.subscribe(Topic, (err) => {
        console.log("Subcribed to " + Topic);
        if (err) {console.log(err);}
    })
}

function mqtt_reconect(err) {
    console.log("Reconnect mqtt broker")
    if(err) {console.log(err);}
}

function mqtt_error(err) {
    console.log("Error!");
    if (err) {console.log(err);}
}

function after_publish() {
    //do nothing
}

function mqtt_messsageRecived(topic, message, packet) {
    console.log('[RECEIVED SUCCESS!] Message received = ' + message);
    insert_message(topic, message, packet);
}

function mqtt_close() {
    console.log(("Close MQTT"));
}
////////////////////////////////////////////////////////////////////////
////////////////////////////  MY SQL ///////////////////////////////////
////////////////////////////////////////////////////////////////////////
//
// const mysql = require('mysql');
// const dateTime = require('node-datetime');
//
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456789',
//     database: 'mqtttest'
// });
//
// connection.connect(err => {
//     if (err) throw err;
// })
//
// function insert_message(topic, message, packet) {
//     var sql = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
//     var dt = dateTime.create();
//     var date = dt.format('Y-m-d H:M:S');
//     var params = ['tbl_record_temperature','datetime','temperature',date, topic, message];
//     sql = mysql.format(sql, params);
//     connection.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("--------1 record insert to SQL----------")
//     });
// }
