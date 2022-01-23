const mongoose = require('mongoose');


// const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    id:{type:Number},
   avatar:{type:String},
  name: { type: String, required: true },
  email: { type: String, required: true},
  jobtype: {type: String},
  pref_location: {type: String},
  dob: {
    type: Date
},
    mobile:{
        type: Number
    }
//   places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
});


module.exports = mongoose.model('User', userSchema);
