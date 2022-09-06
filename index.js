const express = require("express");
const app = express();
const port = 3000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const config = require("./config/key");
//application/x-www-form-urlencoded분석
app.use(bodyParser.urlencoded({ extended: true }));
//application/json분석
app.use(bodyParser.json());

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
