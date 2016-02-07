import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    hideItem(item) {
      item.set('isHidden', true);
      this.controller.set('hasHidden', true);
    },

    unhideAll() {
      let hidden = this.store.query('item', { isHidden: true });
      hidden.then(() => {
        console.log(hidden.get('length'));
      });
      this.controller.set('hasHidden', false);
    }
  }
});
