function isAuth(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({status: 401, type: "unauthorized", error: "UnAuthorized"});
    }
}

export {isAuth};