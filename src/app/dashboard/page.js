import React from 'react';
import Table from '../../components/privates/table/Table'; // Adjust the path as necessary

export default function Dashboard() {
    const columns = [
        { label: 'Product ID', dataKey: 'productID', width: 'w-1/5', align: 'left' },
        { label: 'Item ID', dataKey: 'itemID', width: 'w-1/5', align: 'left' },
        { label: 'Rack ID', dataKey: 'rackID', width: 'w-1/5', align: 'left' },
        { label: 'Expired Date', dataKey: 'expiredDate', width: 'w-1/5', align: 'center' },
        { label: 'Actions', dataKey: 'aksi', width: 'w-1/5', align: 'center' },
    ];

    const data = [
        { productID: '#PA0001', itemID: '#IA0001', rackID: '#RA0001', expiredDate: '08 - 09 - 2025', aksi: <div> {/* Actions here */} </div> },
        { productID: '#PA0001', itemID: '#IA0001', rackID: '#RA0001', expiredDate: '08 - 09 - 2025', aksi: <div> {/* Actions here */} </div> },
        { productID: '#PA0001', itemID: '#IA0001', rackID: '#RA0001', expiredDate: '08 - 09 - 2025', aksi: <div> {/* Actions here */} </div> },
        // Add more rows as needed
    ];

    return (
        <div className="w-full flex min-h-screen flex-col pt-16 px-20">
            <h1 className='text-brown-2 bold-48 mt-16 mb-4'>Dashboard</h1>
            <Table columns={columns} data={data} message='No data available' />
        </div>
    );
}
