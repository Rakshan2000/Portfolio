const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema(
    {
    ProjectName : String,
    Technologies : String,
    Website : String,
    GitHub : String
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('Project',ProjectsSchema);

const Project = mongoose.models.Project || mongoose.model("Project",ProjectsSchema);

module.exports = Project;