import { Request,Response } from "express";
import * as projectService from "../services/projectServices"

export const addProject = async (req:Request,res:Response) =>{
    try{
        const newProject = await projectService.createProject(req.body)
        res.status(201).json(newProject)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Error in creating Project"})

    }
}
export const getAllProject = async (req:Request,res:Response) =>{
    try{
        const Project = await projectService.findAllProject();
        res.status(200).json(Project)
    }catch (error){
        res.status(500).json({message: "Error retrieving Project"})
    }
}

export const deleteProjectById =async (req:Request, res:Response)=> {
    try{
         const id  = parseInt(String(req.params.id))
         const deletedProject = await projectService.deleteProject(id) 
            if(!deletedProject){
              return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({message: "Project Deleted "})
} catch(error){
    console.log(error)
    res.status(500).json({message: "Error deleting Project"})
    }
}