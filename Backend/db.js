const { Client } = require('pg');

const client = new Client({
    host : "localhost",
    port : 5432,
    user : "postgres",
    password : "4321",
    database : "pass"
});

client.on('connect', () => {
    console.log('connected to database');
});

client.on('end', () => {
    console.log('disconnected from database');
});

module.exports = client;
