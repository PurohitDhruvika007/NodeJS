import multer from "multer"

const storage = multer.diskStorage({
    destination: "/uploads",
    filename: ((req, res, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    })
})
export const uploads = multer({ storage });
