import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout">
      <Outlet />

      <footer>MikeKruk 2024</footer>
    </div>
  );
};

export default Layout;
