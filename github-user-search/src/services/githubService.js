import axios from "axios";

const BASE_URL = "https://api.github.com/users";
const SEARCH_URL = "https://api.github.com/search/users?q";

// Original function for basic user search (maintaining compatibility)
export async function fetchUserData(username) {
  const response = await axios.get(`${BASE_URL}/${username}`);
  return response.data;
}

// New function for advanced search
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
      per_page: searchParams.perPage || 10,
      page: searchParams.page || 1,
      sort: 'best-match' // You can also use 'followers', 'repositories', 'joined'
    };
    
    const response = await axios.get(`${SEARCH_URL}${encodeURIComponent(queryString)}`, { params });
    return response.data;
  } catch (error) {
    console.error('Search users error:', error);
    throw error;
  }
}

// Helper function to get detailed user info (for when you need more details)
export async function getUserDetails(username) {
  try {
    const response = await axios.get(`${BASE_URL}/${username}`);
    return response.data;
  } catch (error) {
    console.error('Get user details error:', error);
    throw error;
  }
}