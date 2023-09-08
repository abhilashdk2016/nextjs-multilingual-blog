import readingTime from "reading-time";
import { DateTime } from 'luxon';

export const getReadingTime = (text: string, locale: string) => {
    const minutes = readingTime(text).minutes;
    const minutesRounded = Math.ceil(minutes);
    if(locale === "de") {
        if(minutesRounded === 1) {
            return `${minutesRounded} Minute`;
        } else {
            return `${minutesRounded} Minuten`;
        }
    } else {
        if(minutesRounded === 1) {
            return `${minutesRounded} Minute`;
        } else {
            return `${minutesRounded} Minutes`;
        }
    }
}

export const getRelativeDate = (date: string, locale: string) => {
    return DateTime.fromISO(date).setLocale(locale).toRelative();
}