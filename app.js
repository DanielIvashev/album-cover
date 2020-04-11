const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');


const app = express();
app.use(express.json({ extended: false }));
app.use(express.static(__dirname));
app.use('/', express.static(path.join(__dirname, 'client', 'build')));



app.use('/auth', require('./routes/auth.routes'));
app.use('/covers', require('./routes/covers.routes'));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});




const PORT = process.env.PORT || 5000;

async function start() {
    try {
      await mongoose.connect(config.get('mongoUri'), {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
      });
      app.listen(PORT, () => console.log(`app has been started on port ${PORT}...`))
    } catch (e) {
        console.log('server error', e);
        process.exit(1)
    }
}

start();
