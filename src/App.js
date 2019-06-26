import React from 'react';
import createStore from './simpleStore/';

import store from './store';
const [ Provider, withStore ] = createStore(store);

const Person = ({ person, personActions }) => {
  const onClick = () => {
    console.log(personActions.setName);
    personActions.setName('asdsd');
  };
  return (<div onClick={onClick}>{person.name}</div>);
};

const WrappedPerson = withStore(
  store => ({ person: store.person }),
  actions => ({ personActions: actions.person }),
)(Person);

function App() {
  return (
    <Provider>
        <WrappedPerson />
    </Provider>
  );
}

export default App;
