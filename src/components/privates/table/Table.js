"use client";
import React, { useState } from "react";
import { Modal } from "../../shares/Modal";
import Image from "next/image";
import edit from "@/public/icons/edit.svg";
import trash from "@/public/icons/trash.svg";

const Table = ({ columns, data, message }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

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
            </div>
            <button
              className="w-full rounded bg-black px-4 py-2 text-white"
              onClick={() => setEditModal(false)}
            >
              Submit
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
                className="w-full rounded bg-black px-4 py-2 text-white"
                onClick={() => setDeleteModal(false)}
              >
                Yes
              </button>
              <button
                className="w-full rounded bg-black px-4 py-2 text-white"
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
                } `}
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
                          onClick={() => setEditModal(true)}
                        >
                          <Image src={edit} alt="edit" />
                        </button>
                        <button
                          className="p-1 rounded-md bg-danger"
                          onClick={() => setDeleteModal(true)}
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

export default Table;