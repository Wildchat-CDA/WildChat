import React from 'react';
import InputMessage from './components/InputMessage/InputMessage';
import ShowMessage from './components/ShowMessage/ShowMessage';

const App = (props) => {
  return (
    <div>
      <ShowMessage />
      <InputMessage />
    </div>
  );
};

export default App;
