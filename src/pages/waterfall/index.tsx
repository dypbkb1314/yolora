import React from 'react';
import VirtualWaterFall from './components/VirtualWaterFall';
import config from './config/index';
import './index.less';

interface ICardItem {
  id: number | string;
  width: number;
  height: number;
  [key: string]: any;
}

const { list } = config;

export default function WaterFall() {
  const waterfallRef = React.useRef(null);
  const [column, setColumn] = React.useState(6);

  const fContainerObserver = new ResizeObserver((entries) => {
    setColumn(entries[0].target.clientWidth);
  });

  const getData = (page: number, pageSize: number) => {
    console.log(11, page, pageSize);
    return new Promise<ICardItem[]>((resolve) => {
      setTimeout(() => {
        resolve(
          list.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
        );
      }, 1000);
    });
  };

  React.useEffect(() => {
    // waterfallRef.current && fContainerObserver.observe(waterfallRef.current);
    // return () => {
    //   waterfallRef.current &&
    //     fContainerObserver.unobserve(waterfallRef.current);
    // };
  }, []);

  return (
    <div className='warterfall-app'>
      <div className='container' ref={waterfallRef}>
        <VirtualWaterFall
          request={getData}
          gap={15}
          pageSize={20}
          column={column}
          enterSize={column * 2}
        ></VirtualWaterFall>
      </div>
    </div>
  );
}
