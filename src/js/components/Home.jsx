import React, { useState } from 'react';

// tuve problemas con npm install y run start y no pude ver el renderizado de la pagina
// hice lo que pude en cuanto a codigo si hay algún error o algo no está bien diganmelo para buscar solución

export const Home = () => {
  const [todos, setTodos] = useState([
    { done: false, title: 'Hacer la cama', id: Math.random() * 10 },
    { done: false, title: 'Lavar las manos', id: Math.random() * 10 },
    { done: false, title: 'Comer', id: Math.random() * 10 },
    { done: false, title: 'Pasear al perro', id: Math.random() * 10 }
  ]);

  const [tareaInput, setTareaInput] = useState('');

  // agregar una nueva tarea
  const manejarEnvioFormulario = (e) => {
    e.preventDefault();
    if (tareaInput.trim() === '') return; // para que impida crear tareas vacias

    setTodos([...todos, { title: tareaInput, done: false, id: Math.random() * 1000 }]);
    setTareaInput('');
  };

  // eliminar tarea
  const eliminarTarea = (idTarea) => {
    setTodos(todos.filter(tarea => tarea.id !== idTarea));
  };

  // marcar/desmarcar tarea como completada
  const alternarCompletada = (idTarea) => {
    setTodos(
      todos.map(tarea => 
        tarea.id === idTarea ? { ...tarea, done: !tarea.done } : tarea
      )
    );
  };

  return (
    <section className="aplicacion-tareas">
      <header className="encabezado">
        <h1>Lista de Tareas</h1>
        <form onSubmit={manejarEnvioFormulario}>
          <input
            autoFocus
            className="nueva-tarea"
            placeholder="¿Qué necesitas hacer?"
            value={tareaInput}
            onChange={(e) => setTareaInput(e.target.value)}
          />
        </form>
      </header>
      {/* en esta parte se muestra la lista */}
      <section className="cuerpo">
        <ul className="lista-tareas">
          {todos.map(tarea => (
            <li key={tarea.id}>
              <div className="vista">
                <label>{tarea.title}</label>
                <button className="eliminar" onClick={() => eliminarTarea(tarea.id)}>❌</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="pie">
        <span className="contador-tareas">
          <strong>{todos.filter(tarea => !tarea.done).length}</strong> tarea(s) pendiente(s)
        </span>
      </footer>
    </section>
  );
};

export default Home;