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
    if(!req.isAuthenticated()) return res.status(400).json({type: "not_exist", error: "The sesssion not exist"});
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).json({error: "An error has ocurred when trying to logout"});
        } else {
            return res.json({success: "closed session"});
        }
    })
}
export {login, getSession, logout}