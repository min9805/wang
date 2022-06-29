const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        const {id, psword} = await UserStorage.getUserInfo(client.id);
        //await은 async안에서만 쓸 수 있음. await은 promise를 반환하는 것에서만 사용가능.
        if(id) {
            if (id === client.id && psword === client.psword) {
                return {success: true};
            }
            return {success: false, msg: "비밀번호가 틀렸습니다."};
        }
        return {success: false, msg: "존재하지 않는 아이디입니다."};
    }

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.signUp(client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
        
    }
}

module.exports = {
    User
}