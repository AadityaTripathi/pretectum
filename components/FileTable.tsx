import React, { useEffect } from 'react';
import { Table, Input, Select, Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { header } from '@/data/headerData';
import { FlightBookingInterface } from '@/types/CsvDataInterface';

const { Option } = Select;

interface ColumnInterface {
  title: string;
  dataIndex: string;
}

export const FileTable = () => {
  const csvData = useSelector((state: RootState) => state.csv);
  const [columns, setColumns] = React.useState<ColumnInterface[]>([]);
  const [filteredData, setFilteredData] = React.useState<FlightBookingInterface[]>([]);
  const [searchTerms, setSearchTerms] = React.useState<{ [key: string]: string }>({});
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>([]); // Store selected columns
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc'); // Track the sort order

  useEffect(() => {
    // Set table columns based on the CSV header
    setColumns(header.map((col) => ({ title: col, dataIndex: col })));
    // Initialize filtered data with the complete dataset
    setFilteredData(csvData.data);
  }, [csvData.data]);

  const handleSearch = (value: string, column: string) => {
    // Update search term for the specific column
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [column]: value,
    }));
  };

  const handleAddColumn = (value: string) => {
    // Only add the column if it hasn't already been selected
    if (!selectedColumns.includes(value)) {
      setSelectedColumns((prevColumns) => [...prevColumns, value]);
    }
  };

  const handleRemoveColumn = (column: string) => {
    // Remove the column from the selectedColumns array and delete its search term
    setSelectedColumns((prevColumns) => prevColumns.filter((col) => col !== column));
    setSearchTerms((prevTerms) => {
      const newTerms = { ...prevTerms };
      delete newTerms[column];
      return newTerms;
    });
  };

  // Apply filters and sorting logic
  useEffect(() => {
    let filtered = [...csvData.data]; // Create a shallow copy of the data

    // Apply filters first
    Object.keys(searchTerms).forEach((column) => {
      const searchTerm = searchTerms[column];
      if (searchTerm) {
        filtered = filtered.filter((row) =>
          String(row[column]).toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });

    // Apply sorting on filtered data
    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = String(a[sortColumn]);
        const bValue = String(b[sortColumn]);

        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    setFilteredData(filtered);
  }, [searchTerms, sortColumn, sortOrder, csvData.data]);

  return (
    <div className="p-10 overflow-auto">
      {/* Filter Section */}
      {selectedColumns.map((column, index) => (
        <div key={column} className="mb-4  items-center space-x-4">
          {/* Input for searching within the selected column */}
          <Input
            placeholder={`Search in ${column.replace(/_/g, ' ')}`}
            value={searchTerms[column] || ''}
            onChange={(e) => handleSearch(e.target.value, column)}
            className="mb-2 border-2 border-blue-500 rounded-md"
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            onClick={() => handleRemoveColumn(column)} // Remove filter on click
          >
            Remove
          </Button>
          {index === selectedColumns.length - 1 && (
            <Select
              placeholder="Select another column"
              onChange={handleAddColumn}
              className="border-2 border-blue-500 rounded-md"
              style={{ width: 300 }}
            >
              {header
                .filter((col) => !selectedColumns.includes(col)) // Prevent re-selecting already selected columns
                .map((col) => (
                  <Option key={col} value={col}>
                    {col.replace(/_/g, ' ')}
                  </Option>
                ))}
            </Select>
          )}
        </div>
      ))}

      {/* Initially show a dropdown for selecting the first column */}
      {selectedColumns.length === 0 && (
        <Select
          placeholder="Select a column to filter"
          onChange={handleAddColumn}
          className="mb-4 border-2 border-blue-500 rounded-md"
          style={{ width: 300 }}
        >
          {header.map((col) => (
            <Option key={col} value={col}>
              {col.replace(/_/g, ' ')}
            </Option>
          ))}
        </Select>
      )}

      {/* Sorting Section */}
      <div className="mb-4 flex space-x-4">
        <Select
          placeholder="Sort by column"
          onChange={(value) => setSortColumn(value)}
          className="border-2 border-blue-500 rounded-md"
          style={{ width: 200 }}
        >
          {header.map((col) => (
            <Option key={col} value={col}>
              {col.replace(/_/g, ' ')}
            </Option>
          ))}
        </Select>
        <Select
          value={sortOrder}
          onChange={(value) => setSortOrder(value)}
          className="border-2 border-blue-500 rounded-md"
          style={{ width: 200 }}
        >
          <Option value="asc">Ascending</Option>
          <Option value="desc">Descending</Option>
        </Select>
      </div>

      {/* Table Section */}
      <Table
        columns={columns}
        className="border-2 border-blue-500 rounded-md"
        dataSource={filteredData}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};
