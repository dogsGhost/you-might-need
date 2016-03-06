import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:home/add', 'Unit | Controller | home/add', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checkIfItemExists', function(assert) {
  assert.expect(7);
  let controller = this.subject();

  controller.set('model', Ember.ArrayProxy.create({
    content: [
      Ember.Object.create({name: 'rice'})
    ]
  }));

  assert.ok(controller.checkIfItemExists('rice', 'exact match'));
  assert.ok(controller.checkIfItemExists('rice   ', 'extra space at end'));
  assert.ok(controller.checkIfItemExists('  rice', 'extra space at start'));
  assert.ok(controller.checkIfItemExists('  rice   ', 'extra space at end and start'));
  assert.notOk(controller.checkIfItemExists('ri  ce', 'extra space between characters'));
  assert.notOk(controller.checkIfItemExists('ri  ce  ', 'extra spac at end and between characters'));
  assert.notOk(controller.checkIfItemExists('beans', 'mismatch'));
});

test('filteredItemNames', function(assert) {
  assert.expect(8);
  let controller = this.subject();

  controller.set('model', Ember.ArrayProxy.create({
    content: [
      Ember.Object.create({name: 'rice'}),
      Ember.Object.create({name: 'ravioli'}),
      Ember.Object.create({name: 'beans'}),
      Ember.Object.create({name: 'black beans'}),
      Ember.Object.create({name: 'chocolate'}),
      Ember.Object.create({name: 'cheese'})
    ]
  }));

  controller.set('itemName', 'r');
  let results = controller.get('filteredItemNames');
  assert.strictEqual(results[0].name, 'rice');
  assert.strictEqual(results[1].name, 'ravioli');

  controller.set('itemName', 'bean');
  results = controller.get('filteredItemNames');
  assert.strictEqual(results[0].name, 'beans');
  assert.strictEqual(results[1].name, 'black beans');

  controller.set('itemName', 's');
  results = controller.get('filteredItemNames');
  assert.strictEqual(results[0].name, 'beans');
  assert.strictEqual(results[1].name, 'black beans');
  assert.strictEqual(results[2].name, 'cheese');

  controller.set('itemName', 'te');
  results = controller.get('filteredItemNames');
  assert.strictEqual(results[0].name, 'chocolate');
});


test('action: addItem', function(assert) {
  let controller = this.subject();

  controller.set('itemName', 'rice');
  controller.set('model', Ember.ArrayProxy.create({
    content: [
      Ember.Object.create({name: 'rice'}),
      Ember.Object.create({name: 'ravioli'}),
      Ember.Object.create({name: 'beans'}),
      Ember.Object.create({name: 'black beans'}),
      Ember.Object.create({name: 'chocolate'}),
      Ember.Object.create({name: 'cheese'})
    ]
  }));

  controller.send('addItem');
  assert.ok(true, 'new item'); // TODO

  controller.set('itemName', 'salsa');
  controller.send('addItem');
  assert.ok(true, 'existing item'); // TODO
});
