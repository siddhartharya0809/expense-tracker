import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ msg: "User not Authenticated", success: false });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        msg: "invalid token",
        success: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
