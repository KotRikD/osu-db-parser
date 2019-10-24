const fs = require("fs");
const OsuDBParser = require("../osu-db-parser");


const DB_PATH = "../osu!.db"
const osuDB = new OsuDBParser(osuDBbuffer=Buffer.from(fs.readFileSync(DB_PATH)));

let osuDBData = osuDB.getOsuDBData();
console.log(osuDBData);

// Update data via new file
osuDB.setBuffer("osudb", Buffer.from(fs.readFileSync(DB_PATH)));
console.log(osuDB.getOsuDBData())