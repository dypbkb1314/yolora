import React, { useState } from 'react';
import TabContainer from '../../components/TabContainer';

const menulist = [
  {
    label: 'menu1',
    id: 'menu1',
  },
  {
    label: 'menu2',
    id: 'menu2',
  },
  {
    label: 'menu3',
    id: 'menu3',
  },
];
const menucontent = [
  {
    key: 'menu1',
    Component: () => <p>menu1</p>,
  },
  {
    key: 'menu2',
    Component: () => <p>menu2</p>,
  },
  {
    key: 'menu3',
    Component: () => <p>menu3</p>,
  },
];

export default function List() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabContainer activeIndex={activeIndex}>
      <div>
        {menulist.map((i, index) => {
          return (
            <p
              key={i.id}
              onClick={() => {
                setActiveIndex(index);
                window.history.replaceState(null, null, `./list?type=${i.id}`)
              }}
            >
              {i.label}
            </p>
          );
        })}
      </div>
      <div>
        {menucontent.map(({ Component }) => {
          return <Component />;
        })}
      </div>
    </TabContainer>
  );
}
