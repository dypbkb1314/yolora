import React from 'react';

export default function TabContainer({ children, activeIndex }) {
  const containerArray = React.Children.toArray(children);

  const getTabLabels = (labels) =>
    React.Children.map(labels, (label) => {
      const newLabel = React.cloneElement(label, {
        onClick: () => {
          label.props.onClick();
          console.log(99);
        },
      });
      return newLabel;
    });

  const selectContent = (content, index) => {
    return React.Children.toArray(content)[index];
  };

  const labels = getTabLabels(containerArray[0].props.children, 1);
  const content = selectContent(containerArray[1].props.children, activeIndex);

  const tabList = React.cloneElement(containerArray[0], {}, [...labels]);
  const tabContent = React.cloneElement(containerArray[1], {}, content);
  return (
    <div>
      {tabList}
      {tabContent}
    </div>
  );
}
