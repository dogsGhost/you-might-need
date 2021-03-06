import Ember from 'ember';
import daysBetweenDates from '../utils/utility-days-between-dates';
import formatDate from '../utils/utility-format-date';

export default Ember.Route.extend({
  beforeModel() {
    if (!this.get('session').content.isAuthenticated) {
      this.transitionTo('index');
    }
  },

  model() {
    return this.store.query('item', {
      orderBy: 'userId',
      equalTo: this.get('session').get('uid')
    });
  },

  updateExistingItem(item, date) {
    const oldDiff = item.get('diffs');
    const oldDate = item.get('date');
    const daysDiff = daysBetweenDates(new Date(oldDate), new Date(date));

    // if daysDiff is negative then oldDate is more recent
    if (daysDiff > -1) { item.set('date', date); }
    // add new diff to diffs string
    item.set('diffs', `${oldDiff}${Math.abs(daysDiff)},`);
  },

  actions: {
    updateItem(item) {
      const newDate = formatDate(new Date());
      this.updateExistingItem(item, newDate);
      // save to db
      item.save()
        .then(() => {
          // TODO: on page alert that save was successful
        })
        .catch((err) => {
          // TODO: on page alert there was an issue with the save
          // issue saving record
          console.log(err);
        });
    }
  }
});
