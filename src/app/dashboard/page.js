'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../components/privates/table/Table'; // Adjust the path as necessary
import { supabase } from '../../../lib/supabaseClient';

export default function Dashboard() {
    const columns = [
        { label: 'Product ID', dataKey: 'productID', width: 'w-1/5', align: 'left' },
        { label: 'Item ID', dataKey: 'itemID', width: 'w-1/5', align: 'left' },
        { label: 'Rack ID', dataKey: 'rackID', width: 'w-1/5', align: 'left' },
        { label: 'Expired Date', dataKey: 'expiredDate', width: 'w-1/5', align: 'center' },
        { label: '', dataKey: 'aksi', width: 'w-1/5', align: 'center' },
    ];

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data: fetchedData, error } = await supabase
                .from('item')
                .select('*');
            
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                // Map fetched data to match table's expected structure
                console.log('data', data);
                const formattedData = fetchedData.map(item => ({
                    productID: item.product_id,
                    itemID: item.item_id,
                    rackID: item.rack_id,
                    expiredDate: item.exp_date,
                    aksi: <div> {/* Actions here */} </div>
                }));

                setData(formattedData);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="w-full flex min-h-screen flex-col pt-16 px-20">
            <h1 className='text-brown-2 bold-48 mt-16 mb-4'>Dashboard</h1>
            <Table columns={columns} data={data} message='No data available' />
        </div>
    );
}
