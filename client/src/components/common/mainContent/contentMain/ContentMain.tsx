import './ContentMain.css';
import ChatPage from '../../../../pages/ChatPage';
import { useNavigation } from '../../../../context/NavigationContext';

function ContentMain() {
  const { activeContentMainComp } = useNavigation();
  return (
    <main className='content-main'>
      {activeContentMainComp && <ChatPage />}
    </main>
  );
}

export default ContentMain;
