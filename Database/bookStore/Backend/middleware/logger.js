export const logger = (req, res, next) => {
    console.log(`visited => ${req.method} method and ${req.url} url.`)
    next();
}