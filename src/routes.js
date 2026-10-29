const express = require("express")
const router = express.Router()

const Usuario = require('./controllers/usuario')
const Residuo = require('./controllers/ocorrencia')

const rotaInicial = (req, res) => {
    res.json("Back-end gestão de resíduos respondendo")
}

router.get('/',rotaInicial)
router.post('/usuarios/login', Usuario.login)
router.post('/usuarios', Usuario.cadastrar)
router.get('/usuarios', Usuario.listar)
router.put('/usuarios/:id', Usuario.alterar)
router.delete('/usuarios/:id', Usuario.excluir)

router.post('/residuos', Residuo.cadastrar)
router.get('/residuos', Residuo.listar)
router.patch('/residuos/:id', Residuo.alterar)
router.delete('/residuos/:id', Residuo.excluir)
router.get('/residuos/resumo', Residuo.resumo)

module.exports = router