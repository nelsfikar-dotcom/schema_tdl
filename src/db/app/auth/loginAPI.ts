import { users } from "../../schema";
import { Request, Response } from "express";
import db from "../..";
import { eq } from "drizzle-orm";

export const loginUser = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        // cari user berdasarkan email
        const data = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        // cek user ada atau tidak
        if (data.length === 0) {
            return res.status(400).json({
                success: false,
                message: "email not found",
                data: [],
            });
        }

        const user = data[0];

        // cek password
        if (user?.password !== password) {
            return res.status(400).json({
                success: false,
                message: "wrong password",
                data: [],
            });
        }

        res.json({
            success: true,
            message: "login success",
            data: user,
        });

    } catch (e) {

        res.status(500).json({
            success: false,
            message: "error : " + e,
            data: [],
        });

    }
};