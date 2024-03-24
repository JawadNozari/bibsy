export default function Edit() {
	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
			<div
				className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
				onClick={undefined}
				onKeyUp={undefined} // Add onKeyUp event handler
				onKeyDown={undefined} // Add onKeyDown event handler
				onKeyPress={undefined} // Add onKeyPress event handler
			/>
			<div className="z-10 w-96 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
				<h2 className="text-lg font-semibold mb-2">Harry Potter</h2>
				<p className="text-sm text-gray-500 mb-4">By J.K. Rowling</p>
				<p className="text-sm">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
				<div className="flex justify-end mt-4">
					<button type="button" className="text-sm text-blue-500 mr-2">
						Edit
					</button>
					<button
						type="button"
						className="text-sm text-red-500"
						onClick={undefined}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
