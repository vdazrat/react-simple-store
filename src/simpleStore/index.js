import React from 'react';
import setUpProvider from './core/provider';
import setUpConsumer from './core/consumer';

const createStore = (store) => {
    const StoreContext = React.createContext();
    const Provider = setUpProvider(StoreContext, store);
    const withStore = setUpConsumer(StoreContext);
    return [ Provider, withStore ];
};

export default createStore;
