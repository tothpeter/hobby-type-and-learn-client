import DS from 'ember-data';

export default DS.Model.extend({
  sideA: DS.attr(),
  sideB: DS.attr(),
  rating: DS.attr('number'),

  user: DS.belongsTo('user'),
  labels: DS.hasMany('label', { async: true }),
});
