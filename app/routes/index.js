import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let sessionContent = this.get('session').content;
    if (sessionContent.isAuthenticated) {
      // return this.store.find('item', {
      //   orderBy: 'userId',
      //   equalTo: sessionContent.uid
      // });
      return [];
    } else {
    }
  },

  actions: {
    signIn(email, password) {
      this
        .get('session')
        .open('firebase', {
          provider: 'password',
          email,
          password
        });
        // .then((data) => {
        //   console.log(data);
        // });
    }
  }
});
