"use client";
import FileUpload from "@/components/FileUpload";
import 'antd/dist/reset.css'; // Ant Design CSS
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/store';

import React from 'react'

export const CSVFileViewer = () => {
  return (
    <div>
      <Provider store={store}>
            <h1 className="text-3xl font-bold  text-blue-500 
            flex justify-center pt-10">CSV File Viewer</h1>
            <div>
                <FileUpload/>
            </div>  
        </Provider>
    </div>
  )
}
