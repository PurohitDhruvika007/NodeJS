export const isAuthenticated = (req, res, next) => {
    if (req.cookies.auth_token) {
        next();
    }
    else {
        res.json({ message: "signin first ..." });
    }
}
