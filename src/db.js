const fs = require("fs-extra");
const path = require("path");
const util = require("util")

module.exports = class {
    /**
     * 
     * @param {string} PreloadedDatabase Database to preload (Must be file)
     */
    constructor(PreloadedDatabase = path.join(`${process.cwd()}`,`db.nrdb`)){
        /**Create "data" object, to be used later */
        Object.defineProperty(this, "data", { value: {}, isWritable: true});
        /**check that the path is proper */
        if (!PreloadedDatabase.startsWith(process.cwd())){
            throw new Error("Database path must begin with the current executing path ( process.cwd )");
        }
        /**Make sure the file at leasts exists */
        fs.ensureFileSync(PreloadedDatabase);
        let FileData = fs.readJSONSync(PreloadedDatabase, {throws:false });
        if (FileData === null){
            
        }
    }
}