import Ember from 'ember';
import formatDate from '../../utils/utility-format-date';

export default Ember.Route.extend({
  setupController(controller, model) {
    controller.set('model', model);
    controller.set('curDate', formatDate(new Date()));
  }
});
