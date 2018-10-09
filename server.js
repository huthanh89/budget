//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

const path        = require('path');
const express     = require('express');
const compression = require('compression')
const app         = express();

// Set view engine to html and specify the file locations.

app.set('view engine', 'html')
app.set("views", path.join(__dirname, "dist"));

// Use compression to GZip files size.

app.use(compression())

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
