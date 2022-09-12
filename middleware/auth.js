const { request } = require("express");
const { auth } = require("./middleware/auth");
const { User } = require("../models/User");
let auth = (req, res, next) => {
  //인증 처리하는 곳

  //클라이언트 쿠키에서 토큰을 가져옵니다.
  let token = req.cookies.x_auth;
  //토큰을 복호화 한 후 유저를 찾는다.

  //유저가 있으면 인증 okay

  //유저가 없으면 인증 No

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;

    next();
  });
};

module.exports = { auth };
