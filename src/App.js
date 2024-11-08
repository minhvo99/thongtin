import { useState } from "react";
import { FaBuilding, FaUniversity, FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import data from './data';

const App = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dummyCustomerData = data;

  const handleRowClick = (customerId) => {
    setExpandedRow(expandedRow === customerId ? null : customerId);
  };

  const filteredCustomerData = dummyCustomerData.filter(customer =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.tax.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="man-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 width-full">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Bảng thông tin</h1>
        
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

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã KH</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên công ty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thông tin liên hệ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đia chỉ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xem TKN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomerData.map((customer) => (
                <>
                  <tr 
                    key={customer.customerId}
                    className={`hover:bg-gray-50 ${expandedRow === customer.customerId ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm text-gray-500">{customer.customerId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium text-gray-900">{customer.customerName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{customer.contactName}</div>
                      <div className="text-sm text-gray-500">{customer.contactPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{customer.address}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
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
                          <h3 className="text-lg font-medium text-gray-900">Banking Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {customer.banks.map((bank) => (
                              <div
                                key={bank.bankId}
                                className="bg-white rounded-md p-4 shadow-sm"
                              >
                                <div className="flex items-center mb-2">
                                  <FaUniversity className="text-blue-600 mr-2" />
                                  <span className="font-medium">{bank.bankName}</span>
                                </div>
                                <div className="text-sm text-gray-600 space-y-1">
                                  <p><span className="font-medium">Account:</span> {bank.accountNumber}</p>
                                  <p><span className="font-medium">Beneficiary:</span> {bank.beneficiary}</p>
                                  <p><span className="font-medium">Tên ngân hàng:</span> {bank?.CustomerBankName?.name}</p>
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

          {filteredCustomerData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No customer data found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;