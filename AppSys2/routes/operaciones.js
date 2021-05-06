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
    res.render('operaciones', { title: 'Operaciones' });
});
router.get('/view', function (req, res, next) {
    let name = req.query.name;
    let cui = req.query.cui;
    let apellido = req.query.app;
    console.log(name);
    console.log(cui);
    console.log(apellido);

    const query = "select * from transaccion where cui1=" + cui + " and  nombre1= '" + name + "' and apellido1= '" + apellido + "' allow filtering";
    client.execute(query, [], (err, results) => {
        if (err) {
            return console.error(err);
        }
        data1 = results.rows
        const query1 = "select * from transaccion where cui2=" + cui + " and  nombre2= '" + name + "' and apellido2= '" + apellido + "' allow filtering";
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