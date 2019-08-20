let errors = [];
function ValidationContract() {
  errors = [];
};
ValidationContract.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0) errors.push({ message });
};
ValidationContract.prototype.isEmail = (value, message) => {
  const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(value)) errors.push({ message });
};
ValidationContract.prototype.errors = () => {
  return errors;
};
ValidationContract.prototype.clear = () => {
  errors = [];
};
ValidationContract.prototype.isValid = () => {
  return errors.length === 0;
};
module.exports = ValidationContract;
