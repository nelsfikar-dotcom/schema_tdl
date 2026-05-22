import { users } from "../../schema";
import { Request, Response } from "express";
import db from "../..";
import { eq } from "drizzle-orm";

export const registerUser = async (req: Request, res: Response) => {
    try {

        const { name, email, password } = req.body;

        // cek email sudah ada
        const checkUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (checkUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "email already exists",
                data: [],
            });
        }

        // simpan user
        await db.insert(users).values({
            name,
            email,
            password,
            created_at: new Date(),
            updated_at: new Date(),
        });

        res.json({
            success: true,
            message: "register success",
            data: [],
        });

    } catch (e) {

        res.status(500).json({
            success: false,
            message: "error : " + e,
            data: [],
        });

    }
};