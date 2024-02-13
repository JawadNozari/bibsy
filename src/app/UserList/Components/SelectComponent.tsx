import React, { useState, useEffect } from "react";

interface SelectComponentProps {
	initialClassroom: string; // Define prop type
}

const SelectComponent: React.FC<SelectComponentProps> = ({
	initialClassroom,
}) => {
	const [selectedClassroom, setSelectedClassroom] = useState<string>("");

	useEffect(() => {
		// Set the initial value from the prop
		setSelectedClassroom(initialClassroom);
	}, [initialClassroom]); // Ensure useEffect runs when initialClassroom changes

	const generateClassroomOptions = () => {
		const currentYear = new Date().getFullYear();
		const specialties = ["TEK", "EL", "DES"];
		const lastYearClassroom = "TE4";

		const classroomOptions = specialties.flatMap((specialty) =>
			Array.from(
				{ length: 4 },
				(_, index) =>
					`${(currentYear - index).toString().slice(-2)}${specialty}`,
			),
		);

		// Add TE4 for the last year
		classroomOptions.push(lastYearClassroom);

		// Sort the classroom options based on the extracted numbers
		classroomOptions.sort((a, b) => {
			const numA = parseInt(a.slice(0, 2));
			const numB = parseInt(b.slice(0, 2));
			return numA - numB;
		});

		return classroomOptions;
	};

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedClassroom(event.target.value);
	};

	return (
		<div>
			<select
				className="border rounded-full"
				value={selectedClassroom}
				onChange={handleChange}
			>
				<option value="">Select</option>
				{generateClassroomOptions().map((classroom) => (
					<option key={classroom} value={classroom}>
						{classroom}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectComponent;
