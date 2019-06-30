import React, { useState, useEffect } from 'react';
import * as firebase from "firebase/app";
import styled from 'styled-components';
import Color from 'color';
import moment from 'moment';
import CalendarHeatmap from 'react-calendar-heatmap';
import DatePicker from 'react-date-picker';
import 'react-calendar-heatmap/dist/styles.css';
import { withAppData } from '../../AppData';
import { H1, H2, ClickyGem } from '../../common/components';
import { getWeekOf, updateDate } from '../../utils';

const baseSquareColor = new Color('#f5cccc');

const DrinkContainer = styled.div`
    .react-calendar-heatmap .color-empty { fill: ${baseSquareColor.hex()} }
    .react-calendar-heatmap .color-scale-0 { fill: ${baseSquareColor.hex()} }
    .react-calendar-heatmap .color-scale-1 { fill: ${baseSquareColor.darken(0.2).hex()} }
    .react-calendar-heatmap .color-scale-2 { fill: ${baseSquareColor.darken(0.4).hex()} }
    .react-calendar-heatmap .color-scale-3 { fill: ${baseSquareColor.darken(0.6).hex()} }
    .react-calendar-heatmap .color-scale-4 { fill: ${baseSquareColor.darken(0.8).hex()} }
    .react-calendar-heatmap .color-scale-5 { fill: ${baseSquareColor.darken(1).hex()} }
`;

function Drinks({ appData }) {
    const { trackerValues } = appData;
    const [currentDate, setCurrentDate] = useState(new Date());
    const dateKey = moment(currentDate).format('YYYYMMDD').toString();

    useEffect(() => {
        updateDate(firebase, dateKey, trackerValues, {
            drinks: (trackerValues[dateKey] && trackerValues[dateKey]['drinks']) || 0
        });
    }, [currentDate, trackerValues, dateKey])

    function increaseCurrentDate() {
        const updateValue = (trackerValues[dateKey] && trackerValues[dateKey]['drinks']) || 0;
        updateDate(firebase, dateKey, trackerValues, {
            drinks: updateValue + 1,
        });
    };

    function decreaseCurrentDate() {
        const updateValue = (trackerValues[dateKey] && trackerValues[dateKey]['drinks']) || 0;
        updateDate(firebase, dateKey, trackerValues, {
            drinks: (updateValue - 1 >= 0) ? updateValue - 1 : 0,
        });
    };

    return (
        <DrinkContainer>
            <H1>Drinks</H1>
            <section>
                <H2>Update {moment(currentDate).format('MMMM DD')}</H2>
                <DatePicker
                    value={currentDate}
                    onChange={setCurrentDate}
                />
                <p>{(trackerValues[dateKey] && trackerValues[dateKey]['drinks']) || 0}</p>
                <ClickyGem color="#cf234b" activeColor="#d36eff" onClick={decreaseCurrentDate} />
                <ClickyGem color="#23cf45" activeColor="#dbf536" onClick={increaseCurrentDate} />
            </section>
            <hr />
            <section>
                <H2>This Week</H2>
                {
                    Object.keys(getWeekOf(trackerValues)).map(
                        value => (
                            <li key={value}>
                                <strong>{moment(value, 'YYYYMMDD').format('dddd, [the] Do')}:</strong> {trackerValues[value].drinks}
                            </li>
                        )
                    )
                }
            </section>
            <hr />
            <CalendarHeatmap
                startDate={new Date('2019-01-01')}
                endDate={new Date()}
                values={
                    Object.keys(trackerValues)
                        .map(trackerKey => ({
                            date: moment(trackerKey).format('YYYY-MM-DD').toString(),
                            count: trackerValues[trackerKey].drinks,
                        }))
                }
                classForValue={(value) => {
                    if (!value) {
                        return 'color-empty';
                    }

                    const classValue = Math.ceil(value.count / 3);
                    return `color-scale-${classValue}`;
                }}
            />
        </DrinkContainer>
    );
}

export default withAppData(Drinks);
