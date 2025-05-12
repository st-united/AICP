import { useParams } from 'react-router-dom';

const ActivateAccount = () => {
  const { token } = useParams();

  const handleActivate = () => {
    console.log(token);
  };

  return (
    <div>
      <h2>Kích hoạt tài khoản</h2>
      <button onClick={handleActivate}>Kích hoạt</button>
    </div>
  );
};

export default ActivateAccount;
