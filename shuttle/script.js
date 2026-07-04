//hmvalue is the value (number) of time expressed the format of hhmm. E.g. "17:55" is expressed as "1755".
/* Destinations are OD indexed. UST: 1, TKO:2, DH: 3.
Schedule are declared as arrays below */
var shuttleToTKO_hmvalue = [1755, 1805, 1810, 1815, 1820, 1825, 1835, 1845, 1855 , 1910]; //HKUST to TKO index: 12
var shuttleToDH_hmvalue = [1755, 1805, 1810, 1815, 1820, 1825, 1835, 1845, 1855 , 1910]; //HKUST to DH index: 13
var shuttleFromTKO_hmvalue = [0810, 0815, 0820, 0825, 0830, 0835, 0840, 0845, 0855, 0905]; //HKUST to DH index: 21
var shuttleFromDH_hmvalue = [0810, 0815, 0820, 0825, 0830, 0835, 0840, 0845, 0855, 0905]; //HKUST to DH index: 31

var servicePeriod = [{start: 903, end: 1220}, {start: 130, end: 529}];
var holiday = [925, 1001, 1017, 205, 206, 207, 405, 419, 422, 501, 513]

function showTwoSchedules(od1,od2) {
    showSchedule(od1,1);
    showSchedule(od2,2);
}
var alerted = false;

function showSchedule(destination_index, table_index) {
    var time_now = new Date//(2018,(-1+ 10),15,8,05);
    console.log(time_now);

    if (inServicePeriod(time_now)) {
        switch (destination_index) {
            case 21:
            var shuttleSelected_hmvalue = shuttleFromTKO_hmvalue;
            var origin = "Tseung Kwan O";
            var destination = "HKUST"
            break;
    
            case 31:
            var shuttleSelected_hmvalue = shuttleFromDH_hmvalue;
            var origin = "Diamond Hill";
            var destination = "HKUST"
            break;
    
            case 12:
            var shuttleSelected_hmvalue = shuttleToTKO_hmvalue;
            var origin = "HKUST";
            var destination = "Tseung Kwan O"
            break;
    
            case 13:
            var shuttleSelected_hmvalue = shuttleToDH_hmvalue;
            var origin = "HKUST";
            var destination = "Diamond Hill"
            
            break;
    
            default:
            
        }

        document.getElementById("t" + table_index.toString() + "_od_text").innerHTML = "From " + origin + " to " + destination

        var time_now_hmvalue = time_now.getHours() * 100 + time_now.getMinutes();
        document.getElementById("last_update").innerHTML= toTimeTextFormat(time_now_hmvalue);
    
        var shuttle_matched_text = []; //array of suitable shuttles in text format
        var ss_index =0; //shuttle_matched_text array index
        for (i=0; i<shuttleSelected_hmvalue.length; i++) {
            if (time_now_hmvalue == shuttleSelected_hmvalue[i]) {
                shuttle_matched_text[ss_index] = "Departing";
                ss_index++
            }
            else if (time_now_hmvalue < shuttleSelected_hmvalue[i]) {
                shuttle_matched_text[ss_index] = toTimeTextFormat(shuttleSelected_hmvalue[i]);
                ss_index++;
            }
        }
    
        for (i=0; i<4;i++) {
            if (shuttle_matched_text[i] != null){
                document.getElementById("t" + table_index.toString() + "_s" + (i+1).toString() + "_des").innerHTML = destination;
                document.getElementById("t" + table_index.toString() + "_s" + (i+1).toString() + "_time").innerHTML = shuttle_matched_text[i];
            }
            else if (shuttle_matched_text[i] == null) {
                if (i == 0){
                    if (alerted==false)
                    {alert("The last shuttle bus has departed");
                    alerted = true;}
                }
                document.getElementById("t" + table_index.toString() + "_s" + (i+1).toString() + "_des").innerHTML = "-";
                document.getElementById("t" + table_index.toString() + "_s" + (i+1).toString() + "_time").innerHTML = "-";
            }
        }
    } else {
        if (alerted==false){
        alert("Shuttle bus service is suspended today!");
        alerted = true;
        }
    }
}

function toTimeTextFormat (t) {
    var hText
    var mText
    if (t/100 < 10) {
        hText = "0" + parseInt(t/100)
    } else {
        hText = parseInt(t/100)
    }
    if (t%100 <10) {
        mText = "0" + (t%100).toString()
    } else {
        mText = (t%100).toString()
    }
    return hText + ":" + mText;
}

function inServicePeriod(date_para) {
    var formattedDate = (date_para.getMonth() +1) * 100 + date_para.getDate(); //date in number in mmdd
    var weekday = date_para.getDay() != 0 && date_para.getDay() != 6; //check whether the sate is a weekday
    var inPeriod = (formattedDate >= servicePeriod[0].start && formattedDate <= servicePeriod[0].end) || (formattedDate >= servicePeriod[1].start && formattedDate <= servicePeriod[1].end);
    var notHoliday = !(holiday.includes(formattedDate));
    if (weekday && inPeriod && notHoliday){
        return true;
    } else {
        return false;
    }
}