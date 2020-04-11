const {Schema, model} = require('mongoose');

const schema = new Schema({
    author: {type: String, required: true},
    label: {type: String, required: true},
    date: {type: String, required: true},
    genre: {type: String, required: true},
    filedataName: {type: String, required: true},
});

module.exports = model('Cover', schema);