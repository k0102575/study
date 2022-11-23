import express from 'express';

// variables
const app = express();
const PORT_NUMBER = 3000;

// view template ejs Setting
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

// Route Setting
app.get('/', (req, res) => res.render('index'));

// static file Setting
app.use('/public', express.static(__dirname + '/public'));

// App start
app.listen(PORT_NUMBER, '', () => {
  console.log(`start server ===> port: ${PORT_NUMBER}`);
});
