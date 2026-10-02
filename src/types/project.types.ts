export type submission_status = 'Pending' | 'Approved' | 'Rejected';

export interface project {
    id: number;
   name: string;
   userId:number;
 project_status: submission_status;
 
}
export type Newproject = Omit<project, 'id' | 'project_status'>; 