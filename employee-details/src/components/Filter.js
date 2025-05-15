import React from 'react';

const Filter = ({ setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default Filter;
