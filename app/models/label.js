import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  position: DS.attr('number'),

  user: DS.belongsTo('user'),
});
