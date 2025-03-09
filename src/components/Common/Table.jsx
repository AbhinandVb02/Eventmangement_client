import React, { useState } from "react";
import { Pencil, Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react";

const Table = ({
  header,
  data,
  onEdit,
  onView,
  onDelete,
  itemsPerPage = 10,
  totalPageCount,
  totalCount,
  currentPage,
  setCurrentPage,
  view,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No data available</div>
    );
  }

  const totalPages = totalPageCount;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data || [];

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {header.map((headers, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider"
                >
                  {headers.label}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems?.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {header.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 text-sm text-gray-500"
                  >
                    {item[column.value]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {/* <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 cursor-pointer"
                      aria-label="Edit"
                    >
                      <Pencil size={18} />
                    </button> */}
                    {/* {view && (
                      <button
                        onClick={() => onView(item)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 cursor-pointer"
                        aria-label="Edit"
                      >
                        <Eye size={18} />
                      </button>
                    )} */}

                    <button
                      onClick={() => onDelete(item._id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 cursor-pointer"
                      aria-label="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 border-t-0 rounded-b-md">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, data.length)}
                </span>{" "}
                of <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft size={18} />
                </button>

                {getPageNumbers().map((number) => (
                  <button
                    key={number}
                    onClick={() => goToPage(number)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                      currentPage === number
                        ? "bg-blue-50 border-blue-500 text-blue-600 z-10"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight size={18} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
