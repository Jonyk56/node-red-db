const fs = require("fs-extra");
const path = require("path");
const util = require("util");
/**
 * @typedef {string} SearchResult
 */
class db {
    /**
     * @param {string} PreloadedDatabase Database to preload (Must be file)
     */
    constructor(PreloadedDatabase = path.join(`${process.cwd()}`, `db.nrdb.json`)) {

        /**check that the path is proper */
        if (!PreloadedDatabase.startsWith(process.cwd())) {
            throw new Error("Database path must begin with the current executing path ( process.cwd )");
        }

        Object.defineProperty(this, "DatabasePath", { value: PreloadedDatabase, writable: false });
        /**Make sure the file at leasts exists */
        fs.ensureFileSync(PreloadedDatabase);
        let FileData = fs.readJSONSync(PreloadedDatabase, { throws: false })
        FileData = util.isNullOrUndefined(FileData) ? {} : FileData
        this.Database = FileData;

    }
    SaveFile() {
        fs.writeJSON(this.DatabasePath, this.Database, { throws: false }).then(() => {
            return true;
        });
    }
    /**
     * 
     * @param {string} TableName name of table
     */
    CreateUUID(TableName) {
        this.Database[TableName] = []
        this.SaveFile();
    }
    /**
     * 
     * @param {string} TableName 
     */
    DeleteUUID(TableName) {
        delete this.Database[TableName];
        this.SaveFile();
    }
    /**
     * allows you to select the entire table
     * @param {string} TableName 
     */
    SelectUUID(TableName) {
        return this.Database[TableName];
    }
    /**
     * 
     * @param {string} TableName 
     * @param {Function} Where function to use for comparison 
     */
    SelectUUIDAndDelete(TableName, Where){
        let Table = this.Database[TableName];
        
    }


    InsertIntoUUID(TableName, Data, WhereToInsert = (() => { })) {

    }
}


module.exports = db