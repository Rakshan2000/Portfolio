const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema(
    {
    heading : String,
    summary : String
    },
    {
        timestamps:true
    }
);


const Home = mongoose.models.Home || mongoose.model('Home',HomeSchema);

module.exports = Home;