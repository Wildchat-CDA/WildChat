import ContentSideBarActive from './ContentSideBarActive';
import {
  ActiveSideBarType,
  ContentSideBarEnum,
} from '../../../../context/NavigationContext';
import SectionPage from '../../../../pages/sectionPage/SectionPage';
import RaisedHandsList from '../../../teacher/RaisedHandList/RaisedHandsList';
import PresenceList from '../../../teacher/PresenceList/PresenceList';
import AddStudentsPage from '../../../../pages/studentAccount/AddStudentPage';

interface ContentSideBarWrapperProps {
  activeContentSideBar: ActiveSideBarType;
}

function ContentSideBarWrapper({
  activeContentSideBar,
}: ContentSideBarWrapperProps) {
  let content = null;
  switch (activeContentSideBar) {
    case ContentSideBarEnum.Home:
      content = <SectionPage />;
      break;
    case ContentSideBarEnum.PrivateMessage:
      content = 'COMPOSANT private message';

      break;
    case ContentSideBarEnum.PresenceList:
      //content = 'COMPOSANT presence list';
      content = < PresenceList/>;
      break;
    case ContentSideBarEnum.RaisedHand:
      content = <RaisedHandsList />;
      break;
    case ContentSideBarEnum.AddStudent:
      content = <AddStudentsPage />;
      break;  
  }

  return <ContentSideBarActive>{content}</ContentSideBarActive>;
}

export default ContentSideBarWrapper;
