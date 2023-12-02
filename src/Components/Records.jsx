// Records.jsx
import React, { useState } from "react";
import RecordItem from "./RecordItem";
import "./Records.css";

const Records = ({ data, editedRecords, onEdit }) => {
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

  const handleSave = (editedValues) => {
    onEdit(editedValues);
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
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={handleSelectAll} />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRecords.map((record) => (
              <RecordItem
                key={record.id}
                record={
                  editedRecords.find(
                    (editedRecord) => editedRecord.id === record.id
                  ) || record
                }
                isSelected={selectedIds.includes(record.id)}
                onSelect={handleSelect}
                onEdit={onEdit}
                onSave={handleSave}
                onDelete={onDelete}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button
                  onClick={handleDeleteSelected}
                  className="delete-selected"
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
