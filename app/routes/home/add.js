import Ember from 'ember';
import formatDate from '../../utils/utility-format-date';

export default Ember.Route.extend({
  setupController(controller, model) {
    const date = formatDate(new Date());

    controller.set('model', model);
    // Set max date for datepicker to current date
    controller.set('maxDate', date);
    // Set default date for date picker to current date
    controller.set('itemDate', date);
  },

  actions: {

  }
});
