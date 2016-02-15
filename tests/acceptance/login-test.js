/*global localStorage*/
import { test } from 'qunit';
import moduleForAcceptance from 'you-might-need/tests/helpers/module-for-acceptance';
import testingCreds from '../creds';

moduleForAcceptance('Acceptance | login', {
  afterEach: function() {
    localStorage.removeItem(testingCreds.sessionName);
  }
});

test('unsuccessful login', function(assert) {
  assert.expect(3);

  visit('/');
  click('[data-tests="loginBtn"]');

  andThen(function() {
    assert.equal(find('[data-tests="loginForm"]').length, 1, 'login form still on page');
    assert.equal(find('[data-tests="logoutBtn"]').length, 0, 'logout button is not on page');
    assert.equal(currentURL(), '/', 'url did not change');
  });
});

test('successful login', function(assert) {
  assert.expect(3);

  visit('/');
  fillIn('[data-tests="loginEmail"]', testingCreds.email);
  fillIn('[data-tests="loginPassword"]', testingCreds.password);
  click('[data-tests="loginBtn"]');

  andThen(function() {
    assert.equal(currentURL(), '/home', 'redirected to home page');
    assert.equal(find('[data-tests="youMightNeedList"]').length, 1, 'item list is on page');
    assert.equal(find('[data-tests="logoutBtn"]').length, 1, 'logout button is on page');
  });
});
