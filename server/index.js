const express = require('express'),
      http = require('http'),
      bodyParser = require('body-parser'), // parses incoming requests as json
      morgan = require('morgan'), // logging framework
      mongoose = require('mongoose');

const port = process.env.PORT || 3090,
      app = express(),
      server = http.createServer(app),
      router = require('./router');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup
server.listen(port);
console.log('Server listening on port:', port);
