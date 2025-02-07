const authMiddleware = (roles) => (req, res, next) => {
    const userRole = req.user?.role;
    if (!roles.includes(userRole)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};
module.exports = authMiddleware;