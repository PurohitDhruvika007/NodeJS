export const logger = (req, res, next) => {
    console.log(`visited : ${req.method} and ${req.url}`);
    next();
}