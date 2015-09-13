import Ember from 'ember';
import Pretender from 'pretender';
import { module, test } from 'qunit';
import startApp from 'type-and-learn-client/tests/helpers/start-app';

var application,
    server;

module('Acceptance | session', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('simple login', function(assert) {
  server = new Pretender(function() {
    this.post('sessions', function() {
      var expectedResponseData = {"token":"XJ4MmH2f5fkj3Lc9E19G","email":"tothpeter08@gmail.com","user":{"data":{"id":"1","type":"users","attributes":{"email":"tothpeter08@gmail.com"},"relationships":{"labels":{"data":[{"type":"labels","id":"2"},{"type":"labels","id":"1"},{"type":"labels","id":"37"}]}}},"included":[{"id":"2","type":"labels","attributes":{"title":"label 2","position":0,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}},{"id":"1","type":"labels","attributes":{"title":"asd","position":2,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}},{"id":"37","type":"labels","attributes":{"title":"asd12","position":null,"user_id":2},"relationships":{"user":{"data":{"type":"users","id":"2"}}}}]}};

      return [200, {"Content-Type": "application/json"}, JSON.stringify(expectedResponseData)];
    });
  });

  visit('/profile');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });

  fillIn('input[name=email]', 'hello@kalina.tech');
  fillIn('input[name=password]', '12345678');
  click('button[type=submit]');

  andThen(function() {
    assert.equal(currentURL(), '/profile');
  });
});
