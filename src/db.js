const fs = require("fs");
const path = require("path");
const util = require("util")

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
        
        
    }
    /**
     * 
     * @param {string} FilePath path to the file
     */
    static mkFile(FilePath){
        return fs.writeFileSync(FilePath, "{ }", {encoding:"utf8",flag:"wx+"});
    }
    /**
     * 
     * @param {string} FilePath path to the file
     */
    static ReadFile(FilePath){
        return fs.readFileSync(FilePath, { encoding:"utf8", flag:"r"});
    }
}