const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema(
    {
    Position : String,
    Company : String,
    Duration : String,
    Location : String,
    JobProfile : String
    },
    {
        timestamps : true
    }
);

// Check if the model already exists
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);

module.exports = Experience;