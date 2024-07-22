import React, { useEffect, useState } from 'react';
import { Card, Spin, Button, message, Empty, Modal } from "antd";
import { useLocation } from "react-router-dom";
import agent from "../../api/agent";
import { todoTask } from "../../models/todoTask";
import EditTaskModal from "./EditTaskModal";

const priorityMapping: { [key: string]: string } = {
    warning: "Low",
    success: "Normal",
    error: "High"
};

const TaskList = () => {
    const location = useLocation();
    const { date } = location.state || { date: null };
    const [tasks, setTasks] = useState<todoTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentTask, setCurrentTask] = useState<todoTask | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null); // Track task ID being deleted

    useEffect(() => {
        if (date) {
            fetchTasksByDate(date);
        } else {
            setLoading(false);
        }
    }, [date]);

    const fetchTasksByDate = async (date: string) => {
        try {
            const tasks = await agent.TodoTask.getTasksByDate(date);
            // Sort tasks in ascending order by startTime, assuming startTime is in a 'HH:mm' format
            tasks.sort((a:any, b:any) => {
                const [hoursA, minutesA] = a.startTime.split(':').map(Number);
                const [hoursB, minutesB] = b.startTime.split(':').map(Number);
                const dateA = new Date();
                dateA.setHours(hoursA, minutesA);
                const dateB = new Date();
                dateB.setHours(hoursB, minutesB);
                return dateA.getTime() - dateB.getTime();
            });
            setTasks(tasks);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
            message.error("Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = async (taskId: number) => {
        try {
            const task = await agent.TodoTask.getTaskById(taskId);
            setCurrentTask(task);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Failed to fetch task", error);
            message.error("Failed to fetch task");
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
    };

    const handleModalSave = async (updatedTask: todoTask) => {
        try {
            await agent.TodoTask.update(updatedTask.taskId, updatedTask);
            const updatedTasks = tasks.map((task) =>
                task.taskId === updatedTask.taskId ? updatedTask : task
            );
            setTasks(updatedTasks);
            message.success("Task updated successfully");
            handleModalClose();
        } catch (error) {
            console.error("Failed to update task", error);
            message.error("Failed to update task");
        }
    };

    const handleDeleteClick = async (taskId: number) => {
        try {
            await agent.TodoTask.detele(taskId);
            setTasks(tasks.filter(task => task.taskId !== taskId));
            message.success("Task deleted successfully");
        } catch (error) {
            console.error("Failed to delete task", error);
            message.error("Failed to delete task");
        }
    };

    if (loading) {
        return <Spin size="large" className="flex justify-center items-center min-h-screen" />;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-3xl">
                <h1 className="text-2xl font-bold text-center mb-4">Task Management</h1>
            <Card title={`Tasks for ${date}`} className="w-full max-w-3xl">
                {tasks.length === 0 ? (
                    <Empty description="No tasks found for this date" />
                ) : (
                    tasks.map((task) => (
                        <Card
                            className="mb-4"
                            key={task.taskId}
                            type="inner"
                            title={task.title}
                            hoverable
                            extra={
                                <div className="flex gap-4">
                                    <Button onClick={() => handleEditClick(task.taskId)}>Edit</Button>
                                    <Button onClick={() => setDeletingTaskId(task.taskId)}>Delete</Button>
                                    <Modal
                                        title="Confirm Delete"
                                        open={deletingTaskId === task.taskId}
                                        onOk={() => {
                                            handleDeleteClick(task.taskId);
                                            setDeletingTaskId(null);
                                        }}
                                        onCancel={() => setDeletingTaskId(null)}
                                    >
                                        <p>Are you sure you want to delete this task?</p>
                                    </Modal>
                                </div>
                            }
                        >
                            <p className="text-lg"><strong>Date:</strong> {task.date}</p>
                            <p className="text-lg"><strong>From:</strong> {task.startTime}</p>
                            <p className="text-lg"><strong>To:</strong> {task.endTime}</p>
                            <p className="text-lg"><strong>Priority:</strong> {priorityMapping[task.priorityName]}</p>
                            <p className="text-lg"><strong>Description:</strong> {task.description}</p>
                        </Card>
                    ))
                )}
            </Card>
            </div>
            {currentTask && (
                <EditTaskModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    task={currentTask}
                    onSave={handleModalSave}
                />
            )}
        </div>
    );
};

export default TaskList;
