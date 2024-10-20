import ballerina/lang.'int as langInt;
import ballerina/time;

public type Date record {|
    int year;
    int month;
    int day;
|};

public type Time record {|
    int hours;
    int minutes;
|};

public function stringToDate(string date) returns Date|error {
    string:RegExp r = re`-`;
    string[] dateArray = r.split(date);
    Date dateRecord = {
        year: check langInt:fromString(dateArray[0]), 
        month: check langInt:fromString(dateArray[1]), 
        day: check langInt:fromString(dateArray[2])
    };
    return dateRecord;
}

public function dateToString(Date date) returns string {
    return string:concat(date.year.toString(), "-", date.month.toString(), "-", date.day.toString());
}

public function today() returns Date {
    time:Utc timeNow = time:utcNow();
    
    time:Civil timeCivil = time:utcToCivil(timeNow);

    Date dateRecord = {
        year: timeCivil.year,
        month: timeCivil.month,
        day: timeCivil.day
    };

    return dateRecord;    
}

public function timeNow() returns Time {
    time:Utc timeNow = time:utcNow();
    time:Civil timeCivil = time:utcToCivil(timeNow);

    Time timeRecord = {
        hours: timeCivil.hour,
        minutes: timeCivil.minute
    };

    return timeRecord;
}

public function isDateAfter(Date date1, Date date2) returns boolean {
    if (date1.year > date2.year) {
        return true;
    } else if (date1.year == date2.year && date1.month > date2.month) {
        return true;
    } else if (date1.year == date2.year && date1.month == date2.month && date1.day > date2.day) {
        return true;
    }
    return false;
}

public function stringToTime(string time) returns Time|error {
    string:RegExp r = re`:`;
    string[] timeArray = r.split(time);
    Time timeRecord = {
        hours: check langInt:fromString(timeArray[0]), 
        minutes: check langInt:fromString(timeArray[1])
    };
    return timeRecord;
}

public function timeToString(Time time) returns string {
    return string:concat(time.hours.toString(), ":", time.minutes.toString());
}

public function isTimeAfter(Time time1, Time time2) returns boolean {
    if (time1.hours > time2.hours) {
        return true;
    } else if (time1.hours == time2.hours && time1.minutes > time2.minutes) {
        return true;
    }
    return false;
}