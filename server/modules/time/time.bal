import ballerina/lang.'int as langInt;
public type Time record {|
    int hours;
    int minutes;
|};

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