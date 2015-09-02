var
  express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  csv = require('fast-csv'),
  body_parser = require('body-parser');

// instantiate app
var app = express();

// static files middleware
app.use(express.static(__dirname + '/public'));
app.use('/jsPsych', express.static(__dirname + '/jsPsych'));

// body parsing middleware
app.use(body_parser.json());

// set template engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// DB setup
var emptySchema = new mongoose.Schema({}, { strict: false });
var Entry = mongoose.model('Entry', emptySchema);

// connect to DB
mongoose.connect('mongodb://localhost/jsPASAT');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('database opened');
});


// setup views
app.set('views', __dirname + '/public/views');

// ICF route
app.get('/', function(request, response) {
    response.render('experiment.html', {
        js_filename: 'instructions',
        jspsych_plugins: ['instructions']
    });
});

var experiment_plugins = [
    'text',
    'instructions',
    'multi-stim-multi-response_custom',
    'single-stim',
    'survey-likert',
];

// practice route
app.get('/practice', function(request, response) {
    response.render('experiment.html', {
        js_filename: 'practice',
        jspsych_plugins: experiment_plugins
    });
});

// experiment route
app.get('/experiment', function(request, response) {
    response.render('experiment.html', {
        js_filename: 'experiment',
        jspsych_plugins: experiment_plugins
    });
});

// experiment route
app.get('/finish', function(request, response) {
    response.render('finished.html');
});

// experment data route
app.post('/experiment-data', function(request, response) {
  var
    headers = ["internal_chunk_id", "key_press", "rt", "time_elapsed", "trial_index", "trial_index_global", "trial_type", "block_stimuli", "correct", "response", "expected"],
    file_path = ["data", request.body.pathname, request.body.filename + ".csv"].join('/');
  csv
   .writeToPath(file_path, request.body.data, {headers: headers})
   .on("finish", function(){
       console.log("Finished writing to '" + file_path + "'");
   });

  response.end();
});


// start server
var server = app.listen(3000, function(){
    console.log("Listening on port %d", server.address().port);
});
