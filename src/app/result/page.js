"use client"

import React, { useEffect, useState, Suspense } from 'react';
import { Data } from '@/src/components/privates/result';
import { supabase } from '../../../lib/supabaseClient';
import { useSearchParams } from 'next/navigation';

function ResultComponent() {
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');
    const productName = searchParams.get('productName');
    const [productDetails, setProductDetails] = useState({
        itemId: '',
        productName: '',
        shelfNumber: '',
        rowNumber: '',
        columnNumber: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (productId && productName) {
            getItemLocation();
        } else {
            setErrorMessage('Product details are missing.');
        }
    }, [productId, productName]);

    const getItemLocation = async () => {
        try {
            const productCategory = await getProductCategory(productId);
            const rackId = await getRackId(productCategory);
            const itemId = await getItemId(productId);

            const { data, error } = await supabase
                .from('rack_loc')
                .select('rack_id, loc_x, loc_y, item_id')
                .eq('rack_id', rackId)
                .eq('item_id', itemId)
                .limit(1)
                .single();

            if (error || !data) {
                setErrorMessage('Product location not found. Please check the Product ID and Name.');
                console.log('Error:', error?.message || 'Product location not found.');
            } else {
                setProductDetails({
                    itemId: data.item_id,
                    productName: productName,
                    shelfNumber: data.rack_id,
                    rowNumber: data.loc_x,
                    columnNumber: data.loc_y,
                });
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            console.log('Error:', error?.message || 'An error occurred.');
        }
    };

    const getProductCategory = async (productId) => {
        const { data, error } = await supabase
            .from('product')
            .select('category')
            .eq('product_id', productId)
            .single();

        if (error || !data) {
            throw new Error('Product category not found.');
        }
        return data.category;
    };

    const getRackId = async (category) => {
        const { data, error } = await supabase
            .from('rack')
            .select('rack_id')
            .eq('category', category)
            .single();

        if (error || !data) {
            throw new Error('Rack ID not found.');
        }
        return data.rack_id;
    };

    const getItemId = async (productId) => {
        const { data, error } = await supabase
            .from('item')
            .select('item_id')
            .eq('product_id', productId)
            .order('exp_date', { ascending: true })
            .limit(1)
            .single();

        if (error || !data) {
            throw new Error('Item ID not found.');
        }
        return data.item_id;
    };

    return (
        <div className="w-full flex min-h-screen flex-col pt-16 px-20">
            <div className="flex flex-row gap-10">
                <div>
                    <div className='text-brown-2 bold-48 mt-16'>Locate Result</div>
                    <div className="text-gray-2 medium-24 mt-2">Take a glance where your product is located.</div>
                </div>
                <div className="grow bg-white border border-gray-200 rounded-3xl shadow mt-20 mb-20" style={{ width: 866, height: 691 }}>
                    {errorMessage ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="text-brown-2 text-center bold-36 mt-4 px-12">
                                {errorMessage}
                            </div>
                        </div>
                    ) : (
                        <Data
                            id={productDetails.itemId}
                            name={productDetails.productName}
                            shelf={productDetails.shelfNumber}
                            row={productDetails.rowNumber}
                            column={productDetails.columnNumber}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Result() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultComponent />
        </Suspense>
    );
}
