import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(404).json({ message: "Login Plz...", success: false });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
    req.user = decoded;
    next();
  });
};
