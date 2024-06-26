export interface todoTask{
    taskId: number;
    title: string;
    description?: string;
    priorityId: number;
    date?: string; // ISO string format
    startTime?: string; // ISO string format
    endTime?: string; // ISO string format
    priorityName: string;
}