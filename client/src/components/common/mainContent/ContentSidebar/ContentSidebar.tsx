import './ContentSidebar.css';

import ContentSideBarWrapper from './ContentSideBarWrapper';
import { useNavigation } from '../../../../context/NavigationContext';
import UserControlSettings from '../../../UserControlSettings/UserControlSettings';

function ContentSidebar() {
  const { activeContentSideBar } = useNavigation();
  return (
    <aside className='content-sidebar'>
      <ContentSideBarWrapper activeContentSideBar={activeContentSideBar} />
      <UserControlSettings userId={''} onSettingsClick={function (): void {
        throw new Error('Function not implemented.');
      } } onChangeAvatar={function (): void {
        throw new Error('Function not implemented.');
      } } onChangeAccount={function (): void {
        throw new Error('Function not implemented.');
      } } onLogout={function (): void {
        throw new Error('Function not implemented.');
      } } />
      {/* Autres composants de la sidebar si nécessaire */}
    </aside>
  );
}

export default ContentSidebar;
