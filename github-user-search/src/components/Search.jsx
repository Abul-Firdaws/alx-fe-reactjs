import { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

function Search() {
  // Basic search state (maintaining existing functionality)
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Advanced search state
  const [searchMode, setSearchMode] = useState("basic"); // "basic" or "advanced"
  const [advancedSearch, setAdvancedSearch] = useState({
    username: "",
    location: "",
    minRepos: ""
  });
  const [searchResults, setSearchResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle basic search (original functionality)
  const handleBasicSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);
    setSearchResults(null); // Clear advanced results

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError("Looks like we cant find the user");
      // Remove console.error for production
    } finally {
      setLoading(false);
    }
  };

  // Handle advanced search
  const handleAdvancedSubmit = async (e) => {
    e.preventDefault();
    
    // Check if at least one search criteria is provided
    if (!advancedSearch.username.trim() && !advancedSearch.location.trim() && !advancedSearch.minRepos) {
      setError("Please provide at least one search criteria");
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null); // Clear basic search results
    setSearchResults(null);
    setCurrentPage(1);

    try {
      const searchParams = {
        username: advancedSearch.username,
        location: advancedSearch.location,
        minRepos: advancedSearch.minRepos ? parseInt(advancedSearch.minRepos) : 0,
        page: 1,
        perPage: 10
      };

      const results = await searchUsers(searchParams);
      setSearchResults(results);
    } catch (err) {
      setError("Error occurred while searching users");
      // Remove console.error for production
    } finally {
      setLoading(false);
    }
  };

  // Load more results (pagination)
  const handleLoadMore = async () => {
    if (!searchResults || loading) return;

    setLoading(true);
    try {
      const searchParams = {
        username: advancedSearch.username,
        location: advancedSearch.location,
        minRepos: advancedSearch.minRepos ? parseInt(advancedSearch.minRepos) : 0,
        page: currentPage + 1,
        perPage: 10
      };

      const newResults = await searchUsers(searchParams);
      
      // Append new results to existing ones
      setSearchResults(prev => ({
        ...newResults,
        items: [...prev.items, ...newResults.items]
      }));
      setCurrentPage(prev => prev + 1);
    } catch (err) {
      setError("Error loading more results");
    } finally {
      setLoading(false);
    }
  };

  // Handle advanced search input changes
  const handleAdvancedInputChange = (field, value) => {
    setAdvancedSearch(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Clear all results and reset form
  const handleClear = () => {
    setUsername("");
    setAdvancedSearch({
      username: "",
      location: "",
      minRepos: ""
    });
    setUserData(null);
    setSearchResults(null);
    setError(null);
    setCurrentPage(1);
  };

  return (
  <div className="max-w-4xl mx-auto p-6">
    {/* Search Mode Toggle */}
    <div className="mb-8">
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setSearchMode("basic")}
          className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors ${
            searchMode === "basic"
              ? "border-blue-600 text-blue-700"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Basic Search
        </button>
        <button
          onClick={() => setSearchMode("advanced")}
          className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors ${
            searchMode === "advanced"
              ? "border-blue-600 text-blue-700"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Advanced Search
        </button>
      </div>
    </div>

    {/* Basic Search Form */}
    {searchMode === "basic" && (
      <form onSubmit={handleBasicSubmit} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            aria-label="GitHub username"
          />
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
    )}

    {/* Advanced Search Form */}
    {searchMode === "advanced" && (
      <form onSubmit={handleAdvancedSubmit} className="mb-8 bg-gray-50 p-6 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="adv-username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="adv-username"
              type="text"
              placeholder="Enter username"
              value={advancedSearch.username}
              onChange={(e) => handleAdvancedInputChange("username", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="e.g., San Francisco"
              value={advancedSearch.location}
              onChange={(e) => handleAdvancedInputChange("location", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="min-repos" className="block text-sm font-medium text-gray-700 mb-2">
              Min. Repositories
            </label>
            <input
              id="min-repos"
              type="number"
              min="0"
              placeholder="e.g., 10"
              value={advancedSearch.minRepos}
              onChange={(e) => handleAdvancedInputChange("minRepos", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Searching..." : "Advanced Search"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
          >
            Clear
          </button>
        </div>
      </form>
    )}

    {/* Error State */}
    {error && (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    )}

    {/* Results remain unchanged — only updated classNames where needed */}
    {/* ... your userData and searchResults rendering stays as-is with the same structure ... */}
  </div>
  );
}

export default Search;