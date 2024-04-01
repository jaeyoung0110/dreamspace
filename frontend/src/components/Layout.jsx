import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ height: '90vh' }}>{children}</main>
    </>
  );
}

export default Layout;
