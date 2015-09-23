import Ember from 'ember';
import Pretender from 'pretender';
import { module, test } from 'qunit';
import startApp from 'type-and-learn-client/tests/helpers/start-app';
import httpStubs from '../helpers/http-stubs';

var application,
    server,
    currentUserData = {"data":{"id":"2","type":"users","attributes":{"email":"tothpeter08@gmail.com"},"relationships":{"labels":{"data":[{"type":"labels","id":"2"},{"type":"labels","id":"1"},{"type":"labels","id":"37"}]}}},"included":[{"id":"2","type":"labels","attributes":{"title":"label 2","position":0,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}},{"id":"1","type":"labels","attributes":{"title":"asd","position":2,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}},{"id":"37","type":"labels","attributes":{"title":"asd12","position":null,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}}]};

module('Acceptance | labels', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('visiting /profile', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubGetCurrentUser(this, currentUserData);

    this.get('cards', function() {
      var expectedResponseData = {"data":[{"id":"65","type":"cards","attributes":{"side-a":"aaaaaa","side-b":"a","proficiency-level":3},"relationships":{"user":{"data":{"type":"users","id":"2"}},"labels":{"data":[]}}},{"id":"63","type":"cards","attributes":{"side-a":"a","side-b":"a","proficiency-level":2},"relationships":{"user":{"data":{"type":"users","id":"2"}},"labels":{"data":[{"type":"labels","id":"2"},{"type":"labels","id":"1"}]}}}],"links":{"self":"http://type-and-learn-api.dev/cards?page%5Bnumber%5D=1\u0026page%5Bsize%5D=2","next":"http://type-and-learn-api.dev/cards?page%5Bnumber%5D=2\u0026page%5Bsize%5D=2","last":"http://type-and-learn-api.dev/cards?page%5Bnumber%5D=4\u0026page%5Bsize%5D=2"},"meta":{"current-page":1,"next-page":2,"prev-page":null,"total-pages":4,"total-count":8}};

      return [200, {"Content-Type": "application/json"}, JSON.stringify(expectedResponseData)];
    });
  });

  authenticateSession();

  visit('/profile');

  andThen(function() {
    assert.equal(currentURL(), '/profile');
    assert.equal(find('.list-group-item:contains("label 2")').length, 1, "Displays existing label in the list");
    assert.equal(find('.card-list-item.ui-droppable').length, 2, "Displays the first 2 cards of all on the right");
  });

});


test('create new label', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubGetCurrentUser(this, currentUserData);

    this.get('cards', function() {
      var expectedResponseData = {"data":[{"id":"65","type":"cards","attributes":{"side-a":"aaaaaa","side-b":"a","proficiency-level":3},"relationships":{"user":{"data":{"type":"users","id":"2"}},"labels":{"data":[]}}},{"id":"63","type":"cards","attributes":{"side-a":"a","side-b":"a","proficiency-level":2},"relationships":{"user":{"data":{"type":"users","id":"2"}},"labels":{"data":[{"type":"labels","id":"2"},{"type":"labels","id":"1"}]}}}],"links":{"self":"http://type-and-learn-api.dev/cards?page%5Bnumber%5D=1\u0026page%5Bsize%5D=2","next":"http://type-and-learn-api.dev/cards?page%5Bnumber%5D=2\u0026page%5Bsize%5D=2","last":"http://type-and-learn-api.dev/cards?page%5Bnumber%5D=4\u0026page%5Bsize%5D=2"},"meta":{"current-page":1,"next-page":2,"prev-page":null,"total-pages":4,"total-count":8}};

      return [200, {"Content-Type": "application/json"}, JSON.stringify(expectedResponseData)];
    });

    this.post('labels', function() {
      var expectedResponseData = {"data":{"id":"38","type":"labels","attributes":{"title":"Test Label Title","position":null,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}}};

      return [201, {"Content-Type": "application/json"}, JSON.stringify(expectedResponseData)];
    });
  });

  authenticateSession();

  visit('/profile');
  click('.btn-add-new-label');

  fillIn('.modal-dialog input', 'Test Label Title');
  click('button:contains("OK")');

  andThen(function() {
    assert.equal(find('.list-group-item:contains("Test Label Title")').length, 1, "Displays newly created label in the list");
  });
});


test('edit existing label', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubGetCurrentUser(this, currentUserData);

    this.get('cards', function() {
      var expectedResponseData = {"data":[{"id":"65","type":"cards","attributes":{"side-a":"aaaaaa","side-b":"a","proficiency-level":3},"relationships":{"user":{"data":{"type":"users","id":"2"}},"labels":{"data":[]}}},{"id":"63","type":"cards","attributes":{"side-a":"a","side-b":"a","proficiency-level":2},"relationships":{"user":{"data":{"type":"users","id":"2"}},"labels":{"data":[{"type":"labels","id":"2"},{"type":"labels","id":"1"}]}}}],"links":{"self":"http://type-and-learn-api.dev/cards?page%5Bnumber%5D=1\u0026page%5Bsize%5D=2","next":"http://type-and-learn-api.dev/cards?page%5Bnumber%5D=2\u0026page%5Bsize%5D=2","last":"http://type-and-learn-api.dev/cards?page%5Bnumber%5D=4\u0026page%5Bsize%5D=2"},"meta":{"current-page":1,"next-page":2,"prev-page":null,"total-pages":4,"total-count":8}};

      return [200, {"Content-Type": "application/json"}, JSON.stringify(expectedResponseData)];
    });

    this.patch('labels/2', function() {
      var expectedResponseData = {"data":{"id":"2","type":"labels","attributes":{"title":"New Label Title","position":null,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}}};

      return [201, {"Content-Type": "application/json"}, JSON.stringify(expectedResponseData)];
    });
  });

  authenticateSession();

  visit('/profile');
  click('.btn-edit-label');

  fillIn('.modal-dialog input', 'New Label Title');
  click('button:contains("OK")');

  andThen(function() {
    assert.equal(find('.list-group-item:contains("New Label Title")').length, 1, "Displays newly created label in the list");
  });
});