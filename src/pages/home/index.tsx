// import React, { useEffect, useState } from 'react';
// import { inject, observer } from 'mobx-react';

// import HeaderNav from '../../components/headerNav';
// import StreamGrid from '../../components/Stream';
// import useRequest from '../../util';
// import './index.less';

// const Home = (props: any) => {
//   const jk = new Array(10).fill(1).map((item, index) => index);
//   const [allList] = useState(jk);
//   const [val, setVal] = useState('');

//   useEffect(() => {
//     var ws = new WebSocket('ws://localhost:3999');

//     ws.onopen = () => {
//       console.log('链接11');
//     };
//     ws.onmessage = (res) => {
//       console.log(res);
//     };
//   }, []);

//   const Item = ({ num }: any) => (
//     <div>
//       <img
//         src={`https://naver.github.io/egjs-infinitegrid/assets/image/${
//           (num % 33) + 1
//         }.jpg`}
//         alt='egjs'
//       />
//     </div>
//   );

//   const handleSubmit = async () => {
//     const res = await useRequest.post({
//       url: '/auth/login',
//       data: { username: 'maria', password: 'guess' },
//     });
//     localStorage.setItem('yolora_token', res.access_token);
//   };

//   return (
//     <div className='homeBox'>
//       {/* nav */}
//       <HeaderNav />
//       {/* main */}
//       <main>
//         {/* banner */}
//         <div className='banner'>
//           {/* <StreamGrid>
//             {allList.map((item, index) => {
//               return <Item num={index} />;
//             })}
//           </StreamGrid> */}
//           {/* <textarea
//             name=''
//             id=''
//             cols={30}
//             rows={10}
//             onChange={(e) => setVal(e.target.value)}
//           ></textarea> */}
//           {/* <button onClick={() => ws.send(val)}>send message</button> */}
//         </div>
//         {/* info */}
//         <button onClick={() => handleSubmit()}>query</button>
//       </main>
//       {/* footer */}
//       <footer></footer>
//     </div>
//   );
// };

// export default inject('RootStore')(observer(Home));

// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import { utils, writeFileXLSX } from "xlsx";

// import './index.less';
// console.log(utils, writeFileXLSX)
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function App() {
//   const [numPages, setNumPages] = useState<any>(null);
//   const [pageNumber, setPageNumber] = useState(3);

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   return (
// <iframe
//   src='./a.pdf'
//   width='100%'
//   height='100vh'
//   title='pdf'
//   style={{ height: '100vh' }}
// ></iframe>
// <div className='pdf-view'>
//   <div className='container'>
//     <Document file={'./a.pdf'} loading={'加载中...'}>
//       <Page
//         pageNumber={pageNumber}
//         loading={'加载中...'}
//         renderTextLayer={false}
//         renderAnnotationLayer={false}
//       />
//     </Document>
//   </div>
//   <div className='page-tool'>
//     <div
//       className='page-tool-item'
//       onClick={() => setPageNumber(pageNumber - 1)}
//     >
//       {' '}
//       上一页
//     </div>
//     <div
//       className='page-tool-item'
//       onClick={() => setPageNumber(pageNumber + 1)}
//     >
//       {' '}
//       下一页
//     </div>
//     <div className='input'>
//       {' '}
//       <input
//         type='number'
//       />{' '}
//       /{' '}
//     </div>
//     <div className='page-tool-item'> 放大</div>
//     <div className='page-tool-item'> 缩小</div>
//   </div>
// </div>
//   );
// }
import React from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import XLSX from 'xlsx';

export default function NewPage() {
  let tansfomer = (arraylist: any) => {
    let attributeList = arraylist[0];
    let tempdata: {}[] = [];
    let slicedList = arraylist.slice(1);
    slicedList.map((item: any) => {
      let tempobject:any = {};
      item.forEach((item: any, index: number) => {
        tempobject[attributeList[index]] = item;
      });
      tempdata.push(tempobject);
    });
    return tempdata;
  };

  const props = {
    name: 'file',
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    beforeUpload: (file: any, fileList: any) => {
      var rABS = true;
      const f = fileList[0];
      var reader = new FileReader();
      reader.onload = function (e: any) {
        var data: any = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        var workbook = XLSX.read(data, {
          type: rABS ? 'binary' : 'array',
        });
        // 假设我们的数据在第一个标签
        var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // XLSX自带了一个工具把导入的数据转成json
        var jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
        console.log(jsonArr);
        console.log(tansfomer(jsonArr));
      };
      if (rABS) reader.readAsBinaryString(f);
      else reader.readAsArrayBuffer(f);
      return false;
    },
  };

  return (
    <div>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
}
