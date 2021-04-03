const jwt = require("jsonwebtoken");

module.exports.GenerarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        //console.error("uid");
        //console.error(uid);

        const payload = { uid };
        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: "12h",
            },
            (err, token) => {
                if (err) {
                    // console.log(err);
                    reject("No se pudo generar token");
                } else {
                    resolve(token);
                }
            }
        );
    });
};