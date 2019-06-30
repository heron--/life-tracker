import React, { useState } from 'react';
import styled from 'styled-components';
import * as firebase from "firebase/app";
import DatePicker from 'react-date-picker';
import moment from 'moment';
import { H1, ClickyGem } from '../../common/components';
import { withAppData } from '../../AppData';
import { updateDate } from '../../utils';
import { LineChart } from 'react-chartkick';
import 'chart.js';

const RadioContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 1rem 0;
`;

function Weight({ appData }) {
    const { trackerValues } = appData;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [increment, setIncrement] = useState(0.2);
    const dateKey = moment(currentDate).format('YYYYMMDD').toString();
    const previousDayDateKey = moment(currentDate).subtract(1, 'days').format('YYYYMMDD').toString();
    const defaultWeight = (trackerValues[previousDayDateKey] && trackerValues[previousDayDateKey]['weight']) || 240;

    function setWeight(diff) {
        const updateValue = (trackerValues[dateKey] && trackerValues[dateKey]['weight']) || defaultWeight;
        updateDate(firebase, dateKey, trackerValues, {
            weight: updateValue + diff,
        });
    };
    return (
        <div>
            <H1>Weight</H1>
            <DatePicker
                value={currentDate}
                onChange={setCurrentDate}
            />
            <RadioContainer>
                <ClickyGem onClick={() => setIncrement(0.2)} size="50px" reverse={increment === 0.2}>0.2</ClickyGem>
                <ClickyGem onClick={() => setIncrement(0.4)} size="50px" reverse={increment === 0.4}>0.4</ClickyGem>
                <ClickyGem onClick={() => setIncrement(1)} size="50px" reverse={increment === 1}>1.0</ClickyGem>
            </RadioContainer>
            <div>
                <button onClick={() => setWeight(-increment)}>DOWN</button>
                    {((trackerValues[dateKey] && trackerValues[dateKey]['weight']) || defaultWeight).toFixed(1) }
                <button onClick={() => setWeight(increment)}>UP</button>
            </div>

            <LineChart
                min={180}
                data={
                    Object.keys(trackerValues).reduce((acc, curr) => {
                        if (trackerValues[curr]['weight']) {
                            const key = moment(curr).format('YYYY-MM-DD');
                            return { ...acc, [key]: trackerValues[curr]['weight'] };
                        }
                        return acc;
                    }, {})
                }
            />
        </div>
    );
}

export default withAppData(Weight);
