import express from 'express';

const app = express()
const port = 4000


//importando rotas
import rotasPrestadores from "./routes/prestador.js"
import rotasUsuarios from "./routes/usuario.js"


app.use(express.json()) //irá fazer o parse de arquivos JSON

//Rotas de conteúdo público
app.use('/', express.static('public'))



//CONFIGURA O FAVICON
app.use('/favicon.ico', express.static('public/images/gato.png'))
//rotas da api
app.use('/api/prestadores', rotasPrestadores)
app.use('/api/usuarios', rotasUsuarios)
app.get('/api', (req, res) =>{
    res.status(200).json({
        message: 'API Fatec 100% funcional 🦕',
        version: '1.0.1'
    })

})

//rotas de exceção - deve ser a última
app.use(function(req, res){
    res.status(404).json({
        errors: [{
            value: `${req.originalUrl}`,
            msg: `A rota ${req.originalUrl} não existe nessa API`,
            param: 'Invalid Route' 
        }]
    })
})


    app.listen(port, function(){
    console.log(`Servidor rodando na porta ${port}`);
    })
