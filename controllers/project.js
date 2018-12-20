const utils = require('../utils');
const Models = require('../models');
const Project = Models.Project;

let projectFields = [
  'name',
  'note'
];

class ProjectCtrl {
  static async create (project, user) {
    let projectNewObject = {};
    projectFields.forEach((field) => {
      projectNewObject[field] = utils.trim(project[field]);
    });
    projectNewObject.userId = user.id;

    return Project.create(projectNewObject);
  }

  static findById (id) {
    return Project.findById(id);
  }

  static list () {
    return Project.findAll();
  }

  static update (id, project) {
    let changes = {};

    projectFields.forEach((field) => {
      if (project.hasOwnProperty(field)) {
        changes[field] = utils.trim(project[field]);
      }
    });

    return this.findById(id)
      .then((resProject) => {
        return resProject.update(changes);
      });
  }

  static delete (id) {
    return Project.destroy({
      where: { id }
    });
  }
}

module.exports = ProjectCtrl;
