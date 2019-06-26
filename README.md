## A simple opinionated store for react

Define your store like so
```
// ./store.js 
// Exports a dictionary of models

// Each model needs to define a state and actions
const person = {
    state: {
        name: 'John Doe',
    },
    actions: {
        // each action returns a reducer callback
        // This callback reduces the model's state
        setName: function(name) {
            return (personState => ({ ...personState, name }));
        }
    },
};

const address = {
    state: {
        location: 'India',
    },
    actions: {
        setLocation: function(location) {
            return (addressState => ({ ...addressState, location }));
        }
    },
};

export default { person, address };
```

### Usage

```
import createStore from './simpleStore/';

import store from './store';
const [ Provider, withStore ] = createStore(store);

// decorate your component to select the store and actions
@withStore(
  store => ({ person: store.person }),
  actions => ({ personActions: actions.person }),
)
class Person extends React.Component {
    static propTypes = {
        person: PropTypes.object,
        personActions: PropTypes.object,
    };
    ...
}

```
Wrap your app with the `Provider`
```
function App() {
  return (
    <Provider>
        <Person />
    </Provider>
  );
}
```
