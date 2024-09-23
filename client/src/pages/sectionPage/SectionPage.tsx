import Section from '../../components/channel/section/Section';
import './SectionPage.css';

const SectionPage = () => {
  return (
    <div className='page-section_container'>
      <Section type={'library'} />
      <Section type={`classRoom`} />
    </div>
  );
};

export default SectionPage;
