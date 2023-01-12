const checkAuth = (req, res, next) => {
  try {
    if (req.user !== undefined) {
      next();
    }
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
};

module.exports - checkAuth;
