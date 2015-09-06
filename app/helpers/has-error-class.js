import Ember from "ember";

export default Ember.Helper.helper(function([showErrors, errors]) {
  if(showErrors && errors.length){
    return 'has-error';
  }
  
  return '';
});