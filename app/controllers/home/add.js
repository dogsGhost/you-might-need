import Ember from 'ember';
import daysBetweenDates from '../../utils/utility-days-between-dates';

export default Ember.Controller.extend({
  itemDate: '',
  itemName: '',
  maxDate: '',

  // Returns false if no match found otherwise returns matching item
  checkIfItemExists(string) {
    let exists = false;
    const model = this.get('model');
    model.forEach((item) => {
      let name = item.get('name');
      if (string.toLowerCase() === name.toLowerCase()) { exists = item; }
    });

    return exists;
  },

  filteredItemNames: Ember.computed('itemName', function() {
    const itemName = this.get('itemName');
    const model = this.get('model');
    const regex = new RegExp(itemName, 'i');

    if (!itemName) { return []; }
    return model.filter((item) => {
      return regex.test(item.get('name'));
    });
  }),

  actions: {
    addItem() {
      // TODO validate fields

      let item = this.checkIfItemExists(this.get('itemName'));
      const newDate = this.get('itemDate');

      // if entry exists, update that record
      if (item) {
        const oldDiff = item.get('diffs');
        const oldDate = item.get('date');
        let daysDiff = daysBetweenDates(new Date(oldDate), new Date(newDate));

        // if daysDiff is negative then oldDate is more recent
        if (daysDiff > -1) { item.set('date', newDate); }
        // add new diff to diffs string
        item.set('diffs', `${oldDiff}${Math.abs(daysDiff)},`);
      } else {
        // add new record to store
        item = this.store.createRecord('item', {
          name: this.get('itemName'),
          date: newDate,
          userId: this.get('session').get('uid')
        });
      }

      // save to db
      item.save()
        .then((record) => {
          // TODO: on page alert that save was successful

          // clear fields
          this.set('itemName', '');
          this.set('itemDate', '');
        })
        .catch((err) => {
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
