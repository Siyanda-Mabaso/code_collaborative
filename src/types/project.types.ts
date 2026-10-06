export type submission_status = 'Pending' | 'Approved' | 'Rejected';

export interface Project {
    id: number;
   name: string;
   userId:number;
   created_at:Date;
 project_status: submission_status;
 
}
export type Newproject = Omit<Project ,'id'|'created_at' >; 
export type UpdateProject = Omit<Project,"status">