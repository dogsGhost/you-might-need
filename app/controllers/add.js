import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addItem() {
      const obj = {
        name: this.get('name'),
        date: this.get('date')
      };

      return obj;
    }
  }
});
