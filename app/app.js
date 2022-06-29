//모듈
const express = require('express')
const bodyParser = require("body-parser") //npm i body-parser -s 로 bodyparser 설치해줌.
const app = express()
//라우팅
const home = require("./src/routes/home")
const connectDB = require("./src/config/db");

connectDB();

app.set("views", "./src/views")
app.set("view engine", "ejs")
app.use(express.static(`${__dirname}/src/public`)) //정적 경로 추가, 디렉터리네임은 현재 파일이 있는 경로를 반환
app.use(bodyParser.json()) //제이슨 데이터를 파싱해올 수 있도록
app.use(bodyParser.urlencoded({extended: true})) 
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결

app.use("/", home)  // use -> 미들 웨어를 등록해주는 메서드

module.exports = app;
//npm install ejs -s 로 ejs모듈 다운받기.
