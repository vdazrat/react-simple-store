const person = {
    state: {
        name: 'John Doe',
    },
    actions: {
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
