import React from 'react';
import InputMessage from "./components/message/InputMessage/InputMessage"
import ShowMessage from './components/message/ShowMessage/ShowMessage';

const App = (props) => {
  return (
    <div>
      <ShowMessage />
      <InputMessage />
    </div>
  );
};

export default App;
