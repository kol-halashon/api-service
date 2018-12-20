const express = require('express');

const ProjectCtrl = require('../controllers/project');

const router = express.Router();

/* get */
router.get('/:projectId', (req, res) => {
  let projectId = req.params.projectId;

  return ProjectCtrl.findById(projectId)
    .then((project) => res.jsonSuccess(project))
    .catch((error) => res.jsonError(error));
});

router.get('/', (req, res) => {
  return ProjectCtrl.list()
    .then((projects) => res.jsonSuccess(projects))
    .catch((error) => res.jsonError(error));
});

/* post */
router.post('/', (req, res) => {
  let project = req.body.project;
  let user = req.user;

  return ProjectCtrl.create(project, user)
    .then((project) => res.jsonSuccess(project))
    .catch((error) => res.jsonError(error));
});

/* put */
router.put('/:projectId', (req, res) => {
  let projectId = req.params.projectId;
  let project = req.body.project;

  return ProjectCtrl.update(projectId, project)
    .then((project) => res.jsonSuccess(project))
    .catch((error) => res.jsonError(error));
});

module.exports = router;
