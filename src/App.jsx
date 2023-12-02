// App.jsx
import React, { useState, useEffect } from "react";
import Records from "./Components/Records";
import Pagination from "./Components/Pagination";
import "./app.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allRecords, setAllRecords] = useState([]);
  const [editedRecords, setEditedRecords] = useState([]);
  const recordsPerPage = 10; // Reduced to 5 for better visibility in the example

  useEffect(() => {
    // Assuming your API endpoint is /api/records
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => {
        // Sort the records by the id field
        const sortedRecords = data.sort((a, b) => a.id - b.id);
        setAllRecords(sortedRecords);
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  // Combine original and edited records
  const originalRecordsWithoutDuplicates = allRecords.filter(
    (originalRecord) =>
      !editedRecords.some(
        (editedRecord) => editedRecord.id === originalRecord.id
      )
  );

  // Combine original records without duplicates and edited records
  const allRecordsCombined = [
    ...originalRecordsWithoutDuplicates,
    ...editedRecords,
  ];

  // Filter records based on the search term for both original and edited records
  const filteredRecords = allRecordsCombined.filter((record) => {
    const searchableProperties = Object.values(record).join(" ").toLowerCase();
    return searchableProperties.includes(searchTerm.toLowerCase());
  });

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredRecords
    .slice(startIndex, endIndex)
    .sort((a, b) => a.id - b.id);

  const handlePageChanged = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };
  const handleEdit = (record) => {
    setEditedRecords((prevEditedRecords) => [
      ...prevEditedRecords.filter((prevRecord) => prevRecord.id !== record.id),
      record,
    ]);
  };

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="search"
      />
      <Records
        data={currentRecords}
        editedRecords={editedRecords}
        onEdit={handleEdit}
      />
      <div className="pagination">
        <Pagination
          totalRecords={filteredRecords.length}
          recordsPerPage={recordsPerPage}
          onPageChanged={handlePageChanged}
        />
      </div>
    </div>
  );
};

export default App;
