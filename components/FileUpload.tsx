"use client"
import React from 'react';
import { Upload, message} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import { setCsvData } from '../store/csvSlice';
import { RootState } from '../store/store'; 
import { FileTable } from './FileTable';
import { FlightBookingInterface } from '@/types/CsvDataInterface';

const { Dragger } = Upload;

const CsvUpload: React.FC = () => {
  const dispatch = useDispatch();
  const csvData = useSelector((state: RootState) => state.csv.data); 
  
  const handleFileUpload = (file: File) => {
    Papa.parse(file, {
      complete: (result: { data: FlightBookingInterface[]; }) => {
        const [...rows] = result.data as FlightBookingInterface[]; 
        dispatch(setCsvData(rows)); 
        message.success(`${file.name} file uploaded successfully.`);
      },
      header: true, 
    });
  };

  const props = {
    beforeUpload: (file: File) => {
      handleFileUpload(file);
      return false; 
    },
    showUploadList: false, 
  };

  return (
    <div className="p-10">
      <div className='w flex  justify-center'>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload. Only CSV files allowed.</p>
        </Dragger>
      </div>

      {csvData.length > 0 && (
        <FileTable/>
      )}
    </div>
  );
};

export default CsvUpload;
