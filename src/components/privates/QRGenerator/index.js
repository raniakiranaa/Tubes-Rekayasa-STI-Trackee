import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ jsonData }) => {
    const jsonString = JSON.stringify(jsonData);

    return (
        <div>
            <QRCode value={jsonString} />
        </div>
    );
};

export default QRCodeGenerator;
