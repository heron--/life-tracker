import moment from 'moment';

const DEFAULT_TRACKER_VALUE = {
    drinks: 0,
    exercise: false,
    exerciseNotes: '',
};

/**
 * @param   {string}  date           'YYYYMMDD'
 * @param   {object}  trackerValues
 * @param   {object}  update
 *
 * @return  {object}
 */
export function getUpdateValueForDate(date, trackerValues, patch) {
    return {
        ...DEFAULT_TRACKER_VALUE,
        ...(trackerValues[date] || {}),
        ...patch,
    };
}

export function updateToday(firebase, trackerValues, patch) {
    const today = moment().format('YYYYMMDD');

    firebase
        .database()
        .ref('/20190630')
        .update(getUpdateValueForDate(today.toString(), trackerValues, patch));
}

export function updateDate(firebase, date, trackerValues, patch) {
    firebase
        .database()
        .ref(`/${date}`)
        .update(getUpdateValueForDate(date, trackerValues, patch));
}

export function getWeekOf(trackerValues, week = null) {
    const weekMoment = week ? moment(week, 'YYYYMMDD') : moment();
    const startOfWeek = moment(weekMoment).startOf('week');
    const endOfWeek = moment(weekMoment).endOf('week');

    const validKeys = Object.keys(trackerValues).filter(trackerKey => {
        const trackerMoment = moment(trackerKey, 'YYYYMMDD');
        return trackerMoment.isSameOrBefore(endOfWeek) && trackerMoment.isSameOrAfter(startOfWeek);
    });

    return validKeys.reduce((acc, curr) => {
        return { ...acc, [curr]: trackerValues[curr] };
    }, {})
}
