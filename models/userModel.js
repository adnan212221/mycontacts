const mongoose = require('mongoose');

const Userschema = mongoose.Schema({
    username:{
        type:String,
        required: [true, 'username required' ]
    },
    email:{
        type:String,
        required: [true, 'email required' ]
    },
    password:{
        type:String,
        required: [true, 'password required' ]
        }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('User', Userschema)