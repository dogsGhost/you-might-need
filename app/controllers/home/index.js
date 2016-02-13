import Ember from 'ember';
import daysBetweenDates from 'you-might-need/utils/utility-days-between-dates';

export default Ember.Controller.extend({
  // set to current date in route, can be changed by user
  curDate: '',

  hasHidden: false,

  mightBeNeeded: Ember.computed(
    'curDate',
    'model.@each.isHidden',
    'model.@each.diffs',
    function() {
      return this.get('model').filter((item) => {
        let curDate, daysSince;
        // don't show items with only one purchase point
        // or items that are hidden
        if (!item.get('diffs') || item.get('isHidden')) { return false; }
        // determine if the number of days since last purchase of item is
        // greater than or equal to the average number of days between purchase of an item
        curDate = new Date(this.get('curDate'));
        daysSince = daysBetweenDates(new Date(item.get('date')), curDate);
        return daysSince >= item.get('avgNumOfDays');
      });
    }
  ),

  actions: {
    hideItem(item) {
      item.set('isHidden', true);
      // This will cause our 'unhide all' button to render in template
      this.set('hasHidden', true);
    },

    unhideAll() {
      // set all items isHidden property to false
      this.get('model').setEach('isHidden', false);

      // toggle hasHidden to hide the button that triggered this function call
      this.set('hasHidden', false);
    }
  }
});
