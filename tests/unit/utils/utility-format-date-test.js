import formatDate from '../../../utils/utility-format-date';
import { module, test } from 'qunit';

module('Unit | Utility | utility format date');

test('it returns a date string in ISO format', function(assert) {
  let result = formatDate(new Date()).split('-');

  assert.expect(4);
  assert.equal(result.length, 3, 'the date string has 2 dashes');
  assert.equal(result[0].length, 4, 'the first item has a length of 4');
  assert.equal(result[1].length, 2, 'the first item has a length of 2');
  assert.equal(result[2].length, 2, 'the first item has a length of 2');
});
