//* EDIT USERS

// Imports
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

// Function if a get request is sent
export const GET = async () => {
	return NextResponse.json({ message: "This method is Not impelemented Yet!" });
};

//* Main function for uppdateing book data in the database
const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
	const {
		userType,
		id,
		image,
		firstName,
		lastName,
		password,
		email,
		phone,
		admin,
		studentclass,
	} = await req.json(); // We have to await the request body to get the data
	if (!id || !firstName || !lastName || !password || !email || !phone) {
		return NextResponse.json(
			{
				message: "Missing required data. Please provide all necessary fields.",
			},
			{ status: 400 },
		);
	}
	try { // The Prisma funcitons
		let last = lastName;
			//* Check if a prisam user with the mail already exists
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const response = await (prisma as any)[userType].findUnique({ 
            where: {
                ...(userType === "Staff" && {
					email: `${firstName}.${lastName}@ntig.se`,
				}),
				...(userType === "Student" && {
					email: `${firstName}.${lastName}@elev.ntig.se`,
				}),
            }
        });
		// If a user alredy exists adds a 2 to the end of the lastname
        if(response.firstName === firstName && response.lastName === lastName){
            last = `${lastName}2`;
        };
		
		
        
		// Update for users
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const updatedUser = await (prisma as any)[userType].update({
			where: { id: Number(id) },
			data: {
				image: image.slice(0, 7) === "public/" ? image.slice(7) : image,
				firstName: firstName,
				lastName: lastName,
				password: password,
				...(userType === "Student" && {
					email: email === response.email ? `${firstName}.${last}@elev.ntig.se` : email
				}),
				...(userType === "Staff" && {
					email: email === response.email ? `${firstName}.${last}@ntig.se` : email
				}),
				phone: phone,
				...(userType === "Staff" && { admin: Boolean(admin) }),
				...(userType === "Staff" && {
					qrCode: firstName + last + userType,
				}),
				...(userType === "Student" && { classroom: studentclass }),
				...(userType === "Student" && {
					qrCode: firstName + last + studentclass,
				}),
			},
		});
		return NextResponse.json({ user: updatedUser }, { status: 200 });
	} catch {
		// Extra error checking
		console.error(Error);
		return NextResponse.json(
			{
				message:
					"Type Error. This can be caused because of malformed Data (Check Data Type)",
			},
			{ status: 500 },
		);
	}
};
