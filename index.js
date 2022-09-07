const express = require("express");
const app = express();
const port = 3000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const config = require("./config/key");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

//application/x-www-form-urlencoded분석
app.use(bodyParser.urlencoded({ extended: true }));
//application/json분석
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 안녕하세요 backend");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 클라이언트에서 가져오면 그것들을 db에 넣어준다
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/login", (req, res) => {
  // 요청된 email을 db에서 찾기
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호까지 맞다면 토큰을 형성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user.user_id });
      });
    });
  });
});
