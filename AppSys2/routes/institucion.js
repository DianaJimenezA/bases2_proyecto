var express = require('express');
var router = express.Router();

const cassandra = require("cassandra-driver");
const clientOptions = {
    contactPoints: ["127.0.0.1", "127.0.0.1"],
    localDataCenter: 'datacenter1',
    keyspace: "sist"
};
const client = new cassandra.Client(clientOptions);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('institucion', { title: 'Express' });
});
router.get('/view', function(req, res, next) {
    const query = "SELECT * FROM INSTITUCION";
    client.execute(query, [], (err, results) => {
        if (err) {
            return console.error(err);
        }

        console.log(results.rows);
        res.json({ data: results.rows});
    });
});



module.exports = router;