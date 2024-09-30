"use client";
import FileUpload from "@/components/FileUpload";
import 'antd/dist/reset.css'; // Ant Design CSS
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/store';
export default function Home() {
  return (
    <Provider store={store}>
    <div>
      <FileUpload/>
    </div>  
    </Provider>
  );
}
