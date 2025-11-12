import { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchMode, setSearchMode] = useState("basic");
  const [advancedSearch, setAdvancedSearch] = useState({
    username: "",
    location: "",
    minRepos: ""
  });
  const [searchResults, setSearchResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleBasicSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);
    setSearchResults(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError("Looks like we can't find that user");
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSubmit = async (e) => {
    e.preventDefault();
    
    if (!advancedSearch.username.trim() && !advancedSearch.location.trim() && !advancedSearch.minRepos) {
      setError("Please provide at least one search criteria");
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);
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
    } finally {
      setLoading(false);
    }
  };

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

  const handleAdvancedInputChange = (field, value) => {
    setAdvancedSearch(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
    <div className="max-w-5xl mx-auto">
      {/* Search Mode Toggle - Enhanced spacing and visual feedback */}
      <div className="mb-10">
        <div className="inline-flex rounded-xl border-2 border-gray-200 p-1.5 bg-white shadow-sm">
          <button
            onClick={() => setSearchMode("basic")}
            className={`py-3 px-8 rounded-lg font-semibold text-sm transition-all duration-200 ${
              searchMode === "basic"
                ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md scale-105"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
            aria-pressed={searchMode === "basic"}
          >
            Basic Search
          </button>
          <button
            onClick={() => setSearchMode("advanced")}
            className={`py-3 px-8 rounded-lg font-semibold text-sm transition-all duration-200 ${
              searchMode === "advanced"
                ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md scale-105"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
            aria-pressed={searchMode === "advanced"}
          >
            Advanced Search
          </button>
        </div>
      </div>

      {/* Basic Search Form - Enhanced spacing */}
      {searchMode === "basic" && (
        <form onSubmit={handleBasicSubmit} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter GitHub username (e.g., octocat)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400 text-base"
              aria-label="GitHub username"
            />
            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching...</span>
                </span>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Advanced Search Form - Enhanced layout and spacing */}
      {searchMode === "advanced" && (
        <form onSubmit={handleAdvancedSubmit} className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            <div>
              <label htmlFor="adv-username" className="block text-sm font-semibold text-gray-800 mb-2.5">
                Username
              </label>
              <input
                id="adv-username"
                type="text"
                placeholder="e.g., octocat"
                value={advancedSearch.username}
                onChange={(e) => handleAdvancedInputChange("username", e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-800 mb-2.5">
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="e.g., San Francisco"
                value={advancedSearch.location}
                onChange={(e) => handleAdvancedInputChange("location", e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="min-repos" className="block text-sm font-semibold text-gray-800 mb-2.5">
                Min. Repositories
              </label>
              <input
                id="min-repos"
                type="number"
                min="0"
                placeholder="e.g., 10"
                value={advancedSearch.minRepos}
                onChange={(e) => handleAdvancedInputChange("minRepos", e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              {loading ? "Searching..." : "Advanced Search"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-10 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              Clear
            </button>
          </div>
        </form>
      )}

      {/* Loading State - Enhanced */}
      {loading && !userData && !searchResults && (
        <div className="flex items-center justify-center py-16" role="status" aria-live="polite">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-700 font-semibold text-lg">Loading results...</p>
          </div>
        </div>
      )}

      {/* Error State - Enhanced */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-5 mb-8 shadow-md" role="alert">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        </div>
      )}

      {/* Basic Search Results - Enhanced card design */}
      {userData && !loading && !error && (
        <div className="bg-gradient-to-br from-white via-gray-50 to-indigo-50 border-2 border-gray-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl ring-2 ring-indigo-100"
              loading="lazy"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {userData.name || userData.login}
              </h2>
              <p className="text-indigo-600 font-semibold text-lg mb-4">@{userData.login}</p>
              {userData.bio && (
                <p className="text-gray-700 mb-6 leading-relaxed text-base">{userData.bio}</p>
              )}
              <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">
                {userData.location && (
                  <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {userData.location}
                  </span>
                )}
                <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                  <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  <span className="font-semibold text-gray-900">{userData.public_repos}</span>&nbsp;repos
                </span>
                <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                  <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="font-semibold text-gray-900">{userData.followers}</span>&nbsp;followers
                </span>
                <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                  <span className="font-semibold text-gray-900">{userData.following}</span>&nbsp;following
                </span>
              </div>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
              >
                View GitHub Profile
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Search Results - Enhanced */}
      {searchResults && !loading && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-xl border-2 border-indigo-100 shadow-md">
            <h3 className="text-xl font-bold text-gray-900">
              Search Results
            </h3>
            <span className="text-sm font-semibold text-indigo-700 bg-white px-4 py-2 rounded-full shadow-sm border-2 border-indigo-200">
              {searchResults.total_count.toLocaleString()} users found
            </span>
          </div>
          
          {searchResults.items.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700 font-semibold text-lg mb-2">No users found matching your criteria</p>
              <p className="text-gray-500 text-base">Try adjusting your search filters</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5">
                {searchResults.items.map((user) => (
                  <div key={user.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex flex-col sm:flex-row items-start space-y-5 sm:space-y-0 sm:space-x-6">
                      <img
                        src={user.avatar_url}
                        alt={`${user.login}'s avatar`}
                        className="w-24 h-24 rounded-xl border-2 border-gray-200 shadow-md ring-2 ring-gray-100"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-bold text-gray-900 truncate mb-1.5">
                          {user.name || user.login}
                        </h4>
                        <p className="text-indigo-600 font-semibold mb-3">@{user.login}</p>
                        {user.bio && (
                          <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">{user.bio}</p>
                        )}
                        <div className="flex flex-wrap gap-2.5 text-sm text-gray-600 mb-5">
                          {user.location && (
                            <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                              <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {user.location}
                            </span>
                          )}
                          <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 font-medium">
                            <span className="text-gray-900">{user.public_repos || 0}</span> repos
                          </span>
                          <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 font-medium">
                            <span className="text-gray-900">{user.followers || 0}</span> followers
                          </span>
                        </div>
                        <a
                          href={user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition-all"
                        >
                          View Profile
                          <svg className="w-4 h-4 ml-1.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Load More Button - Enhanced */}
              {searchResults.items.length < searchResults.total_count && (
                <div className="text-center pt-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="px-10 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Loading...</span>
                      </span>
                    ) : (
                      "Load More Results"
                    )}
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