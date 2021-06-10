const { response } = require('express');
const propertiesReader = require('properties-reader');
const properties = propertiesReader('./app.properties');

module.exports = (app) => {
    
    const ConstantesBD = {
        connection: `mongodb://${properties.get('bd.server')}:${properties.get('bd.porta')}/${properties.get('bd.banco')}`,
        connectionParams: {
            useCreateIndex: true,
            useNewUrlParser : true,
            useUnifiedTopology: true
        },

        erroConexao(err){
            console.log('Erro ao conectar ao banco');
            console.log(err)
            response.status(500).send('Falha ao tentar se Conectar ao Banco de Dados');
        }
    }

    return ConstantesBD;
}