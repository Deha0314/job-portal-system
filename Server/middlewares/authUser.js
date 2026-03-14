import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.id = decoded.userId;   // <-- use decoded

        next();
    } catch (error) {
        console.log(error);
    }
};

export default authUser;