import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/todos`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    const res = await fetch(`${API_URL}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>TODO 리스트</h1>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTodo}>추가</button>
      </div>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => deleteTodo(todo.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
