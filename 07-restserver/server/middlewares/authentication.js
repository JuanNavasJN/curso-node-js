const jwt = require('jsonwebtoken')

//===================
//  Verificar Token
//==================

const verifyToken = (req, res, next) => {

    const token  = req.get('Authorization')

    jwt.verify( token, process.env.SEED, (err, decoded) => {

        if( err ){
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.user = decoded.user
        next()
    })

}

//===================
//  Verificar Token
//==================

const verifyAdminRole = (req, res, next) => {

    const user = req.user

    if(user.role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Only admin'
            }
        })
    }

    next()

}

module.exports = {
    verifyToken,
    verifyAdminRole
}