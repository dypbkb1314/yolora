import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import mockdata from './mock.json';
import _ from 'lodash';
import './index.less';

export function useThrottle(fn: any, delay: number) {
  const { current } = useRef<any>({});
  function f(...args: any[]) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      fn(...args);
    }
  }
  return f;
}

export default function WaterFall() {
  const [ids, setIds] = useState<any[]>([]);
  const [pos, setPos] = useState<any>({});
  const [heights, setHeights] = useState([]);
  const visibleHeight = 500;
  const rowNum = 3;
  const showWidth = window.innerWidth / rowNum;
  const lists = mockdata.data.items;

  const getIds = (scrollTop: number, data: any) => {
    const gh = Object.values(data)
      .map((item: any, index) => {
        if (
          (item.top >= scrollTop && item.top < scrollTop + visibleHeight) ||
          (item.top < scrollTop && item.top + item.height > scrollTop)
        ) {
          return index;
        }
      })
      .filter((i) => i !== undefined);
    setIds([...gh]);
  };

  useEffect(() => {
    const listHeights: any = [];
    const listData: any = {};
    lists.map((i, index) => {
      const itemHeight =
        (showWidth * i.note_card.cover.height) / i.note_card.cover.width;
      if (index < rowNum) {
        listData[index] = {
          top: 0,
          left: index * showWidth,
          height: itemHeight,
        };
        listHeights.push(itemHeight);
      } else {
        const minHeight = Math.min(...listHeights);
        const itemIndex = listHeights.indexOf(minHeight);
        listData[index] = {
          left: (itemIndex % 10) * showWidth,
          height:
            (showWidth * i.note_card.cover.height) / i.note_card.cover.width,
          top: minHeight,
        };
        listHeights[itemIndex] = itemHeight + minHeight + 15;
      }
    });
    setPos(listData);
    setHeights(listHeights);
    getIds(0, listData);
  }, []);

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    getIds(scrollTop, pos);
  };

  const jk = useThrottle(handleScroll, 100);

  if (Object.keys(pos).length !== lists.length) return null;

  return (
    <div
      style={{
        height: visibleHeight,
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
      onScroll={jk}
    >
      <div className='container' style={{ height: Math.max(...heights) }}>
        {mockdata.data.items.map((item, index) => {
          if (ids.includes(index)) {
            return (
              <div
                key={index}
                style={{
                  width: showWidth - 10,
                  position: 'absolute',
                  transform: `translate(${pos[index].left}px, ${pos[index].top}px)`,
                  height: `${
                    ((showWidth - 10) * item.note_card.cover.height) /
                    item.note_card.cover.width
                  }px`,
                  // background: `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
                  //   Math.random() * 255,
                  // )}, ${Math.round(Math.random() * 255)})`,
                  border: '1px solid #222',
                }}
              >
                {index}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
