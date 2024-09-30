import React, { useEffect } from 'react'
import {Table, Input, Select} from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { header } from '@/data/headerData'
import { FlightBookingInterface } from '@/types/CsvDataInterface'
const {Option} = Select;

interface ColumnInterface{
    title: string
    dataIndex: string
}

export const FileTable = () => {
    const csvData = useSelector((state: RootState) => state.csv)
    const [columns, setColumns] = React.useState<ColumnInterface[]>([]);
    const [filteredData, setFilteredData] = React.useState<FlightBookingInterface[] >([]);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [selectedColumn, setSelectedColumn] = React.useState<string>(''); // Column filter
    console.log(csvData);

    useEffect(() =>{
        setColumns(header.map((col) => ({ title: col, dataIndex: col }))); 
        // Set table columns
        setFilteredData(csvData.data); 
    },[csvData.data])

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        
        if (selectedColumn) {
          // Filter by specific column
          filtered = csvData.data.filter((row) =>
            String(row[`selectedColumn`]).toLowerCase().includes(value.toLowerCase())
          );
        } else {
          // If no column is selected, filter by all columns (general search)
          filtered = csvData.data.filter((row) =>
            Object.values(row).some((cell) =>
              String(cell).toLowerCase().includes(value.toLowerCase())
            )
          );
        }
        setFilteredData(filtered);
      };

    return (
    <div className='p-10 overflow-auto'>
        <Select
        placeholder="Filter by column"
        value={selectedColumn}
        onChange={(value) => {
            setSelectedColumn(value)
            setSearchTerm('')
            setFilteredData(csvData.data); 
        }}
        className="mr-4 mb-2 border-2 border-blue-500 rounded-md"
        style={{ width: 200 }}
      >
        {/* Add an option for each column */}
        {header.map((col) => (
          <Option key={col} value={col}>
            {col.replace(/_/g, ' ')} {/* Replace underscores with spaces for readability */}
          </Option>
        ))}
        <Option value="">All columns</Option> {/* Option to search in all columns */}
      </Select>
        <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-4 border-2 border-blue-500 rounded-md"
        style={{ width: 200 }}
      />
        <Table columns={columns} className='border-2 border-blue-500 rounded-md'
        dataSource={filteredData} scroll={{x:1000}}/>
    </div>
  )
}