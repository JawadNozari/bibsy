import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
	const users = async () => {
		const amountOfUsers = 50;
		// Create users
		const users = [];
		for (let i = 0; i < amountOfUsers; i++) {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			const user = {
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				username: faker.internet.userName({ firstName, lastName }),
				email: faker.internet.email({ firstName, lastName }),
				phone: faker.helpers.fromRegExp("07[0-9]{8}"),
				image: faker.image.avatar(),
				password: faker.internet.password(),
				qrCode: faker.number.int({ min: 7, max: 13 }).toString(),
				isAdmin: faker.datatype.boolean(),
				isStaff: faker.datatype.boolean(),
				isStudent: faker.datatype.boolean(),
			};
			users.push(user);
		}
		return users;
	};
	// Create users
	const uss = await users();
	await prisma.users.createMany({
		data: uss.map((user) => ({
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			email: user.email,
			phone: user.phone,
			image: user.image,
			password: user.password,
			qrCode: user.qrCode,
			isAdmin: user.isAdmin,
			isStaff: user.isStaff,
			isStudent: user.isStudent,
		})),
	});
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
