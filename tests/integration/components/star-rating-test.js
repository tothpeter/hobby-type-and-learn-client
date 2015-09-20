import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('star-rating', 'Integration | Component | star rating', {
  integration: true
});

test('Renders the full and empty stars correctly', function(assert) {
  assert.expect(6);
  
  var card = Ember.Object.create({ proficiencyLevel: 4 });
  this.set('card', card);
  this.set('maxRating', 5);
  
  this.render(hbs`{{star-rating item=card rating=card.proficiencyLevel maxRating=maxRating}}`);
  
  assert.equal(this.$('.glyphicon-star').length, 4, "The right amount of full stars is rendered");
  assert.equal(this.$('.glyphicon-star-empty').length, 1, "The right amount of empty stars is rendered");
  
  this.set('maxRating', 10);
  
  assert.equal(this.$('.glyphicon-star').length, 4, "The right amount of full stars is rendered after changing maxRating");
  assert.equal(this.$('.glyphicon-star-empty').length, 6, "The right amount of empty stars is rendered after changing maxRating");
  
  this.set('card.proficiencyLevel', 2);
  
  assert.equal(this.$('.glyphicon-star').length, 2, "The right amount of full stars is rendered after changing rating");
  assert.equal(this.$('.glyphicon-star-empty').length, 8, "The right amount of empty stars is rendered after changing rating");
});