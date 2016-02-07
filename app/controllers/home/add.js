import Ember from 'ember';
import daysBetweenDates from '../../utils/utility-days-between-dates';

export default Ember.Controller.extend({
  itemDate: '',
  itemName: '',
  maxDate: '',

  // Returns false if no match found otherwise returns matching item
  checkIfItemExists(string) {
    let exists = false;
    this.get('model').forEach((item) => {
      let name = item.get('name');
      if (string.toLowerCase() === name.toLowerCase()) { exists = item; }
    });

    return exists;
  },

  // Live updates a list of item names that already exist for autocomplete purposes
  filteredItemNames: Ember.computed('itemName', function() {
    const itemName = this.get('itemName');
    const regex = new RegExp(itemName, 'i');

    if (!itemName) { return []; }
    return this.get('model').filter((item) => {
      return regex.test(item.get('name'));
    });
  }),

  actions: {
    addItem() {
      // TODO validate fields
      const name = this.get('itemName').trim();
      let item = this.checkIfItemExists(name);
      const newDate = this.get('itemDate');

      // if entry exists, update that record
      if (item) {
        const oldDiff = item.get('diffs');
        const oldDate = item.get('date');
        const daysDiff = daysBetweenDates(new Date(oldDate), new Date(newDate));

        // if daysDiff is negative then oldDate is more recent
        if (daysDiff > -1) { item.set('date', newDate); }
        // add new diff to diffs string
        item.set('diffs', `${oldDiff}${Math.abs(daysDiff)},`);
      } else {
        // add new record to store
        item = this.store.createRecord('item', {
          name,
          date: newDate,
          userId: this.get('session').get('uid')
        });
      }

      // save to db
      item.save()
        .then(() => {
          // TODO: on page alert that save was successful

          // clear fields
          this.set('itemName', '');
          this.set('itemDate', '');
        })
        .catch((err) => {
          // TODO: on page alert there was an issue with the save
          // issue saving record
          console.log(err);
        });
    },

    closeAddView() {
      this.set('itemName', '');
      this.set('itemDate', '');
      this.transitionToRoute('home');
    }
  }
});
