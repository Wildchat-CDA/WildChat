import ContentSideBarActive from './ContentSideBarActive';
import {
  ActiveSideBarType,
  ContentSideBarEnum,
} from '../../../../context/NavigationContext';
import SectionPage from '../../../../pages/sectionPage/SectionPage';
import RaisedHandsList from '../../../teacher/RaisedHandList/RaisedHandsList';
import PrivateMessagePage from '../../../../pages/privateMessagePage/PrivateMessagePage';
import PresenceList from '../../../teacher/PresenceList/PresenceList';
import { useUserRole } from '../../../../context/UserRoleContext';
import AddStudentsPage from '../../../teacher/addStudent/AddStudentPage';

interface ContentSideBarWrapperProps {
  activeContentSideBar: ActiveSideBarType;
}

function ContentSideBarWrapper({
  activeContentSideBar,
}: ContentSideBarWrapperProps) {
  const { userRole } = useUserRole();
  let content = null;

  switch (activeContentSideBar) {
    case ContentSideBarEnum.Home:
      content = <SectionPage />;
      break;
    case ContentSideBarEnum.PrivateMessage:
      content = <PrivateMessagePage />; //TODO : METTRE MON COMPOSANT ICI
      break;
    case ContentSideBarEnum.PresenceList:
      content = userRole === 'teacher' && <PresenceList />;
      break;
    case ContentSideBarEnum.RaisedHand:
      content = userRole === 'teacher' && <RaisedHandsList />;
      break;
    case ContentSideBarEnum.AddStudent:
      content = <AddStudentsPage />;
      break;  
  }

  return <ContentSideBarActive>{content}</ContentSideBarActive>;
}

export default ContentSideBarWrapper;
