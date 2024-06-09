"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Table from "@/src/components/privates/table/Table";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from 'next/navigation';

export default function DetailProduct() {
    const columns = [
        { label: 'Product ID', dataKey: 'productID', width: 'w-1/5', align: 'left' },
        { label: 'Item ID', dataKey: 'itemID', width: 'w-1/5', align: 'left' },
        { label: 'Rack ID', dataKey: 'rackID', width: 'w-1/5', align: 'left' },
        { label: 'Expired Date', dataKey: 'expiredDate', width: 'w-1/5', align: 'center' },
        { label: '', dataKey: 'aksi', width: 'w-1/5', align: 'center' },
    ];

    const [data, setData] = useState([]);
    const [productName, setProductName] = useState('');
    const router = useRouter();
    const params = useParams();
    const productId = params.product_id;

    useEffect(() => {
        async function fetchData() {
            if (!productId) return;

            const { data: productData, error: productError } = await supabase
                .from('product')
                .select('*')
                .eq('product_id', productId)
                .single();

            if (productError) {
                console.error('Error fetching product:', productError);
                return;
            }

            setProductName(productData.product_name);

            const { data: fetchedData, error } = await supabase
                .from('item')
                .select('*')
                .eq('product_id', productId);

            if (error) {
                console.error('Error fetching data:', error);
                return;
            }

            const formattedData = fetchedData.map(item => ({
                productID: item.product_id,
                itemID: item.item_id,
                rackID: item.rack_id,
                expiredDate: item.exp_date,
            }));

            setData(formattedData);
        }

        fetchData();
    }, [productId]);

    return (
        <div className="w-full flex min-h-screen flex-col pt-16 px-20">
            <h1 className='text-brown-2 bold-48 mt-16 mb-4'>{productName}</h1>
            <Table columns={columns} data={data} setData={setData} message='No data available' />
        </div>
    );
}
