// import { observer } from 'mobx-react';
// import './index.less';
// import useStore from '../../useStore';

// const About = () => {
//   const store = useStore('store');
//   const user = useStore('user');
//   return (
//     <div>
//       <p>{user.user}</p>
//       {store.total}
//       <button onClick={() => store.total = 99}>
//         change username
//       </button>
//     </div>
//   );
// };

// export default observer(About);

import React from 'react';
import { inject, observer } from 'mobx-react'

const About = (props: any) => {
  React.useEffect(() => {
    console.log('RootStore', props.RootStore.mobile);
    console.log('UserStore', props.UserStore);
  }, [])
  return (
    <div>
      <h5>About Page</h5>
      <p>token: {props.RootStore.token}</p>
      <p>mobile: {props.RootStore.mobile}</p>
      <button onClick={() => props.RootStore.setUserInfo(`${Math.floor(Math.random()*10000000)}`, `jklulu${Math.floor(Math.random()*10000000)}`)}>set user</button>
      <button onClick={() => props.RootStore.clearUserInfo()}>clear</button>
    </div>
  )
}

export default inject('RootStore')(inject('UserStore')(observer(About)));
