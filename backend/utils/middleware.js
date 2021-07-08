const { checkToken } = require('./jwt')

const isTokenVerified = async function (req, res, next) {
    const result = await checkToken(req, res)
    return result["result"]
}

export { isTokenVerified }