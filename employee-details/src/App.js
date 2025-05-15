import React, { useEffect, useState } from 'react';
import EmployeeList from './components/EmployeesList';
import EmployeeDetails from './components/EmployeeDetails';
import Filter from './components/Filter';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchData = async () => {
    const response = await fetch(
      'http://localhost:8080/employee/getallemployees'
    );
    if (response.ok) {
      const result = await response.json();
      setEmployees(result);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.ename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Employee Management</h1>
      <Filter setSearch={setSearch} />
      <EmployeeList
        employees={filteredEmployees}
        onSelect={setSelectedEmployee}
      />
      <EmployeeDetails employee={selectedEmployee} />
    </div>
  );
};

export default App;
