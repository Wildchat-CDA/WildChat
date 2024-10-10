import './ContentSidebar.css';

import Setting from '../../../UserControlSettings/UserControlSettings';
import ContentSideBarWrapper from './ContentSideBarWrapper';
import { useNavigation } from '../../../../context/NavigationContext';
import AddStudentsPage from '../../../teacher/addStudent/AddStudentPage';
import StudentForm from '../../../teacher/addStudent/StudentForm';



function ContentSidebar() {
  const { activeContentSideBar } = useNavigation();
  return (
    <aside className='content-sidebar'>
      <ContentSideBarWrapper activeContentSideBar={activeContentSideBar} />
      <Setting />
      {/* Autres composants de la sidebar si nécessaire */}
    </aside>
  );
}

export default ContentSidebar;
