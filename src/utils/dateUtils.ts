// Get the name of the day of the week for a given date
export function dayOfWeek(date: Date): string {
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];
    return days[date.getDay()];
}

// Get the name of the month for a given date
export function getMonth(date: Date): string {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    return months[date.getMonth()];
}

// Get the current date in the format "Day of the week, Day Month"
export function getCurrentDate(date: Date): string {
    return dayOfWeek(date) + ", " + date.getDate() + " " + getMonth(date);
}

// Get the date in the format "Month, Day"
export function getForecastDate(date: Date): string {
    return getMonth(date) + ", " + date.getDate();
}

// Format a string to ensure it has two digits
export function formatDate(str: string): string{
    // If the string represents a number less than 10, add a leading zero
    if (parseInt(str) < 10)
        str =  ("0" + str).slice(-2);
    return str;
}

// Set the date from a string by replacing hyphens with slashes
export function setDate(date: string): Date {
    return new Date(date.replace(/-/g, '\/'));
}