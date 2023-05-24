import { Link, useNavigate } from 'react-router-dom';
import './index.less';
const HeaderNav = () => {
  const navigate = useNavigate();
  const navList = [
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Account',
      path: '/account',
    },
  ];
  return (
    <nav>
      <h3 onClick={() => navigate('/')}>Yolora</h3>
      <div className='nav'>
        {navList.map((item) => {
          return <Link to={item.path}>{item.name}</Link>;
        })}
      </div>
    </nav>
  );
};

export default HeaderNav;
