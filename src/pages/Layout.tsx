import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { routes } from 'router';

const Loading = (
  <article className="p-4">
    <section className="prose mx-auto mt-4 rounded-lg border bg-white p-6 shadow-sm">
      <h1>
        <span className="animate-spin">⌛</span> Loading...
      </h1>
    </section>
  </article>
);

const Layout = () => {
  return (
    <div className="container mx-auto">
      <header className="sticky top-0 z-10">
        <Nav routes={routes} />
      </header>
      <main className=" my-2 min-h-[500px] rounded bg-white/50 py-4 shadow-md backdrop-blur-2xl">
        <Suspense fallback={Loading}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
