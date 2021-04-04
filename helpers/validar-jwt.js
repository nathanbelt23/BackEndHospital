const { request, response } = require("express");
const jwt = require("jsonwebtoken");
module.exports.ValidarJWT = (req = request, res = response, next) => {

    try {
        // hay token
        let token = req.header("x-token");
        if (!token) {
            res.status(400).json({
                ok: false,
                msg: "Token no valido",
            });
        }

        //  verificacion del token
        const { uid } = jwt.verify(token, process.env.JWT_SECRET.trim());

        req.uid = uid;
    } catch {
        res.status(400).json({
            ok: false,
            msg: "Token no valido",
        });
    }
    next();
};