import React, { useEffect, useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import './grid.less';

const StreamGrid = React.forwardRef(
  (
    { calcHeights, children, columnWidth, columnCount, gridRef, spacing },
    ref,
  ) => {
    const [heights, setHeights] = useState([]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        setHeights([]);
      },
    }));

    useEffect(() => {
      const heightArr = calcHeights();
      if (columnCount && columnWidth) {
        if (heightArr.length) {
          console.log(heightArr);
          setHeights([...heightArr]);
        }
      }
    }, [columnCount, columnWidth, calcHeights]);

    const columnHeights = [];

    const isNumber = (value) => !Number.isNaN(Number(value));

    const renderChildren = () => {
      const childNodes = children.map((child, i) => {
        console.log(heights);
        const ChildType = child.type;
        const box = {
          width: 0,
          height: 0,
          left: 0,
          top: 0,
        };
        box.width = columnWidth;
        // eslint-disable-next-line no-mixed-operators
        box.height = heights[i];
        if (i < columnCount) {
          box.left = i * (columnWidth + spacing);
          box.top = 0;
          columnHeights.push(box.height + spacing);
        } else {
          const min = Math.min(...columnHeights);
          const minIdx = columnHeights.indexOf(min);
          box.top = isNumber(min) ? min : 0;
          box.left = minIdx * (columnWidth + spacing);
          columnHeights[minIdx] += box.height + spacing;
        }
        return (
          <div
            ref={child.ref}
            key={child.props?.id || i}
            style={{
              position: 'absolute',
              width: box.width,
              height: box.height,
              transform: `translate(${box.left}px, ${box.top}px)`,
            }}
          >
            <ChildType {...child.props} />
          </div>
        );
      });
      const columnHeight = Math.max(...columnHeights);
      return (
        <div
          ref={gridRef}
          style={{
            height: isNumber(columnHeight) ? columnHeight : 0,
            position: 'relative',
          }}
        >
          {childNodes.map((child, index) => {
            let newClassName = '';
            return React.cloneElement(child, {
              className: newClassName,
            });
          })}
        </div>
      );
    };

    return <>{renderChildren()}</>;
  },
);

StreamGrid.displayName = 'StreamGrid';

StreamGrid.defaultProps = {
  calcHeights: () => {},
  children: [],
  columnWidth: 0,
  columnCount: 0,
  gridRef: null,
  spacing: 24,
};

StreamGrid.propTypes = {
  calcHeights: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  columnWidth: PropTypes.number,
  columnCount: PropTypes.number,
  gridRef: PropTypes.shape(),
  spacing: PropTypes.number,
};

export default React.memo(StreamGrid);
