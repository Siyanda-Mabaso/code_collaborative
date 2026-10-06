import {query} from "../confing/database"
import { Newproject, Project } from "../types/project.types"

export const createProject = async (appData:Newproject ):Promise<Project>=>{
    const {name, userId,project_status}= appData
    const {rows} = await query ("INSERT INTO projects (name,userId, project_status) VALUES($1,$2,$3) RETURNING *",
        [name,userId, project_status]
    )
    return rows[0]
}
export const findAllProject = async (): Promise<Project[]> => {
    const {rows} = await query (
        "SELECT * FROM projects ORDER BY created_at DESC"
    )
    return rows;
}
 export const deleteProject = async (id: number): Promise <Project | null >=> {
    const {rows} = await query ("DELETE FROM projectsolyh WHERE id = $1 RETURNING*",[id]);
    return rows[0]  || null
 }