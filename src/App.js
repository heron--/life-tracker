
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/database";
import styled from 'styled-components';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Drinks from './pages/Drinks'
import Weight from './pages/Weight'
import { appBackground } from './common/colors';
import { ProtectedRoute, Nav } from './common/components';
import { AppDataContext } from './AppData';
import { updateDate } from './utils';

const Body = styled.div`
    background: ${appBackground.hex()};
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AppContainer = styled.div`
    max-width: 340px;
    max-height: 600px;
    height: 100%;
    width: 100%;
`;

const ROUTE_DASHBOARD = {
    path: '/dashboard',
    display: 'Dashboard',
};

const ROUTE_DRINKS = {
    path: '/drinks',
    display: 'Drinks',
};

const ROUTE_WEIGHT = {
    path: '/weight',
    display: 'Weight',
};

const NAV_ROUTES = [
    ROUTE_DASHBOARD,
    ROUTE_DRINKS,
    ROUTE_WEIGHT,
];

export default function App() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [isDbConnected, setIsDbConnected] = useState(false);
    const [trackerValues, setTrackerValues] = useState({});

    useEffect(() => {
        function dataCallback(data) {
            setTrackerValues(data.val());
        }

        const firebaseConfig = {
            apiKey: "AIzaSyCqkGjaPgMGjQ8lWHb4U9MHANgp5FONbaU",
            authDomain: "life-tracker-a6834.firebaseapp.com",
            databaseURL: "https://life-tracker-a6834.firebaseio.com",
            projectId: "life-tracker-a6834",
            storageBucket: "",
            messagingSenderId: "547043946587",
            appId: "1:547043946587:web:59f5d04b173eab62"
        };
        firebase.initializeApp(firebaseConfig);
        setIsDbConnected(true);

        updateDate(firebase, '20190630', trackerValues, { drinks: 0 });

        firebase.database().ref('/').on('value', dataCallback);

        return () => {
            firebase.database().ref('/').off('value', dataCallback);
        };
    }, []);

    console.log(trackerValues);
    return (
        <Router>
            <AppDataContext.Provider
                value={{
                    isAuthed,
                    setIsAuthed,
                    isDbConnected,
                    trackerValues,
                }}
            >
                <Body>
                    <AppContainer>
                        {isAuthed ? <Nav routes={NAV_ROUTES} /> : null }
                        <Route exact path="/" component={Login} />
                        <ProtectedRoute isAuthed={isAuthed} path={ROUTE_DRINKS.path} component={Drinks} />
                        <ProtectedRoute isAuthed={isAuthed} path={ROUTE_DASHBOARD.path} component={Dashboard} />
                        <ProtectedRoute isAuthed={isAuthed} path={ROUTE_WEIGHT.path} component={Weight} />
                    </AppContainer>
                </Body>
            </AppDataContext.Provider>
        </Router>
    );
}
