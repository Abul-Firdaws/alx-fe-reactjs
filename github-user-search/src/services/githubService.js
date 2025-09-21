import axios from "axios";

const BASE_URL = "https://api.github.com/users";
const SEARCH_URL = "https://api.github.com/search/users?q";

// Configure axios with timeout and interceptors for production
const githubAPI = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  }
});

// Add response interceptor for better error handling
githubAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle rate limiting gracefully
    if (error.response?.status === 403) {
      const rateLimitReset = error.response.headers['x-ratelimit-reset'];
      const resetTime = rateLimitReset ? new Date(rateLimitReset * 1000).toLocaleTimeString() : 'later';
      throw new Error(`GitHub API rate limit exceeded. Try again at ${resetTime}`);
    }
    
    // Handle network errors
    if (!error.response) {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    throw error;
  }
);

// Original function for basic user search (maintaining compatibility)
export async function fetchUserData(username) {
  try {
    const response = await githubAPI.get(`${BASE_URL}/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
}

// New function for advanced search with enhanced error handling
export async function searchUsers(searchParams) {
  try {
    // Build query string based on search parameters
    let query = [];
    
    // Add username/name search
    if (searchParams.username && searchParams.username.trim()) {
      query.push(searchParams.username.trim());
    }
    
    // Add location filter
    if (searchParams.location && searchParams.location.trim()) {
      query.push(`location:"${searchParams.location.trim()}"`);
    }
    
    // Add minimum repositories filter
    if (searchParams.minRepos && searchParams.minRepos > 0) {
      query.push(`repos:>=${searchParams.minRepos}`);
    }
    
    // If no search criteria provided, return empty results
    if (query.length === 0) {
      return {
        items: [],
        total_count: 0,
        incomplete_results: false
      };
    }
    
    const queryString = query.join(' ');
    
    // Make API request with pagination support
    const params = {
      per_page: Math.min(searchParams.perPage || 10, 100), // GitHub max is 100
      page: Math.max(searchParams.page || 1, 1), // Ensure page is at least 1
      sort: 'best-match' // You can also use 'followers', 'repositories', 'joined'
    };
    
    const response = await githubAPI.get(`${SEARCH_URL}${encodeURIComponent(queryString)}`, { params });
    
    // Ensure we return a consistent structure
    return {
      items: response.data.items || [],
      total_count: response.data.total_count || 0,
      incomplete_results: response.data.incomplete_results || false
    };
  } catch (error) {
    // Enhanced error handling for production
    if (error.message.includes('rate limit')) {
      throw error; // Re-throw rate limit errors with custom message
    }
    
    if (error.response?.status === 422) {
      throw new Error('Invalid search query. Please check your search criteria.');
    }
    
    if (error.response?.status === 503) {
      throw new Error('GitHub service is temporarily unavailable. Please try again later.');
    }
    
    // Generic error for production
    throw new Error('Search failed. Please try again.');
  }
}

// Helper function to get detailed user info with error handling
export async function getUserDetails(username) {
  try {
    const response = await githubAPI.get(`${BASE_URL}/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    if (error.message.includes('rate limit')) {
      throw error;
    }
    throw new Error('Failed to fetch user details');
  }
}