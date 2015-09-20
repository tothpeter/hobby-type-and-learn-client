import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('pagination-numbers', 'Integration | Component | pagination numbers', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  this.set('meta', { 'current-page':1, 'next-page':2, 'prev-page':null, 'total-pages':4, 'total-count':8 });

  this.render(hbs`{{pagination-numbers meta=meta}}`);

  assert.equal(this.$('li').eq(0).hasClass('disabled'), true);
  assert.equal(this.$('li').eq(1).hasClass('active'), true);
  assert.equal(/1234/.test(this.$().text().replace(/\s/g, '')), true);
});
