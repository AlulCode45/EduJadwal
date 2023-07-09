const { connectDb } = require("../config/db")

const checkAuthentication = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1]
    return await connectDb.table('Users')
        .where('token', '=', token)
        .first('*')
        .then(() => {
            next()
        }).catch(() => {
            res.status(401).json({
                status: false,
                massage: "Unauthenticated"
            })
        })
}

module.exports = { checkAuthentication }