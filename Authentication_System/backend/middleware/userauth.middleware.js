import jwt from "jsonwebtoken";

// 1st middlware function executed i.e. userAuth
const userAuth = async (req, res, next) => {
  const { token } = req.cookies; // 2nd get the token from the cookie

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  try {
    // 3rd decode the token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body = req.body || {};
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next(); // 4th next fun execute our controller fun "sendVerifyOtp" -> userId that is added in middleware userauth
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// 5th export the middleware
export default userAuth;
