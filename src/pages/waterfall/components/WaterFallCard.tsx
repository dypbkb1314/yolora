import React from 'react';
import '../index.less';

interface ICardDetail {
  bgColor: string;
  title: string;
  author: string;
  imageHeight: number;
  [key: string]: any;
}

export default function WaterFallCard(props: ICardDetail) {
  const { title, author, imageHeight, bgColor, custom } = props;
  return (
    <div className='card-container' style={custom}>
      <div
        className='card-image'
        style={{ height: imageHeight, backgroundColor: bgColor }}
      ></div>
      <div className='card-footer'>
        <div className='card-title'>{title}</div>
        <div className='card-author'>
          <div className='info'>
            <div className='avatar' style={{ backgroundColor: bgColor }}></div>
            <span className='name'>{author}</span>
          </div>
          <div className='like'>99</div>
        </div>
      </div>
    </div>
  );
}
