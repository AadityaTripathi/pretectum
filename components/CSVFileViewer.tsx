"use client";
import FileUpload from "@/components/FileUpload";
import 'antd/dist/reset.css'; 
import { Provider } from 'react-redux';
import store from '../store/store';

import React from 'react'

export const CSVFileViewer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
              CSV File Viewer
            </h1>
            <p className="text-lg text-gray-600">
              Upload and analyze your CSV files with ease
            </p>
          </header>
        <Provider store={store}>
            <FileUpload/>
        </Provider>
    </div>
  )
}
