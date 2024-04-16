function login(req, res) {
    res.json({user: req.user});
}
function getSession(req, res) {
    if(req.isAuthenticated()) {
        res.json({session: req.user});
    } else {
        res.status(401).json({error: "UnAuthorized"});
    }
}

function logout(req, res) {

}
export {login, getSession, logout}