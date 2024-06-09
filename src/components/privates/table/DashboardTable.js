"use client";
import React, { useState } from "react";
import { Modal } from "../../shares/modal/index";
import Image from "next/image";
import edit from "@/public/icons/edit.svg";
import trash from "@/public/icons/trash.svg";
import { supabase } from "../../../../lib/supabaseClient";
import { toastError, toastSuccess } from "../../shares/Toast";

const DashboardTable = ({ columns, data, setData, message, onRowClick }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEdit = (row) => {
    setCurrentRow(row);
    setEditedData(row);
    setEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Update the data in Supabase
    const { error } = await supabase
      .from('product')
      .update({
        product_id: editedData.productID,
        name: editedData.productName,
        brand: editedData.brand,
        category: editedData.category
      })
      .eq('product_id', currentRow.productID);

    if (error) {
      console.error('Error updating data:', error);
      toastError('Error edit product!');
      return;
    } else {
      toastSuccess('Edit product successful!');
    }

    // Update the local state
    const updatedData = data.map((row) =>
      row.productID === currentRow.productID ? editedData : row
    );
    setData(updatedData);
    setEditModal(false);
  };

  if (!columns || !data || data.length === 0) {
    return (
      <div className="px-8">
        <i>{message}</i>
      </div>
    );
  }

  return (
    <>
      {editModal && (
        <Modal open={editModal} setOpen={setEditModal}>
          <div className="flex flex-col justify-between gap-5">
            <div>
              <h2 className="mb-4 text-xl font-bold">Edit</h2>
              <label className="block mb-2">Product ID</label>
              <input
                type="text"
                name="productID"
                value={editedData.productID}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <label className="block mt-4 mb-2">Product Name</label>
              <input
                type="text"
                name="productName"
                value={editedData.productName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <label className="block mt-4 mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={editedData.brand}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <label className="block mt-4 mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={editedData.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              className="w-full rounded bg-brown-2 px-4 py-2 text-white"
              onClick={handleSubmit}
            >
              Save Edit
            </button>
          </div>
        </Modal>
      )}
      {deleteModal && (
        <Modal open={deleteModal} setOpen={setDeleteModal}>
          <div className="flex flex-col justify-between gap-5">
            <div>
              <h2 className="mb-4 text-xl font-bold">
                Are you sure you want to delete?
              </h2>
            </div>
            <div className="flex flex-row gap-4">
              <button
                className="w-full rounded bg-red-500 px-4 py-2 text-white"
                onClick={() => setDeleteModal(false)}
              >
                Yes
              </button>
              <button
                className="w-full rounded bg-brown-2 px-4 py-2 text-white"
                onClick={() => setDeleteModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="flex justify-center relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bold-16 text-gray-700 uppercase bg-white text-center border-b">
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
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-white"
                } cursor-pointer`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-2 ${
                      column.align === "center" ? "text-center" : "text-left"
                    } truncate`}
                  >
                    {column.dataKey === "aksi" && (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-1 rounded-md bg-brown-3"
                          onClick={(e) => {e.stopPropagation(); handleEdit(row)}}
                        >
                          <Image src={edit} alt="edit" />
                        </button>
                        <button
                          className="p-1 rounded-md bg-danger"
                          onClick={(e) => {e.stopPropagation(); setDeleteModal(true)}}
                        >
                          <Image src={trash} alt="delete" />
                        </button>
                      </div>
                    )}
                    {column.dataKey !== "aksi" && row[column.dataKey]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardTable;
