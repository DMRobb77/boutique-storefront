import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Result = ({ id, title, term, clickEvent }) => {
  const regex = new RegExp(`(${term})`, 'gi');
  const parts = title.split(regex);

  return (
    <Link to={`/store/${id}`}>
      <button onClick={{ clickEvent }}>
        {parts.filter(String).map((part, index) => (regex.test(part) ? <mark key={index}>{part}</mark> : part))}
      </button>
    </Link>
  );
};

Result.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  clickEvent: PropTypes.func,
};

export default Result;
