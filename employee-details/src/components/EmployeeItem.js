import React from 'react';

const EmployeeItem = ({ employee, onSelect }) => {
  return (
    <li onClick={() => onSelect(employee)}>
      {employee.name} - {employee.department}
    </li>
  );
};

export default EmployeeItem;
