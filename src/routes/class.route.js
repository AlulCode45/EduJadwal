const express = require('express')
const { getAllClass, getClassById } = require('../controller/class.controller')
const classRoute = express.Router()

classRoute.get('/', getAllClass)
classRoute.get('/:id', getClassById)

module.exports = classRoute