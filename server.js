const express = require('express');
const bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

const app = express();

app.set('port', (process.env.PORT || 3000));


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// error handling middleware
app.use(function(err, req, res, next){
	console.log(err); // to see properties of message in our console
	res.status(422).send({error: err.message});
});

app.get('/', function(req,res, next){
	res.render('index');
	//res.sendFile(__dirname + "/views/index.ejs");
});

app.post('/upload', upload.single('file'), function(req,res,next){
	res.json(req.file);
});



// listen for requests
app.listen(process.env.port || app.get('port'), () => {
console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});