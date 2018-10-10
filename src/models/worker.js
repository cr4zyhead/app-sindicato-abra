const mongoose = require('mongoose')
const { Schema } = mongoose

const workerSchema = new Schema({
  rut: {
    type: 'String',
    required: true,
    unique: true
  },
  finit: {
    type: 'String'
  },
  turno: {
    type: 'String'
  },
  namew: {
    type: 'String'
  },
  surname1: {
    type: 'String'
  },
  surname2: {
    type: 'String'
  },
  borndate: {
    type: 'String'
  },
  address1: {
    type: 'String'
  },
  city1: {
    type: 'String'
  },
  address2: {
    type: 'String'
  },
  city2: {
    type: 'String'
  },
  sex: {
    type: 'String'
  },
  marrieddtatus: {
    type: 'String'
  },
  email: {
    type: 'String'
  },
  phone: {
    type: 'String'
  },
  department: {
    type: 'String'
  },
  dependants: {
    type: 'String'
  }
})

module.exports = mongoose.model('worker', workerSchema)
