import axios from "axios";
import { type User, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<User[]> {
	// Fetch data from API endpoint needs to be fixed with AXIOS
	// Axios wants to connect to port 80 instead of 3000

	const response = await axios(
		"http://localhost:3000/api/administrative/getUsers",
	).then((res) => {
		return res.data.Users;
	});
	// Parse response as User type
	const data: User[] = response;

	// convert FirstName and LastName to string and return it as a name
	return data.map((user) => {
		return {
			...user,
			Name: `${user.firstName} ${user.lastName}`,
			usertype: user.isStaff,
			isAdmin: user.isAdmin,
			// convert CreatedAt to year-month-day
			createdAt: user.createdAt.slice(0, 10),
		};
	});
}
export default async function DemoPage() {
	const data = await getData();

	return (
		<div className="px-10 py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
