"use strict"

const express = require("express")
const router = express.Router()

const ctrl = require("./home.ctrl")

router.get("/", ctrl.output.hello)
router.get("/login", ctrl.output.login)
router.get("/register", ctrl.output.register)  //get을 사용하게되면 url에 입력한 정보가 표시됨.

router.post("/login", ctrl.process.login)      //post를 사용하면 url에 입력 정보 표시 X ??잘 모르겠음.
router.post("/register", ctrl.process.register)  

module.exports = router //메인파일과 연결하는 역할.(외부로 내보내기)