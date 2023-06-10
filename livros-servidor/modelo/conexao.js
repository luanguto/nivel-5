const mongoose = require('mongoose');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose.connect('mongodb://localhost:27017/livraria', options)
    .then(() => console.log('Conectado ao MongoDB...'))
    .catch((err) => console.log('Não foi possível conectar ao MongoDB...', err));

module.exports = mongoose;
