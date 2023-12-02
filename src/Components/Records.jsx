// Records.jsx
import React, { useState } from "react";
import RecordItem from "./RecordItem";
import "./Records.css";

const Records = ({ data, onEdit }) => {
  const [deletedRecordIds, setDeletedRecordIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelect = (recordId) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(recordId)
        ? prevIds.filter((id) => id !== recordId)
        : [...prevIds, recordId]
    );
  };

  const handleSelectAll = () => {
    const allIds = data.map((record) => record.id);
    setSelectedIds((prevIds) =>
      prevIds.length === allIds.length ? [] : allIds
    );
  };

  const onDelete = (recordId) => {
    setDeletedRecordIds((prevIds) => [...prevIds, recordId]);
  };

  const handleDeleteSelected = () => {
    // Get the IDs of selected records from the editedRecords and non-edited data
    const selectedIdsToDelete = selectedIds.filter(
      (id) => !deletedRecordIds.includes(id)
    );

    // Handle deletion for selected records
    selectedIdsToDelete.forEach((id) => {
      if (deletedRecordIds.includes(id)) {
        // If the record is marked for temporary deletion, remove it from the deletedRecordIds
        setDeletedRecordIds((prevIds) =>
          prevIds.filter((deletedId) => deletedId !== id)
        );
      } else {
        // If the record is not marked for temporary deletion, mark it for temporary deletion
        onDelete(id);
      }
    });
    setSelectedIds([]);
  };

  const visibleRecords = data.filter(
    (record) => !deletedRecordIds.includes(record.id)
  );

  return (
    <div className="records-container">
      <div className="records-card">
        <table summary="User Records">
          <thead>
            <tr>
              <th scope="col" className="select-all-col">
                <input
                  type="checkbox"
                  id="selectAllCheckbox"
                  onChange={handleSelectAll}
                />
                <label htmlFor="selectAllCheckbox" className="select-all">
                  Select All
                </label>
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRecords.map((record) => (
              <RecordItem
                key={record.id}
                record={record}
                isSelected={selectedIds.includes(record.id)}
                onSelect={handleSelect}
                onSave={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">
                <button
                  onClick={handleDeleteSelected}
                  className="delete-selected"
                  aria-label="Delete Selected Records"
                >
                  Delete Selected
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Records;
