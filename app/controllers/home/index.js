import Ember from 'ember';

export default Ember.Controller.extend({
  hasHidden: false,

  notHidden: Ember.computed('model.@each.isHidden', function () {
    return this.get('model').filterBy('isHidden', false);
  }),

  actions: {
    hideItem(item) {
      item.set('isHidden', true);
      // This will cause our 'unhide all' button to render in template
      this.set('hasHidden', true);
    },

    unhideAll() {
      // set all items isHidden property to false
      this.get('model').setEach('isHidden', false);

      // toggle hasHidden to hide the button that triggered this function call
      this.set('hasHidden', false);
    }
  }
});
