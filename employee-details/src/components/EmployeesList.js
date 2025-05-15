import React from 'react';

const EmployeeDetails = ({ employee }) => {
  if (!employee) return <p>Select an employee to see details</p>;

  return (
    <div>
      <h2>{employee.name}</h2>
      <p>Department: {employee.department}</p>
    </div>
  );
};

export default EmployeeDetails;
