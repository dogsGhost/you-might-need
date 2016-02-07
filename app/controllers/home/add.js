import Ember from 'ember';

export default Ember.Controller.extend({
  itemDate: '',

  maxDate: '',

  actions: {
    addItem() {
      let item = {
        name: this.get('itemName'),
        date: this.get('itemDate'),
        userId: this.get('session').content.uid
      };

      console.log(item);
    },

    closeAddView() {
      this.set('itemName', '');
      this.set('itemDate', '');
      this.transitionToRoute('home');
    }
  }
});
