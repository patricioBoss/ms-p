import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    trim: true,
    unique: false,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  password:{
    type:String,
    trim:true,
    required: 'password is required'
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  date: { type: Date, 
    default: Date.now 
  },
});

UserSchema.plugin(mongoosePaginate);


export default mongoose.model('user', UserSchema);