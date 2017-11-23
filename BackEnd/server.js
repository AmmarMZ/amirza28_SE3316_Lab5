var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//server port, different than client port since host is the same
var port = process.env.PORT || 8082;   
//app.set('port', process.env.PORT || port);

var router = express.Router();

router.use(function(req, res, next)
{
    console.log('Something is happening');
    next();
});

router.route('/').get(function(req,res)
{
    res.json({message: 'This is the server message'});
});

app.use('/api',router);

app.listen(port);
console.log('Server is running on port ' + port);
