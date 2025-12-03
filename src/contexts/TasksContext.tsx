import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Task } from "../entities/Task";
import { tasksService } from "../services/api";

export interface TasksContextData {
  tasks: Task[],
  createTask: (attributes: Omit<Task, 'id'>) => Promise<void>,
  updateTask: (id: number, attributes: Partial<Omit<Task, 'id'>>) => Promise<void>,
  deleteTask: (id: number) => Promise<void>,
}

export const TaskContext = createContext ({} as TasksContextData);

interface TasksProviderProps {
  children: ReactNode
}

export const TasksProvider: React.FC<TasksProviderProps> = ({children}) => {

    const [tasks, setTasks] = useState<Task[]>([]);

     useEffect(() => {
        tasksService.fetchTasks().then((data) => {
            setTasks(data);
        });
    } , []);

    const createTask = async (attributes: Omit<Task, 'id'>) =>{
        const newTask = await tasksService.createTask(attributes);
        setTasks((currentState) => {
            const updatedTasks = [...currentState, newTask];
            return updatedTasks;
        })
}

const updateTask = async (id: number, attributes: Partial<Omit<Task, 'id'>>) => {

}

const deleteTask = async (id: number) => {

}

    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask } as TasksContextData}>
            {children}
        </TaskContext.Provider>
    )
}