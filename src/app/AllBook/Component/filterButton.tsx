import React, { useState } from "react";
import { useRouter } from "next/navigation";

export const FilterButton: React.FC = () => {
	const [dropdown, setDropdown] = useState(false);

	return (
		<div className="relative size-1/12 h-56 flex justify-start flex-col items-start left-2">
			<button
				id="dropdownDefaultButton"
				onClick={() => {
					setDropdown(!dropdown);
				}}
				className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-28 h-14 translate-y-5"
				type="button"
			>
				Filter
			</button>
			<div
				id="dropdown"
				className={
					!dropdown
						? "hidden"
						: "z-20 bg-white p-2 rounded-lg shadow w-28 dark:bg-gray-700 translate-y-5 flex justify-around items-center"
				}
			>
				<input type="checkBox" name="myBooks" id="myBooks" />
				<label htmlFor="myBooks" className="text-xs">
					My books
				</label>
			</div>{" "}
		</div>
	);
};
