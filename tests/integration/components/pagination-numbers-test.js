import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('pagination-numbers', 'Integration | Component | pagination numbers', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  this.set('meta', { 'current-page':1, 'next-page':2, 'prev-page':null, 'total-pages':4, 'total-count':8 });

  this.render(hbs`{{pagination-numbers meta=meta}}`);

  assert.equal(this.$('li').eq(0).hasClass('disabled'), true, 'The prev btn should be disabled (we are on the first page)');
  assert.equal(this.$('li').eq(1).hasClass('active'), true, 'The first number should be active (we are on the first page)');
  assert.equal(/1234/.test(this.$().text().replace(/\s/g, '')), true, '4 page buttons hould be visible (there are 4 pages)');
});
