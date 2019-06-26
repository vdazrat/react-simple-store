import React from 'react';

export default (StoreContext, initialStore) => {
    return class SimpleStoreProvider extends React.PureComponent {
        constructor(props) {
            super(props);
            // todo validate the store
            this.state = this.getState(initialStore);
            this.actions = this.getActions(initialStore);
        }
    
        getState = (store) => {
            const models = Object.keys(store);
            const state = models.reduce((acc, model) => ({ ...acc, [model]: store[model].state }), {});
            return state;
        };
    
        getActions = (store) => {
            const modelKeys = Object.keys(store);
            const actions = modelKeys.reduce((acc, modelKey) => ({
                ...acc,
                [modelKey]: store[modelKey].actions,
            }), {});

            const bindForModel = (actions, modelKey) => {
                const modelActions = actions[modelKey];
                const actionNames = Object.keys(modelActions);
                actionNames.forEach(actionName => {
                    const fn = modelActions[actionName];
                    modelActions[actionName] =  function(...args) {
                        const setModel = fn(...args);
                        this.setState(prev => ({
                            ...prev,
                            [modelKey]: setModel(),
                        }));
                    }.bind(this);
                });
            };

            modelKeys.forEach(modelKey => bindForModel(actions, modelKey));

            return actions;
        };
    
        render() {
            return (
                <StoreContext.Provider
                    value={{
                        store: this.state,
                        actions: this.actions,
                    }}
                >
                    {this.props.children}
                </StoreContext.Provider>
            );
        }
    }
};
