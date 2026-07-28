import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const token = req.cookies["auth"];

    if (!token) {
        return next()
    };

    const secret = process.env.JWT_SECRET;

    try {
        const decodedToken = jwt.verify(token, secret);

        req.user = decodedToken;
        res.locals.user = decodedToken;
    } catch (error) {
        return res.clearCookie("auth").redirect("/auth/login");
    };

    next();
};

export function isAuthenticated(req, res, next) {

    if(!req.user) {
        return res.redirect("/auth/login");
    };

    next();
};

export function isGuest(req, res, next) {

    if(res.user) {
        return res.redirect("/");
    };

    next();
}