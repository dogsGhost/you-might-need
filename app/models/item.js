import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('string'),
  diffs: DS.attr('string'),
  name: DS.attr('string'),
  userId: DS.attr('string'),

  // calculate number of days between current date and last purchase date of item
  daysSinceLastPurchase: Ember.computed('date', function () {
    let lastPurchase = new Date(this.get('date'));
    let now = new Date();
    return Math.round((now - lastPurchase) / (1000 * 60 * 60 * 24));
  }),

  // calculate average number of days between purchases of item
  averageDaysBetweenPurchases: Ember.computed('diffs', function () {
    return this.get('diffs').split(',').reduce((prev, cur) => {
      return (1 * prev) + (1 * cur);
    });
  }),

  // determine if the number of days since last purchase of item is
  // greater than or equal to the average number of days between purchase of an item
  mightBeNeeded: Ember.computed(
    'daysSinceLastPurchase',
    'averageDaysBetweenPurchases',
    function () {
      let daysSince = this.get('daysSinceLastPurchase');
      let avgDiff = this.get('averageDaysBetweenPurchases');
      return daysSince >= avgDiff ? true : false;
    }
  )
});
