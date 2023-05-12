import HeaderNav from '../../components/headerNav';
import './index.less';

const Home = () => {
  return (
    <div className='homeBox'>
      {/* nav */}
      <HeaderNav />
      {/* main */}
      <main>
        {/* banner */}
        <div className='banner'></div>
        {/* info */}
      </main>
      {/* footer */}
      <footer></footer>
    </div>
  );
};

export default Home;
