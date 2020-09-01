/**@class db */
module.exports = class {
    /**
     * 
     * @param {string} PreloadedDatabase Database to preload (Must be file)
     */
    constructor(PreloadedDatabase = `${process.cwd()}/db.nrdb`){
        Object.defineProperty(this, "data", { value: "", isWritable: true});
        
    }
}