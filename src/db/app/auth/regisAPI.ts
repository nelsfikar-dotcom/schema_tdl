import { users } from "../../schema";
import { Request, Response } from " express";
import db from "../..";
import { eq } from "drizzle-orm";

export const registerUser = async (req: Request, res: Response) => {

    try {

        console.log("BODY => ", req.body);

        const { name, email, password } = req.body;

        const checkUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        console.log("CHECK USER => ", checkUser);

        if (checkUser.length > 0) {

            console.log("EMAIL SUDAH ADA");

            return res.status(400).json({
                success: false,
                message: "email already exists",
                data: [],
            });
        }

        await db.insert(users).values({
            name,
            email,
            password,
            created_at: new Date(),
            updated_at: new Date(),
        });

        console.log("REGISTER BERHASIL");

        res.json({
            success: true,
            message: "register success",
            data: [],
        });

    } catch (e) {

        console.log("ERROR REGISTER => ", e);

        res.status(500).json({
            success: false,
            message: "error : " + e,
            data: [],
        });
    }
};