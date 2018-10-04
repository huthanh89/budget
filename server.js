//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

const path    = require('path');
const express = require('express');
const app     = express();

// Set view engine to html and specify the file locations.

app.set('view engine', 'html')
app.set("views", path.join(__dirname, "dist"));

// Debug headers.

/*
app.use(function (req, res, next) {
    console.log('- path:', req.path, '- method:', req.method, ' - hostname:', req.hostname, ' - url:', req.url);
    console.log(req.headers);
    next();
  })
*/

// Use files under following directories.

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/dist'));


// Handle route.

app.get('/', function(req, res){
    res.render('index');
});

// Listen app on the following port.

app.listen(3001, () => console.log('BudgetID App listening on port 3001'))

//-----------------------------------------------------------------------------//
