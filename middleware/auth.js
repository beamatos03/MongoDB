import { jwt } from "jsonwebtoken";

export default async function auth(req, res, next){
    const token = req.header('access-token') ||
        req.headers['x-access-token']
        if(!token) return res.status(401).json({//401 = unauthorized
            mensagem: 'Acesso negado. É obrigatório o envio do token JWT'
        })

        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            /*
            o DECODED irá conter:
            usuario (payload)
            exp expiration - data de validade
            iat (issued at) data de criação*/

        req.usuario = await decoded.usuario
        next() //direcionamos ao endpoint
    } catch(e){
        req.status(403).send({error: `Token Invalido: ${e.message}`})
        console.error(e.message)
    }
}