export default function BookTable() {
	return (
		<div className="flex-1 flex flex-col gap-4 p-4 overflow-auto ">
			<button
				type="button"
				className="text-gray-500 dark:text-gray-400 hidden lg:block focus:outline-none"
				onClick={undefined}
			>
				Collapse Sidebar
			</button>
			<table className="min-w-full">
				<thead className="rounded-lg">
					<tr>
						<th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
							Title
						</th>
						<th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
							Author
						</th>
						<th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs leading-4 font-medium  uppercase tracking-wider">
							Genre
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="bg-white dark:bg-gray-900">
						<td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
							Harry Potter
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm">
							J.K. Rowling
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm ">Fantasy</td>
					</tr>
					<tr className="bg-gray-50 dark:bg-gray-800">
						<td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
							The Great Gatsby
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm ">
							F. Scott Fitzgerald
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm ">Classics</td>
					</tr>
					<tr className="bg-white dark:bg-gray-900">
						<td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
							To Kill a Mockingbird
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm ">Harper Lee</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm ">Fiction</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
							Total books
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm ">3</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
