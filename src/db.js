const fs = require("fs-extra");
const path = require("path");
const util = require("util");
const Serializer = require("./serializer")
class db{


    /**
     * 
     * @param {string} PreloadedDatabase Database to preload (Must be file)
     */
    constructor(PreloadedDatabase = path.join(`${process.cwd()}`, `db.nrdb`)) {
        /**Create "data" object, to be used later */
        Object.defineProperty(this, "Database", { value: {}, writable: true });
        /**check that the path is proper */
        if (!PreloadedDatabase.startsWith(process.cwd())) {
            throw new Error("Database path must begin with the current executing path ( process.cwd )");
        }

        Object.defineProperty(this, "DatabasePath", { value: PreloadedDatabase, writable: false });
        /**Make sure the file at leasts exists */
        fs.ensureFileSync(PreloadedDatabase);
        let RenderedFileData;
        fs.readJSON(PreloadedDatabase, { throws: false }).then(FileData => {
            if (FileData === null) { FileData = {} }
            RenderedFileData = FileData;
        });
        this.Database = RenderedFileData;

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
    CreateTable(TableName) {
        this.Database[TableName] = [];
        this.SaveFile();
    }
    /**
     * 
     * @param {string} TableName 
     */
    DeleteTable(TableName) {
        delete this.Database[TableName];
        this.SaveFile();
    }
    /**
     * 
     * @param {string} TableName 
     */
    SelectTable(TableName) {
        return new Table(this, TableName);
    }
}

/**@class Table */
class Table {

    /**@this {Array<any>} table the table*/
    /**
     * 
     * @param {db} Parent 
     * @param {string} TableName 
     */
    constructor(Parent, TableName) {
        this.table = Parent.Database[TableName];

    }
    /**
     * 
     * @param {any} search search function
     */
    find(search) {
        return this.table.filter(search)
        
    }
}

class TableSearchResult{
    
}

module.exports = db