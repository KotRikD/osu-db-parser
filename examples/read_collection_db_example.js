const fs = require("fs");
const OsuDBParser = require("../osu-db-parser");


const DB_PATH = "../collection.db"
const collectionDB = new OsuDBParser(null, osuCollectionBuffer=Buffer.from(fs.readFileSync(DB_PATH)));

let osuCollectionData = collectionDB.getCollectionData()
console.log(osuCollectionData);

// Update data via new file
collectionDB.setBuffer("collection", Buffer.from(fs.readFileSync(DB_PATH)));
console.log(collectionDB.getCollectionData())