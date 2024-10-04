import ContentSideBarActive from './ContentSideBarActive';
import {
  ActiveSideBarType,
  ContentSideBarEnum,
} from '../../../../context/NavigationContext';
import SectionPage from '../../../../pages/sectionPage/SectionPage';
import RaisedHandsList from '../../../teacher/RaisedHandList/RaisedHandsList';
<<<<<<< HEAD
import PrivateMessagePage from '../../../../pages/privateMessagePage/PrivateMessagePage';
=======
import PresenceList from '../../../teacher/PresenceList/PresenceList';
>>>>>>> dev

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
<<<<<<< HEAD
      content = <PrivateMessagePage />; //TODO : METTRE MON COMPOSANT ICI
=======
      content = 'COMPOSANT private message';

>>>>>>> dev
      break;
    case ContentSideBarEnum.PresenceList:
      //content = 'COMPOSANT presence list';
      content = < PresenceList/>;
      break;
    case ContentSideBarEnum.RaisedHand:
      content = <RaisedHandsList />;
      break;
  }

  return <ContentSideBarActive>{content}</ContentSideBarActive>;
}

export default ContentSideBarWrapper;
