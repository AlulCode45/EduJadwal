const { connectDb } = require("../config/db.config")

const getAllClass = async (req, res) => {
    return await connectDb.select('*').from('Classes')
        .then((out) => {
            res.json({
                status: true,
                massage: 'Get class success',
                data: out
            })
        }).catch((err) => {
            res.json({
                status: false,
                massage: 'Get class failed',
                error: err
            })
        })
}

const getClassById = async (req, res) => {
    return await connectDb.table('Classes')
        .where('id', req?.params?.id)
        .first()
        .then((out) => {
            res.json({
                status: true,
                massage: 'Get class success',
                data: out
            })
        }).catch((err) => {
            res.json({
                status: false,
                massage: 'Get class failed',
                error: err
            })
        })
}

module.exports = { getAllClass, getClassById }