const util = require('util');

async function fetch(collection, query, projection) {
  const cursor = collection.find(query, projection);
  const toArray = util.promisify(cursor.toArray);
  return await toArray.apply(cursor);
}

async function runPerformanceTest(db) {
  console.log("Running performance test.");
  const TestCollection = db.collection('testcollection');

  const tStart = new Date();
  const docs = await fetch(TestCollection, {}, {_id: 1});
  const tMiddle = new Date();
  const testIds = docs.map(x => x._id);
  console.log(`Initial fetch of all documents test with ${testIds.length} entries took ${(tMiddle-tStart)/1000} [s].`);

  let sliceIx = 0;

  // Slice the data into chunks so that we don't prefetch all data because that could overflow the heap
  while (testIds.length - sliceIx > 0) {
    const rest = testIds.length - sliceIx;
    var sliceAmount = (rest > 10000) ? 10000 : rest;
    const testIdsSlice = testIds.slice(sliceIx, sliceIx + sliceAmount);
    console.log(`Checked ${sliceIx} of ${testIds.length} documents.`);
    sliceIx += sliceAmount;

    const testDocuments = await fetch(TestCollection, {_id: {$in: testIdsSlice}});
    console.log(`${testDocuments.length} documents fetched`);
  }

  const tEnd = new Date();
  console.log(`Performance test with ${testIds.length} entries took ${(tEnd-tMiddle)/1000} [s].`);
}

async function run() {
  try {
    console.log('connecting');
    const client = await connect(url);
    console.log('connected');
    const db = client.db(dbName);

    await runPerformanceTest(db);

    client.close();
    console.log('closed');
  }
  catch (e) {
    console.log('error', e.message);
  }
}

module.exports = runPerformanceTest;
