// const fs = require('fs');
// const path = require('path');

// // Đọc file JSON đầu vào
// const inputFilePath = path.join(__dirname, 'output.json');
// const outputFilePath = path.join(__dirname, 'updated_output.json');

// // Đọc nội dung file JSON
// fs.readFile(inputFilePath, 'utf-8', (err, data) => {
//   if (err) {
//     console.error('Có lỗi khi đọc file:', err);
//     return;
//   }

//   try {
//     // Parse dữ liệu JSON từ file đầu vào
//     const jsonData = JSON.parse(data);

//     // Duyệt qua từng dòng và xử lý trường 'banks'
//     jsonData.forEach((item) => {
//       if (item.banks && Array.isArray(item.banks)) {
//         // Duyệt qua từng phần tử trong mảng 'banks' và parse chuỗi thành JSON
//         item.banks = item.banks.map(bankString => {
//           try {
//             return JSON.parse(bankString);  // Parse chuỗi thành JSON
//           } catch (error) {
//             console.error('Lỗi khi parse chuỗi JSON trong banks:', error);
//             return null;  // Nếu có lỗi thì trả về null hoặc bạn có thể xử lý khác
//           }
//         }).filter(bank => bank !== null);  // Loại bỏ các phần tử null nếu có lỗi trong việc parse
//       }
//     });

//     // Lưu kết quả vào file mới
//     fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
//       if (err) {
//         console.error('Có lỗi khi ghi file:', err);
//       } else {
//         console.log('Đã lưu kết quả vào file updated_output.json');
//       }
//     });
//   } catch (parseError) {
//     console.error('Lỗi khi parse dữ liệu JSON:', parseError);
//   }
// });

const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');  // Thư viện json2csv

// Đọc file JSON đầu vào
const inputFilePath = path.join(__dirname, 'updated_output.json');
const outputFilePath = path.join(__dirname, 'final.csv');

// Đọc nội dung file JSON
fs.readFile(inputFilePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Có lỗi khi đọc file JSON:', err);
    return;
  }

  try {
    // Parse dữ liệu JSON từ file đầu vào
    const jsonData = JSON.parse(data);

    // Duyệt qua mỗi dòng trong jsonData và làm phẳng cấu trúc `banks` nếu có
    const flatData = jsonData.map(item => {
      // Nếu có trường `banks`, chúng ta sẽ "phẳng hóa" nó thành các trường con
      if (item.banks && Array.isArray(item.banks)) {
        item.banks.forEach((bank, index) => {
          // Gộp thông tin từ `bank` vào đối tượng chính
          Object.keys(bank).forEach(key => {
            item[`bank_${index + 1}_${key}`] = bank[key];
          });
        });
      }
      return item;
    });

    // Chuyển đổi dữ liệu JSON thành CSV
    const csv = parse(flatData);

    // Ghi kết quả vào file CSV
    fs.writeFile(outputFilePath, csv, 'utf-8', (err) => {
      if (err) {
        console.error('Có lỗi khi ghi file CSV:', err);
      } else {
        console.log('Đã lưu kết quả vào file output.csv');
      }
    });

  } catch (parseError) {
    console.error('Lỗi khi parse dữ liệu JSON:', parseError);
  }
});
