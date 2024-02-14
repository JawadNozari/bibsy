import axios from "axios";

export default function Error_example() {
	// make a examples that can lead to an error

	const data = axios
		.get("https://jsonplacehlder.typicode.com/posts/1") // this link is not correct therefor it will throw an error
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});

	return <>{data}</>;
}
