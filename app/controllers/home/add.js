import Ember from 'ember';

export default Ember.Controller.extend({
  itemDate: '',
  itemName: '',
  maxDate: '',
  showList: false,

  // Returns false if no match found otherwise returns matching item
  checkIfItemExists(string) {
    let exists = false;
    this.get('model').forEach((item) => {
      let name = item.get('name');
      if (string.toLowerCase().trim() === name.toLowerCase()) { exists = item; }
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
    focusFirstListItem() {
      this.set('showList', true);
    },

    listItemActions(item) {
      this.set('itemName', item.get('name'));
      this.set('showList', false);
    },

    addItem() {
      // TODO validate fields
      const name = this.get('itemName').trim();
      let item = this.checkIfItemExists(name);
      const newDate = this.get('itemDate');

      // if entry exists, update that record
      if (item) {
        this.updateExistingItem(item, newDate);
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
