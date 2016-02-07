import Ember from 'ember';

export default Ember.Controller.extend({
  hasHidden: false,

  hidden: Ember.computed.filterBy('model', 'isHidden', true),

  actions: {
    hideItem(item) {
      item.set('isHidden', true);
      // This will cause our 'unhide all' button to render in template
      this.set('hasHidden', true);
    },

    unhideAll() {
      // set all items isHidden property to false
      this.get('hidden').setEach('isHidden', false);

      // toggle hasHidden to hide the button that triggered this function call
      this.set('hasHidden', false);
    }
  }
});
