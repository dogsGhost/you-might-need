import Ember from 'ember';

export default Ember.Controller.extend({
  hasHidden: false,

  hidden: Ember.computed.filterBy('model', 'isHidden', true),

  actions: {
    hideItem(item) {
      item.set('isHidden', true);
      this.set('hasHidden', true);
    },

    unhideAll() {
      // set all items isHidden property to false
      this.get('hidden').forEach((item) => {
        item.set('isHidden', false);
      });

      // toggle hasHidden to hide the button that triggered this function call
      this.set('hasHidden', false);
    }
  }
});
