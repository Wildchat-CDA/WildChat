import './ContentSidebar.css';

import Setting from '../../../setting/Setting';
import ContentSideBarWrapper from './ContentSideBarWrapper';
import { useNavigation } from '../../../../context/NavigationContext';

function ContentSidebar() {
  const { activeContentSideBar } = useNavigation();
  return (
    <aside className='content-sidebar'>
      {/* {userRole === 'teacher' && <RaisedHandsList />} */}
      <ContentSideBarWrapper activeContentSideBar={activeContentSideBar} />

      <Setting />
      {/* Autres composants de la sidebar si nécessaire */}
    </aside>
  );
}

export default ContentSidebar;
