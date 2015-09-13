import Ember from 'ember';
import Pretender from 'pretender';
import { module, test } from 'qunit';
import startApp from 'type-and-learn-client/tests/helpers/start-app';

var application,
    server;

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
    this.get('current_user', function() {
      var expectedResponseData = {"data":{"id":"2","type":"users","attributes":{"email":"tothpeter08@gmail.com"},"relationships":{"labels":{"data":[{"type":"labels","id":"2"},{"type":"labels","id":"1"},{"type":"labels","id":"37"}]}}},"included":[{"id":"2","type":"labels","attributes":{"title":"label 2","position":0,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}},{"id":"1","type":"labels","attributes":{"title":"asd","position":2,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}},{"id":"37","type":"labels","attributes":{"title":"asd12","position":null,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}}]};

      return [200, {"Content-Type": "application/json"}, JSON.stringify(expectedResponseData)];
    });
  });

  authenticateSession();

  visit('/profile');

  andThen(function() {
    assert.equal(currentURL(), '/profile');
    assert.equal(find('.list-group-item:contains("label 2")').length, 1, "Displays existing label in the list");
  });

});


test('create new label', function(assert) {
  server = new Pretender(function() {
    this.get('current_user', function() {
      var expectedResponseData = {"data":{"id":"2","type":"users","attributes":{"email":"tothpeter08@gmail.com"},"relationships":{"labels":{"data":[{"type":"labels","id":"2"},{"type":"labels","id":"1"},{"type":"labels","id":"37"}]}}},"included":[{"id":"2","type":"labels","attributes":{"title":"label 2","position":0,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}},{"id":"1","type":"labels","attributes":{"title":"asd","position":2,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}},{"id":"37","type":"labels","attributes":{"title":"asd12","position":null,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}}]};

      return [200, {"Content-Type": "application/json"}, JSON.stringify(expectedResponseData)];
    });

    this.post('labels', function() {
      var expectedResponseData = {"data":{"id":"38","type":"labels","attributes":{"title":"Test Label Title","position":null,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}}};

      return [201, {"Content-Type": "application/json"}, JSON.stringify(expectedResponseData)];
    });
  });

  authenticateSession();

  visit('/profile');
  click('.list-group > button');

  fillIn('.modal-dialog input', 'Test Label Title');
  click('button:contains("OK")');

  andThen(function() {
    assert.equal(find('.list-group-item:contains("Test Label Title")').length, 1, "Displays newly created label in the list");
  });
});