import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'text-sm uppercase bg-yellow-400 text-stone-800 inline-block rounded-full font-semibold tracking-wider hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ';

  const styles = {
    primary: base + ' py-3 px-4 sm:py-4 sm:px-6',
    small: base + ' py-2 px-4 sm:py-3 sm:px-5 text-xs',
    round: base + ' py-1 px-2.5 rounded-full md:py-2 md:px-3.5 text-sm font-medium',
    secondary:
      'text-sm uppercase bg-transparent border-2 border-stone-500 text-stone-600 inline-block rounded-full font-semibold tracking-wider hover:bg-yellow-300 hover:text-stone-800 focus:text-stone-800 focus:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 py-2.5 px-4 sm:py-3.5 sm:px-6',
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
export default Button;
