const Promise = require('bluebird');
const runPerformanceTest = require('./runPerformanceTest');
const insertData = require('./insertData');

const [,, version, actions] = process.argv;

if (!version) {
    console.error('version is required');
    return;
}

if (!actions) {
    console.error('actions are required');
    return;
}

const URL = process.env.MONGO_URL;
const DB_NAME = 'perf_test';

console.log(URL);
console.log(DB_NAME);

const mongodb = require(`mongodb${version}`);

Promise.promisifyAll(mongodb);

async function getClient(mongodb) {
    return await mongodb.MongoClient.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
}

async function start() {
    const client = await getClient(mongodb);
    try {
        const db = client.db(DB_NAME);
        actions.includes('i') && await insertData(db);
        actions.includes('r') && await runPerformanceTest(db);
        client.close();
    }
    catch (e) {
        console.log(e);
        client.close();
    }
}

start();
