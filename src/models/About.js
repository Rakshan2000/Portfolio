const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema(
    {
    AboutMe : String,
    Projects : String,
    Experience : String,
    Clients : String,
    Skills : String
    },
    {
        timestamps : true
    }
);

const About = mongoose.models.About || mongoose.model('About',AboutSchema);

module.exports = About;