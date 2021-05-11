const path = require('path');

const express = require('express');
const compression = require('compression');

const errorMiddleware = require('./utils/errorMiddleware');
const itemRoutes = require('./routes/items');

const app = express();

app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
  const origin = req.get('origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Origin', origin);
  next();
});

app.use('/v1', itemRoutes);

app.use(function (req, res) {
  res.send(404);
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 9090;

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
}

app.get('/*', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../../frontend/build/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log('🚀 Server is up on PORT', PORT);
});
