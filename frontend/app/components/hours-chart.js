import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
    classNames: ['chart-container'],

    hours: Ember.computed('activities.@each.{readFlag}', function() {
        var labels = [],
            counts = [];
        for (var i=0; i<24; i++) {
            var s = '';
            if (i < 10) { s += '0'; }
            labels.push(s + i);
            counts.push(0);
        }
        this.get('activities').forEach((act) => {
            var s = moment(act.get('start_time'));
            var e = moment(act.get('end_time'));
                //sh = s.format('HH'),
                //eh = e.format('HH');
            var run = true;
            while (run) {
                var end_of_hour = moment(s).endOf('hour');
                
                if (end_of_hour > e) {
                    end_of_hour = e;
                    run = false;
                }
                
                var i = labels.indexOf(s.format('HH'));
                counts[i] += moment.duration(end_of_hour - s).asMilliseconds();
                s = end_of_hour.add(1, 'second');
            }
        });
        var data = counts.map((n) => n / 1000 / 60 / 60),
            colours = labels.map(() => '#5ab0ee');
        return {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colours
            }]
        };
    }),

    options: {
        legend: { display: false },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'hours'
                }
            }],
            xAxes: [{
                ticks: {
                    autoSkip: false
                }
            }]
        }
    }
});
