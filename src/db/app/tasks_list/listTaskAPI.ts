import { task_list, tasks } from "../../schema"
import { Request, Response } from 'express';
import db from "../.."
import { eq } from "drizzle-orm";
import { datetime } from "drizzle-orm/mysql-core";

export const getAllTaskList = async (req: Request, res: Response) => {
    try {
        const data = await db.select().from(task_list);
        res.json({
            succes: true,
            messages: "succes to fetch task list",
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

export const createListTask = async (req: Request, res: Response) => {
    try {
        const data = await db.insert(task_list).values(req.body)
        res.json({
            succes: true,
            messages: "succes to create task list",
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

export const findListTaskById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await db.select().from(task_list).where(eq(task_list.id, Number(id)))
        res.json({
            succes: true,
            messages: "succes to find task list" + id,
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

export const updateListTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await db.update(task_list).set({ ...req.body, updated_at: new Date }).where(eq(task_list.id, Number(id)))
        res.json({
            succes: true,
            messages: "succes to update task list",
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

export const deleteListTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await db.delete(task_list).where(eq(task_list.id, Number(id)))
        res.json({
            succes: true,
            messages: "succes to delete task list" + id,
            data: []
        })

    } catch (e) {
        res.status(500).json({
            succes: false,
            messages: "error : " + e,
            data: []
        })
    }

}