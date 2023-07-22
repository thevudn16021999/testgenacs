import moment from 'moment';

export const getTimezoneOffsetInHour = () => {
    return (new Date().getTimezoneOffset() / 60) * -1;
};

export const addTimezone = (
    date: Date | number | string,
    timezone: number = 0
) => {
    const dateVal = new Date(date);
    dateVal.setHours(dateVal.getHours() + timezone);
    return dateVal;
};

export const getStartOfDate = (
    date: Date | number | string,
    timezone: number = 0
) => {
    return moment(date).startOf('day').toDate();
};

export const getEndOfDate = (date: Date | number | string) => {
    return moment(date).endOf('day').toDate();
};

export const getStartAndEndOfDate = (date: Date | number | string) => {
    const givenDate = moment(date);
    return [givenDate.startOf('day').toDate(), givenDate.endOf('day').toDate()];
};

export const getStartAndEndOfWeek = (date: Date | number | string) => {
    const givenDate = moment(date);
    return [
        givenDate.startOf('week').toDate(),
        givenDate.endOf('week').toDate(),
    ];
};

export const toDate = (val: any, defaultDate: Date | undefined = undefined) => {
    const givenDate = moment(val);
    return givenDate.isValid() ? givenDate.toDate() : defaultDate;
};

export const isValidDate = (val: any) => {
    if (val === undefined || val === null) {
        return '';
    }
    const givenDate = new Date(val);
    return !isNaN(givenDate.getTime());
};

export const formatDDMMYYYY = (inputDate: Date | number) => {
    return moment(inputDate).format('YYYY-MM-DD');
};

export const formatDDMMYYYYHHmmSS = (inputDate: Date | number) => {
    return moment(inputDate).format('YYYY-MM-DD HH:mm:ss');
};

export const formatDateTimeAsAgo = (value: any) => {
    if (!value) {
        return 'a long time ago';
    }
    const timestamp = value.getTime ? value.getTime() : value;
    let time = (Date.now() - timestamp) / 1000;
    if (time < 10) {
        return 'just now';
    } else if (time < 60) {
        return 'a moment ago';
    }
    const divider = [60, 60, 24, 30, 12];
    const string = [' second', ' minute', ' hour', ' day', ' month', ' year'];
    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
        time /= divider[i];
    }
    const plural = Math.floor(time) > 1 ? 's' : '';
    return Math.floor(time) + string[i] + plural + ' ago';
};
