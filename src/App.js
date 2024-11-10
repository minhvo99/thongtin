import React, { useState, useMemo } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaCopy } from 'react-icons/fa';
import data from './data';
import Pagination from './Pagination';
import Swal from 'sweetalert2';

let PageSize = 50;
let dataSource;

const App = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const dummyCustomerData = data;

  const handleRowClick = (customerId) => {
    setExpandedRow(expandedRow === customerId ? null : customerId);
  };

  const handleCopyClick = async (text) => {
    try {
      await window.navigator.clipboard.writeText(text);
      Swal.fire({
        icon: 'success',
          title: 'Copied!',
          text: `Sao chép thành công!!!`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
      });
    } catch (error) {
      return;
    }
  };

  const filteredCustomerData = dummyCustomerData.filter(
    (customer) =>
      customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.tax.toLowerCase().includes(searchTerm.toLowerCase())
  );

  searchTerm
    ? (dataSource = filteredCustomerData)
    : (dataSource = currentTableData);

  return (
    <div className="man-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 width-full">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Bảng thông tin
        </h1>

        <div className="mb-6 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="mb-6 relative">
          {searchTerm ? (
            <div className="text-sm text-gray-500">
              Tìm thấy {dataSource.length} trên tổng số{' '}
              {dummyCustomerData.length} hàng
            </div>
          ) : (
            <div className="text-sm text-gray-500"></div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã KH
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đia chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Xem TKNN
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataSource.map((customer) => (
                <>
                  <tr
                    key={customer.customerId}
                    className={`hover:bg-gray-50 ${
                      expandedRow === customer.customerId ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm text-gray-500">
                            {customer.customerId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium text-gray-900">
                            {customer.customerName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {customer.contactName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {customer.contactPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {customer.address}
                      </div>
                      <div className="text-sm text-gray-500">
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleRowClick(customer.customerId)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {expandedRow === customer.customerId ? (
                          <FaChevronUp className="text-xl" />
                        ) : (
                          <FaChevronDown className="text-xl" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedRow === customer.customerId && (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 bg-gray-50">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            Thông tin ngân hàng
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {customer?.banks.map((bank) => (
                              <div
                                key={bank.bankId}
                                className="bg-white rounded-md p-4 shadow-sm"
                              >
                                <div className="text-sm text-gray-600 space-y-1">
                                  <p className="flex items-center">
                                    <span className="font-medium">
                                      Số tài khoản:
                                    </span>{' '}
                                    {bank.accountNumber}
                                    {bank.accountNumber && (
                                      <FaCopy
                                        onClick={() =>
                                          handleCopyClick(bank.accountNumber)
                                        }
                                        className="pl-2 text-xl"
                                      />
                                    )}
                                  </p>
                                  <p className="flex gap-2 items-center">
                                    <span className="font-medium">
                                      Người thụ hưởng:
                                    </span>{' '}
                                    {bank.beneficiary}
                                    {bank.beneficiary && (
                                      <FaCopy
                                        onClick={() =>
                                          handleCopyClick(bank.beneficiary)
                                        }
                                        className="pl-2 text-xl"
                                      />
                                    )}
                                  </p>
                                  <p className="flex items-center">
                                    <span className="font-medium">
                                      Tên ngân hàng:
                                    </span>{' '}
                                    {bank?.CustomerBankName?.name}
                                    {bank?.CustomerBankName?.name && (
                                      <FaCopy
                                        onClick={() =>
                                          handleCopyClick(bank?.CustomerBankName?.name)
                                        }
                                        className="pl-2 text-xl"
                                      />
                                    )}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />

          {dataSource.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không tìm thấy thông tin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
