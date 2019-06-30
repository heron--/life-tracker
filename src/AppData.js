import React from 'react';

export const AppDataContext = React.createContext();

export const withAppData = Component => props => (
    <AppDataContext.Consumer>
        {appData => <Component appData={appData} {...props} />}
    </AppDataContext.Consumer>
);
