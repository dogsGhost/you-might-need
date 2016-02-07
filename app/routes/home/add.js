import Ember from 'ember';

export default Ember.Route.extend({
  model() {

  },

  setupController: function(controller, model) {
    const date = this.formatDate(new Date());

    controller.set('model', model);
    // Set max date for datepicker to current date
    controller.set('maxDate', date);
    // Set default date for date picker to current date
    controller.set('itemDate', date);
  },

  // Take a date object and return a string in ISO format of the local date
  formatDate(dateObj) {
    const date = dateObj.toLocaleDateString().split('/');
    const month = date[0].length < 2 ? `0${date[0]}` : date[0];
    const day = date[1].length < 2 ? `0${date[1]}` : date[1];
    return `${date[2]}-${month}-${day}`;
  },

  actions: {

  }
});
