import { Router } from "express";
import { getAllProject,addProject,deleteProjectById } from "../controllers/projectControllers";


const router = Router()

router.post('/projects',addProject)
router.get('/projects',getAllProject)

router.delete('/projects/:id',deleteProjectById)

export default router;