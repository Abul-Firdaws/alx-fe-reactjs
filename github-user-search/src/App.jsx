import Search from "./components/Search";
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold tracking-tight">GitHub User Search</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Discover GitHub Profiles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to the GitHub User Profile Search App. Search for any GitHub profile or use advanced filters to find users by location and repository count.
          </p>
        </div>

        {/* Search Component Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
          <Search />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 GitHub User Search Application. Built with React & GitHub API.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;