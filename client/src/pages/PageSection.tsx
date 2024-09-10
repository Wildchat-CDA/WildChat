import React from 'react';
import Section from '../components/channel/section/Section';
import './PageSection.css';
import NewSectionInput from '../components/common/input/NewSectionInput';

const PageSection = () => {
  return (
    <div className='page-section_container'>
      <Section />
      <NewSectionInput />
    </div>
  );
};

export default PageSection;
