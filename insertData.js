function makeRandomString(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

async function insertData(db) {
    const TestCollection = db.collection('testcollection');

    console.log("Removing all old data first.");
    await TestCollection.removeMany({});

    const numberOfEntriesToInsert = 200*1000;

    console.log(`Starting to insert ${numberOfEntriesToInsert} entries.`);
    const tStart = new Date();
    for (var i = 0; i < numberOfEntriesToInsert; ++i) {
        await TestCollection.insertOne({
            field1: makeRandomString(10),
            field2: makeRandomString(10),
            field3: makeRandomString(10),
            field4: makeRandomString(10),
            createdAt: new Date(),
            createBy: 'insertDataForPerformanceTest'
        });
    }
    const tEnd = new Date();
    console.log(`Inserting ${numberOfEntriesToInsert} entries took ${(tEnd-tStart)/1000} [s].`);
}

module.exports = insertData;
