const { User } = require("../../models/User.js")  //상위 폴더는 ../로 타고 올라감.

const output = {
    hello: (req, res) => {
        res.render("home/index")
    },
    login: (req, res) => {
        res.render("home/login") //페이지를 렌더링
    },
    register: (req, res) => {
        res.render("home/register");
    }
}

const process = {
    login: async(req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    }
}

//객체들 밖으로 내보내기.
module.exports = {
    output, process
}