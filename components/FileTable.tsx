import React, { useEffect } from 'react'
import {Table} from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export const FileTable = () => {
    const csvData = useSelector((state: RootState) => state.csv)
    const [columns, setColumns] = React.useState<any[]>([]);
    const [filteredData,setFilteredData] = React.useState<any[]>([]);

    const header = ['booking_id', 'flight_id', 'flight_number', 'airline_name', 'departure_airport',
    'arrival_airport', 'departure_time', 'arrival_time', 'passenger_id',
    'passenger_first_name', 'passenger_last_name', 'passenger_email',
    'passenger_phone', 'booking_date', 'total_price', 'payment_status',
    'baggage_weight', 'baggage_type', 'booking_status', 'airline_code',
    'duration', 'country', 'city']
    
    useEffect(() =>{
        setColumns(header.map((col) => ({ title: col, dataIndex: col }))); // Set table columns
    },[])



    return (
    <div className='p-10'>

        <input />
        {/* <Table></Table> */}
        <Table columns={columns} dataSource={csvData.data} scroll={{x:1000}}/>
    </div>
  )
}
