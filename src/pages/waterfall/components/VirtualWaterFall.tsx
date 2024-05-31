import React from 'react';
import WaterFallCard from './WaterFallCard';
import '../index.less';

interface ICardItem {
  id: number | string;
  width: number;
  height: number;
  [key: string]: any;
}

interface IBookItemRect {
  width: number;
  height: number;
  imageHeight: number;
  top: number;
  left: number;
}

interface IBookRenderItem {
  item: ICardItem;
  y: number;
  h: number;
  imageHeight: number;
  style: React.CSSProperties;
}

interface IBookColumnQueue {
  list: IBookRenderItem[];
  height: number;
}

export default function VirtualWaterFall(props: any) {
  const [renderList, setRenderList] = React.useState([]);
  const virtualWaterFallRef = React.useRef<any>(null);
  const itemSizeInfo = React.useRef(new Map<ICardItem['id'], IBookItemRect>());
  const scrollState = React.useRef<any>({});

  const handleData = (data: any) => {
    const dataArr = data;
    const arrMap = new Map();
    const newArr = dataArr.map((i: any) => {
      const itemWidth = Math.floor(
        (1400 - (props.column - 1) * props.gap) / props.column,
      );
      return {
        width: itemWidth,
        height: Math.floor((itemWidth * i.height) / i.width),
        id: i.id,
      };
    });
    newArr.map((i: any, index: number) => {
      if (index < 5) {
        arrMap.set(i.id, {
          height: i.height,
          width: i.width,
          top: 0,
          left: (i.width + (index === 0 ? 0 : 55)) * index,
        });
      } else {
        const preId = newArr[index - 5].id;
        arrMap.set(i.id, {
          height: i.height,
          width: i.width,
          top: arrMap.get(preId).top + arrMap.get(preId).height + 100,
          left: (i.width + (index % 5 === 0 ? 0 : 55)) * (index % 5),
        });
      }
    });
    console.log(arrMap);
    return arrMap;
  };

  React.useEffect(() => {
    (async () => {
      const list = await props.request(1, props.pageSize);
      setRenderList(list);
      const gh = handleData(list);
      itemSizeInfo.current = gh;
    })();
  }, []);

  const handleScroll = () => {};

  return (
    <div
      className='virtual-waterfall-container'
      ref={virtualWaterFallRef}
      onScroll={handleScroll}
    >
      <div className='virtual-waterfall-list'>
        {renderList.map((item: any, index) => {
          return (
            <div className='virtual-waterfall-item'>
              <WaterFallCard
                title={item.title}
                author={item.author}
                imageHeight={itemSizeInfo.current.get(item.id)?.height || 0}
                bgColor={item.bgColor}
                key={index}
                custom={{
                  width: itemSizeInfo.current.get(item.id)?.width,
                  transform: `translate3d(${
                    itemSizeInfo.current.get(item.id)?.left || 0
                  }px, ${itemSizeInfo.current.get(item.id)?.top}px, 0)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
