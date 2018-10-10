const express = require('express')
const router = express.Router()
const Worker = require('../models/worker')
const checkAuth = require('../middleware/check-auth')

router.get('/', checkAuth, async (req, res) => {
  const workers = await Worker.find()

  try {
    return res.json(workers)
  } catch (e) {
    return res.status(501).json({
      message: 'error ',
      error: e.toString()
    })
  }
})

router.post('/addWorker', checkAuth, async (req, res, next) => {
  console.log(req.body)
  const {
    namew, surname1, surname2, address1,
    city1, address2, city2, rut, email, turno,
    borndate, marriedstatus, phone, department
  } = req.body

  const w = new Worker({
    rut: rut,
    namew: namew,
    surname1: surname1,
    surname2: surname2,
    address1: address1,
    city1: city1,
    address2: address2,
    city2: city2,
    email: email,
    turno: turno,
    borndate: borndate,
    marriedstatus: marriedstatus,
    phone: phone,
    department: department
  })

  try {
    const s = await w.save()
    return res.status(201).json({
      message: 'The worker was successfully added '
    })
  } catch (e) {
    return res.status(501).json({
      message: 'error ',
      error: e.toString()
    })
  }
})

module.exports = router
