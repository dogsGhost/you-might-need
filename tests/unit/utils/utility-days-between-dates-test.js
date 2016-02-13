import daysBetweenDates from '../../../utils/utility-days-between-dates';
import { module, test } from 'qunit';

module('Unit | Utility | utility days between dates');

test('it finds the number of dates between two dates', function(assert) {
  let result = daysBetweenDates(new Date('2016-02-01'), new Date('2016-02-07'));

  assert.expect(2);
  assert.equal(result, 6, 'the dates are 6 days apart');

  result = daysBetweenDates(new Date('2016-02-08'), new Date('2016-02-07'));
  assert.strictEqual(result, -1, 'the dates are 1 days apart');
});
