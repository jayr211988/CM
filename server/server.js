const { createServer } = require('http');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

let SERVER = { PORT: null, BUILD: null };
const normalizePort = port => parseInt(port, 10);
const app = express();
const oneDay = 86400000;

if(process.env.NODE_ENV === 'production') {
  SERVER.PORT = normalizePort(8080);
  SERVER.BUILD = 'production_build'
} else if(process.env.NODE_ENV  === 'staging') {
  SERVER.PORT = normalizePort(3002);
  SERVER.BUILD = 'staging_build'
} else if(process.env.NODE_ENV  === 'qa') {
  SERVER.PORT = normalizePort(8080);
  SERVER.BUILD = 'qa_build'
} else {
  SERVER.PORT = normalizePort(3000);
  SERVER.BUILD = 'development_build'
}

//  HTTP header security configuration
app.use(helmet.hsts({maxAge: 7776000000}));
app.use(helmet.frameguard('SAMEORIGIN'));
app.use(helmet.xssFilter({setOnOldIE: true }));
app.use(helmet.noSniff());
app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));

// app.use(function(req, response, next) {
//   // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept');
//   response.setHeader("Access-Control-Allow-Origin", "*");
//   response.setHeader("Access-Control-Allow-Credentials", "true");
//   response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//   next();
// });
//  HTTP static file directory
app.use(express.static(path.resolve(__dirname, '..', SERVER.BUILD),{ maxAge: oneDay*30 }));

//  Progressive Web Application for services worker 
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', SERVER.BUILD, 'service-worker.js'), { maxAge: 0, cacheControl: false });
});

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', SERVER.BUILD, 'index.html'), { maxAge: 0, cacheControl: false });
});

const server = createServer(app)
server.listen(SERVER.PORT, err => {
  if (err) throw err
  console.log('HELLO WORLD', path.join(__dirname, '..', `${SERVER.BUILD}/build/static/js`))
});
