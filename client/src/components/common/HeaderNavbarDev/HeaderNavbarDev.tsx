import { useUserRole } from '../../../context/UserRoleContext';
import './HeaderNavbarDev.css';

function HeaderNavbarDev() {
  const { userRole, setUserRole } = useUserRole();

  function handleViewChange() {
    const newRole = userRole === 'student' ? 'teacher' : 'student';
    setUserRole(newRole);
  }

  return (
    <nav
      className={`header-navbar-dev ${
        userRole === 'teacher' ? 'teacher-view' : 'student-view'
      }`}
    >
      <div className='navbar-content'>
        <span>Dev Mode: {userRole === 'teacher' ? 'Professeur' : 'Élève'}</span>
        <label className='switch'>
          <input
            type='checkbox'
            checked={userRole === 'teacher'}
            onChange={handleViewChange}
          />
          <span className='slider'></span>
        </label>
      </div>
    </nav>
  );
}

export default HeaderNavbarDev;
