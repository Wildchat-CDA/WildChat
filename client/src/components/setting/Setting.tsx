import { useNavigate } from 'react-router-dom';
import './Setting.css';
import Cookies from 'js-cookie';

const Settings = () => {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token")
    navigate("/login")

  }
  return <div className='setting-container'>
     <button type='button' onClick={() => logout()} className="btn-logout">Deconnexion</button>
  </div>;
};

export default Settings;
