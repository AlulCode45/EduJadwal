const { connectDb } = require("../config/db")
const bcrypt = require('bcrypt')

const authLogin = async (req, res) => {
    return await connectDb.table('Users')
        .where('username', req?.body?.username)
        .first('*')
        .then(async (out) => {
            if (bcrypt.compareSync(req?.body?.password, out?.password)) {
                const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
                const token = randomToken(62)
                return await connectDb.table('Users')
                    .where('id', out?.id)
                    .first('*')
                    .update({
                        token: token
                    }).then(() => {
                        out['token'] = token
                        res.json({
                            status: true,
                            massage: "Login successfully",
                            data: out,
                        })
                    })
            } else {
                throw new Error("Username / Password incorrect")
            }
        }).catch((err) => {
            res.json({
                status: false,
                massage: "Unauthenticated",
                error: err
            })
        })
}

const authRegister = async (req, res) => {
    const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
    const token = randomToken(62)

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req?.body?.password, salt);

    return await connectDb.table('Users').insert({
        name: req?.body?.name,
        username: req?.body?.username,
        password: password,
        token: token,
        role: req?.body?.role
    }).then(() => {
        res.json({
            status: true,
            massage: "Register successfully",
            data: {
                name: req?.body?.name,
                username: req?.body?.username,
                password: password,
                role: req?.body?.role,
                token: token,
            }
        })
    }).catch((err) => {
        res.json({
            status: false,
            massage: "Register unsuccessfully",
            error: err
        })
    })
}
const authRefreshToken = async (req, res) => {
    const token = req?.headers?.authorization?.split(' ')[1]

    const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
    const newToken = randomToken(62)

    return await connectDb
        .table('Users')
        .where('token', token)
        .first('*')
        .then(async (out) => {
            if (out) {
                return await connectDb.table('Users')
                    .where('id', out?.id)
                    .first('*')
                    .update({
                        token: newToken
                    }).then(() => {
                        res.json({
                            status: true,
                            massage: "Token refresh success",
                            token: newToken
                        })
                    }).catch((err) => {
                        res.json({
                            status: false,
                            massage: "Token refresh failed",
                            error: err
                        })
                    })
            } else {
                throw new Error()
            }
        }).catch((err) => {
            res.json({
                status: false,
                massage: "Unauthenticated",
                error: err
            })
        })

}
const authLogout = async (req, res) => {
    const token = req?.headers?.authorization?.split(' ')[1]

    return await connectDb
        .table('Users')
        .where('token', token)
        .first('*')
        .then(async (out) => {
            if (out) {
                return await connectDb.table('Users')
                    .where('id', out?.id)
                    .first('*')
                    .update({
                        token: null
                    }).then(() => {
                        res.json({
                            status: true,
                            massage: "Logout success",
                        })
                    }).catch((err) => {
                        res.json({
                            status: false,
                            massage: "Logout failed",
                            error: err
                        })
                    })
            } else {
                throw new Error()
            }
        }).catch((err) => {
            res.json({
                status: false,
                massage: "Unauthenticated",
                error: err
            })
        })
}
const authGetProfile = async (req, res) => {
    const token = req?.headers?.authorization?.split(' ')[1]

    return await connectDb.table('Users')
        .where('token', token)
        .first()
        .then((out) => {
            res.json({
                status: true,
                massage: 'Get data success',
                data: out
            })
        }).catch((err) => {
            res.json({
                status: false,
                massage: 'Get data failed',
                error: err
            })
        })
}

module.exports = {
    authLogin,
    authRegister,
    authRefreshToken,
    authLogout,
    authGetProfile
}