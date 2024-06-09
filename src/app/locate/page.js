"use client"

import React, { useState } from 'react';
import { Input } from "../../components/shares/Input";
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Locate() {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleLocateProduct = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!productId) {
            setErrorMessage('Product ID is required.');
            return;
        }

        let query = supabase
            .from('product')
            .select('product_id, name')
            .eq('product_id', productId);

        if (productName) {
            query = query.ilike('name', `%${productName}%`);
        }

        const { data, error } = await query.single();

        if (error || !data) {
            setErrorMessage('Product not found. Please check the Product ID and Name.');
            console.log('Error:', error?.message || 'Product not found.');
        } else {
            router.push(`/result?productName=${encodeURIComponent(data.name)}&productId=${encodeURIComponent(data.product_id)}`);
        }
    };

    return (
        <div className="w-full flex min-h-screen flex-col pt-16 px-20">
            <div className="flex flex-row gap-10">
                <div>
                    <div className='text-brown-2 bold-48 mt-16'>Locate Product</div>
                    <div className="text-gray-2 medium-24 mt-2">
                        Find your preferred product <br /> through filling out this form.
                    </div>
                </div>
                <div className="grow bg-white border border-gray-200 rounded-3xl shadow mt-20 mb-20" style={{ width: 866, height: 691 }}>
                    <form onSubmit={handleLocateProduct}>
                        <div className="flex flex-col gap-8 px-12 pt-12">
                            <Input
                                label="Product ID*"
                                placeholder="Enter Product ID"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                required={true}
                            />
                            <Input
                                label="Product Name"
                                placeholder="Enter Product Name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required={false}
                            />
                        </div>
                        <div className="w-fit flex flex-row bg-brown-2 rounded-3xl px-12 py-3 mt-[280px] gap-8 mx-12">
                            <button type="submit" className="text-white medium-18 text-center">
                                Locate Product
                            </button>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-left mt-4 px-12">
                                {errorMessage}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
