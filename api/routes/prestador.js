/*API REST dos prestadores */
import express from "express"
import {connectToDatabase} from '../utils/mongodb.js'


const router = express.Router()
const {db, object} = await connectToDatabase()

const nomeCollection = 'prestadores'


/*Lista todos os prestadores*/

router.get('/', async(req, res)=>{
    try{
        db.collection(nomeCollection).find().sort({razao_social: 1}).toArray((err, docs) => {
            if(!err){//se não houver erro
                res.status(200).json(docs)
            }
    })
        } catch(err){
            res.status(500).json({
                errors: [{
                    value: `&{err.message}`,
                    msg: 'erro ao obter a lista de prestadores',
                    param: '/'
                }]
            })
        }
    }
)
export default router