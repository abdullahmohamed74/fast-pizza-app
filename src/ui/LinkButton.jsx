import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className =
    'text-blue-400 hover:text-blue-600 hover:underline hover:underline-offset-2 transition-all duration-200';

  if (to === '-1') {
    return (
      <button onClick={() => navigate(-1)} className={className}>
        &larr; Go back
      </button>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
export default LinkButton;
