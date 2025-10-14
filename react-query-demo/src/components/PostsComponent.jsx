import { useQuery } from '@tanstack/react-query';

// NEW API with real English content!
const fetchPosts = async () => {
  const response = await fetch('https://dummyjson.com/posts');
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const data = await response.json();
  return data.posts; // DummyJSON returns posts in a 'posts' property
};

function PostsComponent() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading posts... </h2>
        <p>Please wait while we fetch the data</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <h2>Error! </h2>
        <p>Error: {error.message}</p>
        <button 
          onClick={() => refetch()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button
          onClick={() => refetch()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '10px'
          }}
        >
          Refetch Posts
        </button>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          Click to manually refresh the data from the API
        </p>
      </div>

      <h2 style={{ color: '#333', marginBottom: '20px' }}>
        Posts ({data.length} total)
      </h2>
      
      <div>
        {data.slice(0, 10).map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: '#f8f9fa',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: '1px solid #ddd'
            }}
          >
            <h3 style={{ color: '#007bff', marginBottom: '10px' }}>
              {post.id}. {post.title}
            </h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>
              {post.body}
            </p>
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#6c757d' }}>
              <span> {post.reactions.likes} likes</span>
              <span style={{ marginLeft: '15px' }}> {post.reactions.dislikes} dislikes</span>
              <span style={{ marginLeft: '15px' }}> {post.views} views</span>
            </div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
        Showing first 10 posts.
      </p>
    </div>
  );
}

export default PostsComponent;