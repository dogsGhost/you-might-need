import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('string'),
  diffs: DS.attr('string', {defaultValue: ''}),
  name: DS.attr('string'),
  userId: DS.attr('string'),

  isHidden: false,

  // calculate average number of days between purchases of item
  avgNumOfDays: Ember.computed('diffs', function () {
    let diffArray, total;
    if (!this.get('diffs')) { return false; }
    diffArray = this.get('diffs').split(',');
    total = diffArray.reduce((prev, cur) => {
      return (1 * prev) + (1 * cur);
    });
    // remove 1 from length to account for extra comma at end of string
    return Math.round(total / (diffArray.length - 1));
  })
});
