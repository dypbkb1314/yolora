import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { debounce } from 'lodash';
import StreamGrid from './Stream';
import { getWindowWidth } from '../../util/helps';

const StreamGridLayout = ({
  children,
  breakpoints,
  large = false,
  spacing = 24,
}) => {
  const [columnWidth, setColumnWidth] = useState(null);
  const [columnCount, setColumnCount] = useState(null);
  const references = useRef([]);
  const gridRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
    references.current = [];
    return () => {
      references.current = [];
    };
  });

  const clearHeightOnResize = () => {
    // eslint-disable-next-line no-unused-expressions
    childRef.current?.clear();
  };

  const calcColumn = () => {
    /**
     * (0,475]     1 column
     * (475,768]   2 columns
     * (768,1024]  3 columns
     * (1024,1280] 4 columns
     * (1280, ]    5 columns
     */
    const documentWidth = getWindowWidth();
    const columns = breakpoints || [475, 768, 1024, 1280];
    let count = columns.findLastIndex((w, i) => documentWidth > columns[i]) + 2;
    if (large) {
      count -= 1;
    }
    const width =
      (gridRef.current?.offsetWidth - (count - 1) * spacing) / count;
      console.log(width, count)
    if (width && count) {
      setColumnWidth(width);
      setColumnCount(count);
    }
  };

  const onResize = (w) => {
    if (getWindowWidth() !== w) {
      clearHeightOnResize();
      calcColumn();
    }
  };

  useEffect(() => {
    calcColumn();
  }, [references.current]);

  useEffect(() => {
    clearHeightOnResize();
    calcColumn();
  }, [large]);

  useEffect(() => {
    const winWidth = getWindowWidth();
    window.addEventListener(
      'resize',
      debounce(() => onResize(winWidth), 100),
    );
    return () =>
      window.removeEventListener(
        'resize',
        debounce(() => onResize(winWidth), 100),
      );
  }, []);

  const getReference = (ref) => {
    references.current = references.current.filter(Boolean).concat(ref);
  };

  const calcHeights = useCallback(() => {
    const heights = references.current.map(
      (ref) => ref?.getBoundingClientRect().height,
    );
    console.log(111, references.current, heights)
    return heights;
  }, [references.current]);

  const clonedChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      ref: getReference,
    }),
  );

  return (
    <StreamGrid
      calcHeights={calcHeights}
      columnWidth={columnWidth}
      columnCount={columnCount}
      ref={childRef}
      gridRef={gridRef}
      spacing={spacing}
    >
      {clonedChildren}
    </StreamGrid>
  );
};

StreamGridLayout.defaultProps = {
  children: [],
  breakpoints: null,
  large: false,
  spacing: 24,
};

StreamGridLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  breakpoints: PropTypes.shape(),
  large: PropTypes.bool,
  spacing: PropTypes.number,
};

export default StreamGridLayout;
