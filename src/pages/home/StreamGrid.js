import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function StreamGrid({ children }) {
  const [heights, setHeights] = useState([]);
  const photosRef = useRef([]);
  const gridRef = useRef(null);
  const itemWidth = (window.innerWidth - 24) / 5;
  const columnHeight = [];

  const getPhotosRef = (ref) => {
    photosRef.current = photosRef.current.filter(Boolean).concat(ref);
  };

  const clonedChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      ref: getPhotosRef,
    }),
  );

  const calcHeights = useCallback(() => {
    const heights = photosRef.current.map(
      (ref) => ref?.getBoundingClientRect().height,
    );
    return heights;
  }, [photosRef.current]);

  useEffect(() => {
      const heg = calcHeights();
      setHeights([...heg])
  }, [calcHeights])

  const renderChildren = () => {
    const childNodes = clonedChildren.map((child, index) => {
      const ChildType = child.type;
      const box = {
        left: 0,
        top: 0,
        height: 0,
        width: itemWidth,
      }
      box.height = heights[index];
      if(index < 5){
        box.top = 0;
        box.left = index * itemWidth;
        columnHeight.push(box.height)
      }else{
        const minHeight = Math.min(...columnHeight);
        const minIndex = columnHeight.indexOf(minHeight);
        box.top = minHeight;
        box.left = minIndex * itemWidth;
        columnHeight[minIndex] = minHeight + box.height;
      }
      return (
        <div key={index} ref={ref => photosRef[index] = ref} style={{
          position: 'absolute',
          width: box.width,
          height: box.height,
          transform: `translate(${box.left}px, ${box.top}px)`,
        }}>
          <ChildType {...child.props} />
        </div>
      );
    });
    return (
      <div ref={gridRef}>
        {childNodes}
      </div>
    );
  };

  return <div>{renderChildren()}</div>;
}
