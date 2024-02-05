import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type Data = {
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    image: string,
    class: string,
    qrCode: string,
};

// Handler function for handling student registration
export default async function adminCenter(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request method is POST
    if (req.method === "POST") {
        console.log(req.body);
        const { password, firstName, lastName, email, phone, image, class: studentClass }: Data = req.body;

        try {
            // Create a new student record using Prisma client
            const student = await prisma.student.create({
                data: {
                    password,
                    firstName,
                    lastName,
                    email,
                    phone,
                    image,
                    class: studentClass,
                    qrCode: "", // Add the qrCode property with a default value
                },
            });

            // Send a 201 Created response with the created student
            res.status(201).json(student);
        } catch (error) {
            // Log and send a 500 Internal Server Error response if an error occurs
            console.error(error);
            res.status(500).json({ error: error });
        }
    } else {
        // Send a 400 Bad Request response if the request method is not POST
        res.status(400).json({ error: "Wrong request method" });
    }
}
