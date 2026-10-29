const con = require('../db')

const cadastrar = (req, res) => {
    const { usuarioId, local, tipoResiduo, nivelRisco, status } = req.body
    try {
        const sql = 'INSERT INTO ocorrencia (usuarioId, local, tipoResiduo, nivelRisco, status) VALUES (?, ?, ?, ?, ?);'
        con.query(sql, [usuarioId, local, tipoResiduo, nivelRisco, status], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar ocorrencia' })
            } else {
                const novaocorrencia = req.body
                novaocorrencia.id = results.insertId
                res.status(201).json({ message: 'Ocorrência cadastrada com sucesso', event: novaocorrencia })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar ocorrência', details: 'Informe { usuarioId, local, tipoResiduo, nivelRisco, status }' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM ocorrencia;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar ocorrências' })
        } else {
            res.json(results)
        }
    })
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const chaves = Object.keys(req.body)
    let campos = ''
    const colunas = []
    chaves.forEach((chave) => {
        campos += `${chave} = ?,`
        colunas.push(req.body[chave])
    })
    campos = campos.slice(0, -1) //Remove a ultima virgula
    colunas.push(id)
    const sql = `UPDATE ocorrencia SET ${campos} WHERE id = ?;`
    con.query(sql, colunas, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao alterar ocorrencia', msg: err.sqlMessage })
        } else {
            if (results.affectedRows == 1)
                res.json("Registro alterado com sucesso")
            else
                res.status(404).json({ msg: "Nada alerado no banco de dados", erro: results })
        }
    })
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    const sql = 'DELETE FROM ocorrencia WHERE id = ?;'
    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao excluir ocorrencia', msg: err.sqlMessage })
        } else {
            if (results.affectedRows == 1)
                res.json("Registro excluído com sucesso")
            else
                res.status(404).json({ msg: "Nada alterado no banco de dados", erro: results })
        }
    })
}

const resumo = (req, res) => {
    let sql1 = "SELECT COUNT(*) AS total FROM ocorrencia WHERE status = 'Tratado';"
    con.query(sql1, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar ocorrências tratadas' })
        } else {
                res.json({ tratadas: results[0].total })
        }
    })
}

module.exports = {
    cadastrar,
    listar,
    alterar,
    excluir,
    resumo
}