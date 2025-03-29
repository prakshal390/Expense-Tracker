
import PropTypes from 'prop-types';

const Label = ({ children, ...props }) => {
  return (
    <label {...props} className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  )
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Label }
