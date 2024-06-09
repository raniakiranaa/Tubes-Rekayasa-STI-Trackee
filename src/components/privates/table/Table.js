import React from 'react';

const Table = ({ columns, data, message }) => {
    if (!columns || !data || data.length === 0) {
        return (
            <div className='px-8'>
                <i>{message}</i>
            </div>
        )
    }

    return (
        <div className="flex justify-center relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-white border-b text-center font-bold">
                    <tr>
                        {columns.map((column, index) => (
                            <th 
                            key={index}
                            scope="col"
                            className={`px-4 py-3 ${column.width}`}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-white'}`}>
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`px-4 py-2 ${column.align === 'center' ? 'text-center' : 'text-left'} truncate`}
                                >
                                    {column.dataKey === 'aksi' ? row.aksi : row[column.dataKey]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
