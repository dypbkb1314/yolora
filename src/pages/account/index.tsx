import axios from 'axios';
import './index.less';

const Account = () => {
  const getUser = async () => {
    const res = await axios.get('/api/user');
  };
  return (
    <div>
      <h4>account page</h4>
      <button onClick={getUser}>get user</button>
    </div>
  );
};

export default Account;
