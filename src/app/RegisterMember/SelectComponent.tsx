"use client";
import { useState, useEffect } from "react";

// Function to generate classroom options based on current year and specialties
const generateClassroomOptions = () => {
  const currentYear = new Date().getFullYear();
  const specialties = ["TEK", "EL", "DES"];
  const lastYearClassroom = "TE4";

  const classroomOptions = specialties.flatMap(specialty =>
    Array.from({ length: 4 }, (_, index) => `${(currentYear - index).toString().slice(-2)}${specialty}`)
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

const SelectComponent: React.FC = () => {
  const [selectedClassroom, setSelectedClassroom] = useState<string>("");

  useEffect(() => {
    // Example variable
    const initialClassroom = "22TEK"; // You can set this variable to any value you want
    setSelectedClassroom(initialClassroom);
  }, []);

  const classroomOptions = generateClassroomOptions();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassroom(event.target.value);
  };

  return (
    <div>
      <label>Select Classroom:</label>
      <select value={selectedClassroom} onChange={handleChange}>
        <option value="">Select</option>
        {classroomOptions.map(classroom => (
          <option key={classroom} value={classroom}>
            {classroom}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;