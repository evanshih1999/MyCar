import mongoose from 'mongoose'
 
const Schema = mongoose.Schema;
const DoorSchema = new Schema({
    username: String,
    doorname: String,
});
const Door = mongoose.model('Door', DoorSchema);

export default Door;