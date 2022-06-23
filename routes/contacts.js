const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool
// const jwt = require('jsonwebtoken')

// Recebe todos os contatos
router.get('/', (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }

    conn.query(
      'SELECT * FROM contacts',
      (error, resultado, fields) => {
        if (error) { return res.status(500).send({ error: error }) }
        return res.status(200).send({ response: resultado })
      }
    )
  })
})

// Insere um contato
router.post('/', (req, res, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }

    const contacts = req.body.contacts.map(contact => {

      const cel = contact.cellphone
      const name = contact.name.toUpperCase()
      const cellphone = cel.slice(0, 0) + "+" + cel.slice(0, 2) + " " + "(" + cel.slice(2, 4) + ")" + " " + cel.slice(4, 9) + "-" + cel.slice(9,)

      return [
        name,
        cellphone
      ]
    })

    conn.query(
      'INSERT INTO contacts (name, cellphone) VALUES ?',
      [contacts],
      (error, resultado, fields) => {
        conn.release()

        if (error) {
          return res.status(500).send({ error: error, response: null })
        }
        const response = {
          mensagem: 'contato inserido com sucesso',
          createdContacts: req.body.contacts
        }
        res.status(201).send(response)
      }
    )
  })
})

// Recebe um contato especifico
router.get('/:id_contacts', (req, res, next) => {
  const id = req.params.id_contacts

  if (id === 'especial') {
    res.status(200).send({
      mensagem: 'Usando o GET de um produto exclusivo',
      id: id
    })
  } else {
    res.status(200).send({
      mensagem: 'Você passou um ID'
    })
  }
})

// Altera um contato
router.patch('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Usando o PATCH dentro da rota de contatos'
  })
})

//Deleta um contato
router.delete('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Usando o DELETE dentro da rota de contatos'
  })
})

module.exports = router