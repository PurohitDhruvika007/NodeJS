export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.json({ message: "user is unAuthorized" });
    }
}