import Ember from 'ember';

export default Ember.Route.extend({
  hidden: Ember.computed.filterBy('model', 'isHidden', true),

  actions: {
    hideItem(item) {
      item.set('isHidden', true);
      this.controller.set('hasHidden', true);
    },

    unhideAll() {
      // set all items isHidden property to false

      // toggle hasHidden to hide the button that triggered this function call
      // this.controller.set('hasHidden', false);
    }
  }
});
