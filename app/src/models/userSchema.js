const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    id: {
        type: String,
        require: true,
    },
    psword: {
        type: String,
        require: true,
    },
});
const Uschema = mongoose.model("usheam", UserSchema);
module.exports = Uschema;
