const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
// register API
router.post('/user/register',userController.register)

// login API
router.post('/user/login',userController.login)

// add-project
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

// getuserprojects
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)
// getallProjects
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)
// gethome projects
router.get('/projects/home-project',projectController.getHomeProjects)
// edit projects
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectController)

// export router
module.exports = router