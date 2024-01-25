import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import HeaderNav from '../../components/headerNav';
import StreamGrid from '../../components/Stream';
import './index.less';

const Home = (props: any) => {
  const jk = new Array(10).fill(1).map((item, index) => index);
  const [allList] = useState(jk);
  const [val, setVal] = useState('');

  useEffect(() => {
    console.log(99)
    var ws = new WebSocket('ws://localhost:3999');

    ws.onopen = () => {
      console.log('链接11')
    };
    ws.onmessage = (res) => {
      console.log(res)
    };
  }, []);

  const Item = ({ num }: any) => (
    <div>
      <img
        src={`https://naver.github.io/egjs-infinitegrid/assets/image/${
          (num % 33) + 1
        }.jpg`}
        alt='egjs'
      />
    </div>
  );

  return (
    <div className='homeBox'>
      {/* nav */}
      <HeaderNav />
      {/* main */}
      <main>
        {/* banner */}
        <div className='banner'>
          {/* <StreamGrid>
            {allList.map((item, index) => {
              return <Item num={index} />;
            })}
          </StreamGrid> */}
          <textarea
            name=''
            id=''
            cols={30}
            rows={10}
            onChange={(e) => setVal(e.target.value)}
          ></textarea>
          {/* <button onClick={() => ws.send(val)}>send message</button> */}
        </div>
        {/* info */}
      </main>
      {/* footer */}
      <footer></footer>
    </div>
  );
};

export default inject('RootStore')(observer(Home));
