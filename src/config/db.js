const connectDb = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'EduJadwal'
    }
});

const checkConnection = (req, res, next) => {
    connectDb.raw('SELECT 1').then(() => {
        next()
    }).catch((err) => {
        res.json({
            status: false,
            massage: "Database not connected",
            error: err
        })
    })
}

module.exports = {
    connectDb,
    checkConnection
}