import Search from "./components/Search";
import Hello from './components/Hello';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">GitHub User Search Application</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto p-6">
        <p className="mb-4 text-gray-700">
          App setup successful. Ready for further development.
        </p>

        {/* Hello component */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <Hello />
        </div>

        {/* Search component */}
        <div className="p-4 bg-white rounded-lg shadow">
          <Search />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4">
        <small className="text-gray-600">© 2025 GitHub User Search</small>
      </footer>
    </div>
  );
}

export default App;