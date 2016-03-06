import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('route:home', 'Unit | Route | home');

test('updateExistingItem', function(assert) {
  let route = this.subject();
  let item = Ember.Object.create({
    diffs: '3,',
    date: '2016-02-01'
  });

  route.updateExistingItem(item, '2016-02-05');

  assert.strictEqual(item.get('diffs'), '3,4,');
  assert.strictEqual(item.get('date'), '2016-02-05');
});
