"use client"
import React from 'react';
import { Upload, Button, message} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import { setCsvData } from '../store/csvSlice';
import { RootState } from '../store/store'; 
import { FileTable } from './FileTable';

const { Dragger } = Upload;

const CsvUpload: React.FC = () => {
  const dispatch = useDispatch();
  const csvData = useSelector((state: RootState) => state.csv.data); // Access the CSV data from Redux
  // Function to handle CSV parsing
  const handleFileUpload = (file: File) => {
    Papa.parse(file, {
      complete: (result: { data: string[][]; }) => {
        const [...rows] = result.data as string[][]; // Extract header and rows
        dispatch(setCsvData(rows)); // Dispatch the parsed rows to Redux
        message.success(`${file.name} file uploaded successfully.`);
      },
      header: true, // Parse CSV with header
    });
  };

  const props = {
    beforeUpload: (file: File) => {
      handleFileUpload(file);
      return false; // Prevent default upload behavior
    },
    showUploadList: false, // Hide upload list
  };

  return (
    <div className="p-8">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload. Only CSV files allowed.</p>
      </Dragger>

      {csvData.length > 0 && (
        <FileTable/>
      )}
    </div>
  );
};

export default CsvUpload;
