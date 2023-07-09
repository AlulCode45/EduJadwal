const express = require('express')
const { authLogin, authRegister, authRefreshToken, authLogout, authGetProfile } = require('../controller/authentication')
const authRoute = express.Router()

authRoute.post('/login', authLogin)
authRoute.post('/register', authRegister)
authRoute.post('/refresh', authRefreshToken)
authRoute.post('/logout', authLogout)
authRoute.get('/me', authGetProfile)


module.exports = authRoute