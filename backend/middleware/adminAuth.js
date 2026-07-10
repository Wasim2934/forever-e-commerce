import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.headers.token

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" })
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        const expectedToken = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD

        if (tokenDecode !== expectedToken) {
            return res.status(401).json({ success: false, message: "not authorized login again" })
        }

        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })
    }
}

export default adminAuth