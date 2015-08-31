import DS from 'ember-data';

export default DS.Model.extend({
  sidA: DS.attr(),
  sideB: DS.attr(),
  rating: DS.attr('numeric'),

  user: DS.belongsTo('user'),
  labels: DS.hasMany('label', { async: true }),
});
