
const fs = require("fs").promises;  //promise가 수행하는 동작이 끝남과 동시에 상태를 알려주기 때문에 비동기 처리에 아주 효과적임.
const { User } = require("./User");
const ush = require("./userSchema");
const bcrypt = require('bcrypt');
const { use } = require("../routes/home");


class UserStorage { //클래스안에 변수를 선언할 때는 const가 필요없음.
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);  //id가 들어있는 인덱스 반환.
        const usersKeys = Object.keys(users);  // => [id, psword, name], 키값들을 리스트로 만듦.
        const userInfo = usersKeys.reduce((newUsers, info) => {
            newUsers[info] = users[info][idx];
            return newUsers;
        }, {});

        return userInfo;
    }

    static #getUsers(data, fields) {
        const users = JSON.parse(data);
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUsers(...fields) {
        return fs.readFile("./src/databases/users.json") //readFile메소드는 promise를 반환함. promise를 반환하게 되면 then이라는 메소드에 접근 가능. then은 성공했을 때, catch는 실패했을때
            .then((data) => {
                return this.#getUsers(data, fields);
            })
            .catch(console.error);
    }

    static getUserInfo(id) {  //User.js 에서 받아온 id 값을 파라미터로
        return fs.readFile("./src/databases/users.json") //readFile메소드는 promise를 반환함. promise를 반환하게 되면 then이라는 메소드에 접근 가능. then은 성공했을 때, catch는 실패했을때
            .then((data) => {
                return this.#getUserInfo(data, id);
            })
            .catch(console.error);
    }

    static async signUp(userInfo) {

        const id = userInfo.id;
        const name = userInfo.name;
        const psword = userInfo.psword;
        try {
            let user = await ush.findOne({id});
            if (user) if (user) return {success: false, msg: "아이디 중복입니다. 다시 입력해주세요."};
            user = new ush({
                name,
                id,
                psword,
            });
    
            const salt = await bcrypt.genSalt(10);
            user.psword = await bcrypt.hash(psword, salt);
    
            await user.save();
            console.log(user);

            return {success: true};
        } catch (err) {
            return { success: false, msg: err };
        }
        
        // const users = await this.getUsers("id", "psword", "name");  //데이터 추가
        // if(!users.id.includes(userInfo.id)) {
        //     users.id.push(userInfo.id);
        //     users.name.push(userInfo.name);
        //     users.psword.push(userInfo.psword);
        //     fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        //     return { success: true };
        // }
        // else {throw "이미 존재하는 아이디입니다."}

    }
}

module.exports = UserStorage;