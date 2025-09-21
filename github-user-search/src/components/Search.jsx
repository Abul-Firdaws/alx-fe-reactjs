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
      console.error(err);
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
      <div className="mb-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setSearchMode("basic")}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              searchMode === "basic"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Basic Search
          </button>
          <button
            onClick={() => setSearchMode("advanced")}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              searchMode === "advanced"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Advanced Search
          </button>
        </div>
      </div>

      {/* Basic Search Form */}
      {searchMode === "basic" && (
        <form onSubmit={handleBasicSubmit} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      )}

      {/* Advanced Search Form */}
      {searchMode === "advanced" && (
        <form onSubmit={handleAdvancedSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Searching..." : "Advanced Search"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear
            </button>
          </div>
        </form>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Basic Search Results */}
      {userData && !loading && !error && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <img
              src={userData.avatar_url}
              alt={userData.login}
              className="w-24 h-24 rounded-full border-2 border-gray-200"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                {userData.name || userData.login}
              </h2>
              <p className="text-gray-600 mb-2">@{userData.login}</p>
              {userData.bio && (
                <p className="text-gray-700 mb-3">{userData.bio}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                {userData.location && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {userData.location}
                  </span>
                )}
                <span>{userData.public_repos} repositories</span>
                <span>{userData.followers} followers</span>
                <span>{userData.following} following</span>
              </div>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Profile
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Search Results */}
      {searchResults && !loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Search Results ({searchResults.total_count.toLocaleString()} users found)
            </h3>
          </div>
          
          {searchResults.items.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No users found matching your criteria.
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {searchResults.items.map((user) => (
                  <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-16 h-16 rounded-full border-2 border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-900 truncate">
                          {user.name || user.login}
                        </h4>
                        <p className="text-gray-600 mb-2">@{user.login}</p>
                        {user.bio && (
                          <p className="text-gray-700 text-sm mb-2 line-clamp-2">{user.bio}</p>
                        )}
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                          {user.location && (
                            <span className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {user.location}
                            </span>
                          )}
                          <span>{user.public_repos || 0} repos</span>
                          <span>{user.followers || 0} followers</span>
                        </div>
                        <a
                          href={user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Profile
                          <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Load More Button */}
              {searchResults.items.length < searchResults.total_count && (
                <div className="text-center pt-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;