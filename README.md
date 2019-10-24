# osu-db-parser

[![npm version](https://img.shields.io/npm/v/osu-db-parser)](https://www.npmjs.org/package/osu-db-parser)
[![install size](https://packagephobia.now.sh/badge?p=osu-db-parser)](https://packagephobia.now.sh/result?p=osu-db-parser)
[![npm downloads](https://img.shields.io/npm/dm/osu-db-parser.svg)](http://npm-stat.com/charts.html?package=osu-db-parser)
![license: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

That package can read files from osu folder called osu!.db and collection.db
About struct that db look at peppy site: [*link*](https://osu.ppy.sh/help/wiki/osu!_File_Formats/Db_%28file_format%29)

## Installing
Using npm:

```bash
$ npm install osu-db-parser
```
## Example (how to read osu!.db)

```js
const fs = require("fs");
const OsuDBParser = require("osu-db-parser");

let osuDBbuffer = Buffer.from(fs.readFileSync("<PATH-TO OSU-DB>"));
const osuDB = new OsuDBParser(osuDBbuffer=osuDBbuffer);

let osuDBData = osuDB.getOsuDBData(); // This is osu!.db data you can make with this all that you want.
```

You can update buffer on fly
```js
let newBuffer = Buffer.from(fs.readFileSync("<PATH-TO OSU-DB>"));
osuDB.setBuffer("osudb", newBuffer);

let newData = osuDB.getOsuDBData();
```

## Example (how to read collection.db)
Similar to how to read osu!.db ;D

```js
const fs = require("fs");
const OsuDBParser = require("osu-db-parser");

let collectionBuffer = Buffer.from(fs.readFileSync("<PATH-TO COLLECTION-DB>"));
const osuDB = new OsuDBParser(osuCollectionBuffer=collectionBuffer);

let osuCollectionData = collectionDB.getCollectionData() // This is collection.db data you can make with this all that you want.
```

And too. You can update buffer on fly
```js
let newBuffer = Buffer.from(fs.readFileSync("<PATH-TO OSU-DB>"));
collectionDB.setBuffer("collection", newBuffer);

let newData = collectionDB.getCollectionData() ;
```

### Or you can use two solution in one

```js
const fs = require("fs");
const OsuDBParser = require("osu-db-parser");

let osuDBbuffer = Buffer.from(fs.readFileSync("<PATH-TO OSU-DB>"));
let collectionBuffer = Buffer.from(fs.readFileSync("<PATH-TO COLLECTION-DB>"));
const ultimateDB = new OsuDBParser(osuDBbuffer=osuDBbuffer, osuCollectionBuffer=collectionBuffer);

let osuDBData = ultimateDB.getOsuDBData();
let osuCollectionData = ultimateDB.getCollectionData();

```

#### If something wrong, pleas-s-s-s-e create PR with fix)