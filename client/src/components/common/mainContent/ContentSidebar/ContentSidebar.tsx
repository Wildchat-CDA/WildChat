import RaisedHandsList from '../../../teacher/RaisedHandsList';
import { useUserRole } from '../../../../context/UserRoleContext';
import './ContentSidebar.css';
import Section from '../../../channel/section/Section';




function ContentSidebar() {
  const { userRole } = useUserRole();

  return (
    <aside className='content-sidebar'>
      {userRole === 'teacher' && <RaisedHandsList />}
      <Section />
      {/* Autres composants de la sidebar si nécessaire */}
    </aside>
  );
}

export default ContentSidebar;
