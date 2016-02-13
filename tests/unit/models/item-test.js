import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('item', 'Unit | Model | item', {
  unit: true
});

const item = {
  date: '2016-02-07',
  diffs: '',
  name: 'rice',
  userId: 0
};

test('avgNumOfDays', function(assert) {
  let model = this.subject(item);

  assert.expect(4);
  // no diffs returns false
  assert.strictEqual(model.get('avgNumOfDays'), false, 'The average is false');

  Ember.run(() => {
    model.set('diffs', '3,');
  });
  assert.equal(model.get('avgNumOfDays'), 3, 'The average is 3');

  Ember.run(() => {
    model.set('diffs', '3,5,');
  });
  assert.equal(model.get('avgNumOfDays'), 4, 'The average is 4');

  Ember.run(() => {
    model.set('diffs', '5,3,7,');
  });
  assert.equal(model.get('avgNumOfDays'), 5, 'The average is 5');
});
