import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import isEqual from 'lodash/isEqual';
import GemGrid from './GemGrid';
import { BasicButton, H1 } from '../../common/components';
import { withAppData } from '../../AppData';

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PageContainer = styled.div`
    max-width: 340px;
`;

const ResultContainer = styled.div`
    font-size: 24px;
    text-align: center;
    min-height: 40px;
`;

function Login({ appData, history }) {
    const [currentOrder, setCurrentOrder] = useState([]);
    const [areOrdersEqual, setAreOrdersEqual] = useState(false);
    const correctOrder = [1, 4, 3, 5];
    const { setIsAuthed, isAuthed } = appData;

    function addToCurrentOrder(number) {
        setCurrentOrder([...currentOrder, number]);
    }

    function resetCurrentOrder() {
        setCurrentOrder([]);
    }

    useEffect(() => {
        if (isEqual(currentOrder, correctOrder)) {
            setAreOrdersEqual(true);
            setTimeout(() => {
                setIsAuthed(true);
            }, 1000);
        } else {
            setAreOrdersEqual(false);
        }
    }, [currentOrder, correctOrder, setIsAuthed])

    useEffect(() => {
        if (isAuthed) {
            history.push('/dashboard');
        }
    }, [isAuthed, history]);

    return (
        <PageContainer>
            <TitleContainer>
                <H1>Login</H1>
                <BasicButton onClick={resetCurrentOrder}>Reset</BasicButton>
            </TitleContainer>
            <ResultContainer>
                {
                    areOrdersEqual
                        ? 'User Authorized. Redirecting...'
                        : currentOrder.map((value, i) => <span key={i}>*</span>)
                }
            </ResultContainer>
            <GemGrid
                addToCurrentOrder={
                    isEqual(currentOrder, correctOrder) ? () => { } : addToCurrentOrder
                }
            />
        </PageContainer>
    );
}

export default withAppData(Login);
