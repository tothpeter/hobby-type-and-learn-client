import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  position: DS.attr('number'),

  user: DS.belongsTo('user'),
  cards: DS.hasMany('card', { async: true }),
});
