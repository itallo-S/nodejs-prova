const express = require('express');
const consign = require('consign');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

consign().include('constantes').then('models').then('controllers').then('routes').into(app);


app.listen(3000, () => console.log('Servidor Online (port: 3000)'))