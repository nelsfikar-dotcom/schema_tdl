import { tasks, users } from "../../schema"
import { Request, Response } from 'express';
import db from "../.."
import { eq } from "drizzle-orm";

export const getAlltask = async (req: Request, res: Response) => {
    try {
        const data = await db.select().from(tasks);
        res.json({
            succes: true,
            message: "succes to fetch task",
            data: data
        })

    } catch (e) {
        res.status(500).json({
            succes: false,
            mesagge: "error : " + e,
            data: []
        })
    }

};

export const getTaskByUSerId = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params
        const data = await db.select().from(tasks).where(eq(tasks.user_id, Number(user_id)))
        res.json({
            succes: true,
            message: "succes to find task user by user id" + user_id,
            data: data
        })
    } catch (e) {
        res.status(500).json({
            succes: false,
            message: "error : " + e,
            data: []
        })
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const data = await db.insert(tasks).values(req.body)
        res.json({
            succes: true,
            message: "succes to create task",
            data: []
        })

    } catch (e) {
        res.status(500).json({
            succes: false,
            message: "error : " + e,
            data: []
        })
    }

};

export const findTaskById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await db.select().from(tasks).where(eq(tasks.id, Number(id)))
        res.json({
            succes: true,
            message: "succes to find task by id" + id,
            data: data
        })

    } catch (e) {
        res.status(500).json({
            succes: false,
            messages: "error : " + e,
            data: []
        })
    }

};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await db.update(tasks).set({ ...req.body, updated_at: new Date }).where(eq(tasks.id, Number(id)))
        res.json({
            succes: true,
            messages: "succes to update task",
            data: data
        })

    } catch (e) {
        res.status(500).json({
            succes: false,
            messages: "error : " + e,
            data: []
        })
    }

};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await db.delete(tasks).where(eq(tasks.id, Number(id)))
        res.json({
            succes: true,
            messages: "succes delete task",
            data: []
        })

    } catch (e) {
        res.status(500).json({
            succes: false,
            messages: "error : " + e,
            data: []
        })
    }

};