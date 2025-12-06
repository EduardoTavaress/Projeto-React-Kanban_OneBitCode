import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Task } from "../entities/Task";
import { tasksService } from "../services/api";

export interface TasksContextData {
  tasks: Task[],
  createTask: (attributes: Omit<Task, 'id'>) => Promise<void>,
  updateTask: (id: string, attributes: Partial<Omit<Task, 'id'>>) => Promise<void>,
  deleteTask: (id: string) => Promise<void>,
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

const updateTask = async (id: string, attributes: Partial<Omit<Task, 'id'>>) => {
    await tasksService.updateTask(id, attributes)
    setTasks((currentState) => {
        const updatateTasks = [...currentState]
        const taskIndex = updatateTasks.findIndex((task) => task.id === id)
        Object.assign(updatateTasks[taskIndex], attributes)
        return updatateTasks
    })
}

const deleteTask = async (id: string) => {
    await tasksService.deleteTask(id)
    setTasks((currentState) => currentState.filter((task) => task.id !== id))
    }


    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}