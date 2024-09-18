import ContentSidebar from './ContentSidebar/ContentSidebar';
import ContentMain from './contentMain/ContentMain';
import './MainContent.css';
import { useNavigation } from '../../../context/NavigationContext';
import Setting from '../../setting/Setting';

interface IMainContentProps {
  isMobile: boolean;
}

const MainContent = ({ isMobile }: IMainContentProps) => {
  const { activeContentMainComp } = useNavigation();
  console.log('activeContentMain : ', activeContentMainComp);

  return isMobile === true ? (
    <div className='main-content'>
      {activeContentMainComp === true ? <ContentMain /> : <ContentSidebar />}
    </div>
  ) : (
    <div className='main-content'>
      <ContentSidebar />
      <ContentMain />
    </div>
  );
};

export default MainContent;
