import { users } from "../../schema"
import { Request, Response } from 'express';
import db from "../.."
import { eq } from "drizzle-orm";
import { datetime } from "drizzle-orm/mysql-core";

export const getAlluser = async (req: Request, res: Response) => {
    try {
        const data = await db.select().from(users);
        res.json({
            succes: true,
            message: "succes to fetch user",
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

export const createUser = async (req: Request, res: Response) => {
    try {
        const data = await db.insert(users).values(req.body)
        res.json({
            succes: true,
            message: "succes to create user",
            data: []
        })

    } catch (e) {
        res.status(500).json({
            succes: false,
            mesagge: "error : " + e,
            data: []
        })
    }

};

export const findMyUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await db.select().from(users).where(eq(users.id, Number(id)))
        res.json({
            succes: true,
            message: "succes to find my user by id :" + id,
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

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await db.update(users).set({ ...req.body, updated_at: new Date }).where(eq(users.id, Number(id)))
        res.json({
            succes: true,
            message: "succes to update user",
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

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await db.delete(users).where(eq(users.id, Number(id)))
        res.json({
            succes: true,
            message: "succes to delete user" + id,
            data: []
        })

    } catch (e) {
        res.status(500).json({
            succes: false,
            mesagge: "error : " + e,
            data: []
        })
    }

};