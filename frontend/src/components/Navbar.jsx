import { NavLink, Link } from 'react-router-dom';
import { HiOutlineChartBar, HiOutlineCollection, HiOutlineCalendar, HiOutlineClipboardList } from 'react-icons/hi';

export default function Navbar({ streak = 0 }) {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">⚡</span>
            <span>DSA Tracker</span>
          </Link>

          <div className="navbar-links">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <HiOutlineChartBar size={18} />
              Dashboard
            </NavLink>
            <NavLink to="/problems" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <HiOutlineCollection size={18} />
              Problems
            </NavLink>
            <NavLink to="/today" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <HiOutlineCalendar size={18} />
              Today
            </NavLink>
          </div>

          <div className="navbar-streak">
            <span className="fire-icon">🔥</span>
            <span>{streak}</span>
          </div>
        </div>
      </nav>

      {/* Mobile bottom navigation */}
      <div className="mobile-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <HiOutlineChartBar className="nav-icon" size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/problems" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <HiOutlineCollection className="nav-icon" size={20} />
          Problems
        </NavLink>
        <NavLink to="/today" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <HiOutlineCalendar className="nav-icon" size={20} />
          Today
        </NavLink>
      </div>
    </>
  );
}
