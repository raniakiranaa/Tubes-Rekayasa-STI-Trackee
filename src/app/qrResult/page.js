"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import QRCode from 'qrcode.react';

export default function QRResult() {
    const searchParams = useSearchParams();
    const jsonData = searchParams.get('jsonData');
    const [parsedData, setParsedData] = useState(null);

    useEffect(() => {
        if (jsonData) {
            try {
                const data = JSON.parse(decodeURIComponent(jsonData));
                setParsedData(data);
            } catch (error) {
                console.error('Failed to parse jsonData:', error);
            }
        }
    }, [jsonData]);

    return (
        <div className="w-full flex min-h-screen flex-col pt-16 px-20">
            <div className="flex flex-row gap-10">
                <div>
                    <div className='text-brown-2 bold-48 mt-16'>QR Code Result</div>
                    <div className="text-gray-2 medium-24 mt-2">Here is your generated QR code</div>
                </div>
                <div className="grow bg-white border border-gray-200 rounded-3xl shadow mt-20 mb-20" style={{ width: 866, height: 600 }}>
                    {parsedData && (
                        <div className="flex flex-row items-center justify-center h-full gap-8">
                            <QRCode value={JSON.stringify(parsedData)} size={450} />
                            <div className="regular-20 text-brown-2">
                                <p><strong>Product ID:</strong> {parsedData.product_id}</p>
                                <p><strong>Name:</strong> {parsedData.name}</p>
                                <p><strong>Brand:</strong> {parsedData.brand}</p>
                                <p><strong>Category:</strong> {parsedData.category}</p>
                                <p><strong>Rack ID:</strong> {parsedData.rack_id}</p>
                                <p><strong>Expiry Date:</strong> {parsedData.exp_date}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
