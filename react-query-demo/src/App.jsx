import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostsComponent from './components/PostsComponent';

const queryClient = new QueryClient();

function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>
          React Query Demo - Caching Example
        </h1>
        
        {/* Navigation buttons to demonstrate caching */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <button
            onClick={() => setShowPosts(true)}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: showPosts ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Show Posts
          </button>
          <button
            onClick={() => setShowPosts(false)}
            style={{
              padding: '10px 20px',
              backgroundColor: !showPosts ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Hide Posts
          </button>
        </div>

        {/* Conditionally render Posts or Home page */}
        {showPosts ? (
          <PostsComponent />
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2>Welcome to the Home Page</h2>
            <p>Click "Show Posts" to see the cached data load instantly!</p>
          </div>
        )}
      </div>
      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;