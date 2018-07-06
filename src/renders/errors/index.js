import renderValidationError from './validation';
import renderRequestError from './request';


export default (root, { isValid, requestError }) => {
  renderValidationError(root, isValid);
  renderRequestError(root, requestError);
};
