import Ember from 'ember';

export function formatTimedifference([diff]/*, hash*/) {
    let d = diff.format('D'),
        h = diff.format('H'),
        m = diff.format('m'),
        s = diff.format('s');
    //var days = '',
    var    hrs = '',
        mins = '',
        secs = '';
    if (d !== '1') {
        h = parseInt(h) + (parseInt(d)-1) * 24;
    }
    if (h !== '0') {
        hrs = h;
        if (h === '1') {
            hrs += 'hr ';
        } else {
            hrs += 'hrs ';
        }
    }
    if (m !=='0') {
        mins = m;
        if (m === '1') {
            mins += 'min ';
        } else {
            mins += 'mins ';
        }
    }
    if (h == '0' && m == '0') {
        secs = s;
        if (s === '1') {
            secs += 'sec ';
        } else {
            secs += 'secs ';
        }
    }

  return hrs + mins + secs;
}

export default Ember.Helper.helper(formatTimedifference);
