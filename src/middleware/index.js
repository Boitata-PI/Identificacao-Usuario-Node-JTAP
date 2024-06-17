const { admin } = require("../config/firebase");



const verifyToken = async (req, res, next) => {
    const idToken = req.cookies.access_token;
    if (!idToken) {
        res.render("errors/error", {layout: "guest", codError: "403", textError: 'Não Autorizado!'});
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken); 
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.render("errors/error", {layout: "guest", codError: "403", textError: 'Não Autorizado!'});
    }
};

module.exports = verifyToken;
