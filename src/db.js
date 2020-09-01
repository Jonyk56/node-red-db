const fs = require("fs");
const path = require("path")
/**@class db */
module.exports = class {
    /**
     * 
     * @param {string} PreloadedDatabase Database to preload (Must be file)
     */
    constructor(PreloadedDatabase = path.join(`${process.cwd()}`,`db.nrdb`)){
        Object.defineProperty(this, "data", { value: "", isWritable: true});
        if (!PreloadedDatabase.startsWith(process.cwd())){
            throw new Error("Database path must begin with the current executing path ( process.cwd )");
        }
        let FileStats = fs.statSync(PreloadedDatabase);
        if (!FileStats.isFile()){
            throw new Error("The path provided does not lead to a file, ")
        }
    }
}