import React from 'react';

const setUpConsumer = StoreContext => (storeSelector, actionsSelector) => WrappedComponent => {
    return props => (
        <StoreContext.Consumer>
            {
                contextProps => {
                    const { store, actions } = contextProps;
                    const storeProps = storeSelector && storeSelector(store);
                    const actionProps = actionsSelector && actionsSelector(actions);

                    return <WrappedComponent {...props} {...storeProps} {...actionProps} />
                }
            }
        </StoreContext.Consumer>
    );
}

export default setUpConsumer;
