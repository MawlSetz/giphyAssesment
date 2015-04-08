//   http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC
// We need to be able to enter search terms (maybe in the url ? and then deliver results from the API)

// We must be able to create searches - POST /searches
// see all searches - GET /searches
// see individual searches - GET /search/:id





var express = require('express')
var app = express();
var ejs = require('ejs')
app.set('view_engine', 'ejs')
var bodyParser = require('body-parser')
var router = express.Router();

app.use(bodyParser.urlencoded({extended: false}))


// might be unneseccary
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

//dummy data
var search = {
	0:{
		id:0,
		name:"funny cat",
		gifs:[]
	}

}
var counter = 1
//search constructor function
var Search = function(name, url){
	this.id = counter;
	counter++;
	this.name = name;
	this.url = url;
};
//sample search
var cats = new Search("cats", "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC");
var searches = {0: cats};



//redirect user to all searches page
app.get('/', function(req, res){
	res.redirect('/searches')
});
//show all searches
app.get('/searches', function(req, res){
	res.render('index.ejs', {search: search})
});
//show individual search
app.get('/search/:id', function(req, res){
	var thisSearch = searches[parseInt(req.params.id)]
	res.render('show.ejs', {thisSearch: thisSearch})
})
//new search
app.get('/searches/new', function(req, res){
	res.render('new.ejs')
})

//create new search
app.post('/searches', function(req, res){
	console.log(req.body)
	var newSearch = {
		id: counter,
		name: req.body.name,
		url: req.body.url
	};
	searches.push(newSearch);
  	
	

	searches[counter] = newSearch;
	counter++;
	res.redirect('/searches')
});

app.listen(3000);
console.log('listening on port 3000');












