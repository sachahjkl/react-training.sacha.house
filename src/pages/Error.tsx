import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();
  return (
    <article className="p-4">
      <section className="prose mx-auto mt-4 rounded-lg border bg-white p-6 shadow-sm">
        {error + ''}
      </section>
    </article>
  );
}
