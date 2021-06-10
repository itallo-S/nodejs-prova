const { text } = require('express');
const mongoose = require('mongoose');

module.exports = (app) => {

    const Schema = mongoose.Schema;

    const ProdutoSchema = Schema({
        codigo: {type: Number, required: true, index: {unique: true} },
        descricao: {type: String, required: true},
        preco: {type: Number, required: true},
        data_hora_de_cadastro:  {type: Date, required: true},
        data_hora_de_atualizacao_de_preco: {type: Date}
    });

    const Produtos = mongoose.model('produtos', ProdutoSchema);

    return Produtos;
}