import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let src = [
      {
        id: 0,
        userId: '625098ee-8c90-4db8-8436-3323ee07daae',
        name: 'rice',
        date: '2016-01-15',
        diffs: ''
      },
      {
        id: 1,
        userId: '625098ee-8c90-4db8-8436-3323ee07daae',
        name: 'beans',
        date: '2016-01-13',
        diffs: '4'
      },
      {
        id: 2,
        userId: '625098ee-8c90-4db8-8436-3323ee07daae',
        name: 'lettuce',
        date: '2016-02-02',
        diffs: '8'
      },
      {
        id: 3,
        userId: '625098ee-8c90-4db8-8436-3323ee07daae',
        name: 'peanut butter',
        date: '2016-01-16',
        diffs: '4,6,8'
      }
    ];

    src.forEach((item) => this.store.createRecord('item', item));
    return this.store.findAll('item');

    // if there's a diffs value then potentially user might need that item
    let model = src.filter((item) => item.diffs);
    // check if date is old enough that we need the item
    model = model.filter((item) => {
      return this.checkDates(item);
    });

    return model;
  },

  getPurchaseDiff(string) {
    return string.split(',').reduce((prev, cur) => {
      return (1 * prev) + (1 * cur);
    });
  },

  getDaysDiff(date1, date2) {
    return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
  },

  checkDates(item) {
    // get average number of days between purchases of item
    let diff = this.getPurchaseDiff(item.diffs);
    let now = new Date();
    let lastPurchasePoint = new Date(item.date);
    let numDaysSincePurchase = this.getDaysDiff(lastPurchasePoint, now);

    if (numDaysSincePurchase - 1 >= diff) {
      return true;
    }

    return false;
  },

  beforeModel() {
    if (this.get('session').content.isAuthenticated) {
      this.transitionTo('index');
    }
  }
});
