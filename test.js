const db = require("./index").db;
(async () => {
let abc = await new db();

await abc.CreateUUID("oi")
})();