var express = require('express');
var router = express.Router();

const cassandra = require("cassandra-driver");
const clientOptions = {
    contactPoints: ["127.0.0.1", "127.0.0.1"],
    localDataCenter: 'datacenter1',
    keyspace: "sist"
};
const client = new cassandra.Client(clientOptions);
var data1=[];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('total', { title: 'total' });
});
router.get('/view', function (req, res, next) {
    let name = req.query.name;
    console.log(name);
  

    const query = "select sum(monto) as total from transaccion where nombreinstitucion1='" + name +  "' allow filtering";
    client.execute(query, [], (err, results) => {
        if (err) {
            return console.error(err);
        }
        data1 = results.rows
        const query1 = "select sum(monto) as total from transaccion where nombreinstitucion2='" + name +  "' allow filtering";
        client.execute(query1, [], (err1, results1) => {
            if (err1) {
                return console.error(err1);
            }
            var data2 = results1.rows
            console.log(results1.rows);
            res.json({ data: data1, data1:data2 });
           
        });
    });
});



module.exports = router;