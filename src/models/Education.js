const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema(
    {
    Timeline : String,
    College : String,
    Degree : String,
    },
    {
        timestamps : true
    }
);

const Education = mongoose.models.Education || mongoose.model('Education',EducationSchema);

module.exports = Education;