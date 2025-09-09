'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isClient, setIsClient] = useState<boolean>(false);

  // 클라이언트 사이드에서만 localStorage 접근
  useEffect(() => {
    setIsClient(true);
    const savedTodos = localStorage.getItem('kanghee-todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        // Date 객체 복원
        const todosWithDates = parsedTodos.map((todo: Omit<Todo, 'createdAt'> & { createdAt: string }) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(todosWithDates);
      } catch (error) {
        console.error('TodoList 데이터 파싱 에러:', error);
      }
    }
  }, []);

  // todos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('kanghee-todos', JSON.stringify(todos));
    }
  }, [todos, isClient]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date()
    };
    
    setTodos(prev => [newTodo, ...prev]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  // 클라이언트 사이드 렌더링이 완료되기 전에는 로딩 표시
  if (!isClient) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-2xl">
        <div className="text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 mx-auto mb-2"></div>
          <p>TodoList 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">📝 TodoList</h3>
        <p className="text-sm text-gray-600">
          완료: {completedCount} / 전체: {totalCount}
        </p>
      </div>

      {/* 할 일 추가 입력 */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="새로운 할 일을 입력하세요..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          추가
        </button>
      </div>

      {/* 할 일 목록 */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">📋 아직 할 일이 없습니다</p>
            <p className="text-sm">위에서 새로운 할 일을 추가해보세요!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                todo.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {todo.completed && '✓'}
              </button>
              
              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'text-green-700 line-through'
                    : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
              
              <span className="text-xs text-gray-500">
                {todo.createdAt.toLocaleDateString('ko-KR')}
              </span>
              
              <button
                onClick={() => deleteTodo(todo.id)}
                className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
