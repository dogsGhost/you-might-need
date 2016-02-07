import Ember from 'ember';
import DS from 'ember-data';
import daysBetweenDates from '../utils/utility-days-between-dates';

export default DS.Model.extend({
  date: DS.attr('string'),
  diffs: DS.attr('string', {defaultValue: ''}),
  name: DS.attr('string'),
  userId: DS.attr('string'),

  // calculate number of days between current date and last purchase date of item
  daysSinceLastPurchase: Ember.computed('date', function () {
    return daysBetweenDates(new Date(this.get('date')), new Date());
  }),

  // calculate average number of days between purchases of item
  averageDaysBetweenPurchases: Ember.computed('diffs', function () {
    const diffArray = this.get('diffs').split(',');
    const total = diffArray.reduce((prev, cur) => {
      return (1 * prev) + (1 * cur);
    });

    return Math.round(total / diffArray.length);
  }),

  // determine if the number of days since last purchase of item is
  // greater than or equal to the average number of days between purchase of an item
  mightBeNeeded: Ember.computed(
    'daysSinceLastPurchase',
    'averageDaysBetweenPurchases',
    function () {
      if (!this.get('diffs')) { return false; }
      let daysSince = this.get('daysSinceLastPurchase');
      let avgDiff = this.get('averageDaysBetweenPurchases');
      return daysSince >= avgDiff ? true : false;
    }
  )
});
