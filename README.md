## Testing mongo insert/update performance

Related to [Meteor issue](https://github.com/meteor/meteor/issues/10515)

### Usage

`MONGO_URL=<your_mongo_url> node index.js <version> <actions>`

*version*
for example, 341 (meaning 3.4.1), see aliases in `packages.json`

*actions*
r - read test (see `runPerformanceTest.js`)
i - insert data (see `insertData.js`)

### Results

[Google Sheet](https://docs.google.com/spreadsheets/d/1qAOg3A_v7GS4r7XYhTWumE94kPfhfI8jCmb1Plk6g5Y/edit?usp=sharing)
