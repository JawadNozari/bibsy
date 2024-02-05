// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

async function main() {
	// try {
	//   const allUsers = await prisma.user.findMany({
	//       include: {
	//       }
	//   });
	//   return(allUsers)
	// } catch (error) {
	//   console.error(error);
	//   throw error; // Throw the error to be caught in the catch block below
	// } finally {
	//   await prisma.$disconnect();
	// }
}

// Call the main function
main()
	.then((test) => {
		console.log(test);
	})
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});
