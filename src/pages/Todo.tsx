import Todo from 'components/Todo';

const defaultTodos = ['Clean room', 'Call bank', 'Do laundry'];

export default function TodoPage() {
  return (
    <article className="p-4">
      <section className="prose mt-4">
        <Todo defaultTodos={defaultTodos} />
      </section>
    </article>
  );
}
