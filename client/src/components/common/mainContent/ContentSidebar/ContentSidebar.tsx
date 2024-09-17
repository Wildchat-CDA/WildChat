import './ContentSidebar.css';
import Section from '../../../channel/section/Section';

function ContentSidebar() {
  return (
    <aside className='content-sidebar'>
      {/* {userRole === 'teacher' && <RaisedHandsList />} */}
      <Section type={'library'} />
      <Section type={`classRoom`} />
      {/* Autres composants de la sidebar si nécessaire */}
    </aside>
  );
}

export default ContentSidebar;
