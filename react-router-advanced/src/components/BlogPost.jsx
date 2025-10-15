import { useParams, Link } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();

  const blogPosts = {
    '1': {
      title: 'Getting Started with React Router',
      author: 'Jane Smith',
      date: 'October 10, 2024',
      content: 'React Router is a powerful library for handling navigation in React applications. It allows you to create single-page applications with navigation without page refreshes...'
    },
    '2': {
      title: 'Advanced Routing Techniques',
      author: 'John Developer',
      date: 'October 12, 2024',
      content: 'In this post, we explore nested routes, protected routes, and dynamic routing patterns that will make your React applications more robust and user-friendly...'
    },
    '3': {
      title: 'Understanding URL Parameters',
      author: 'Sarah Coder',
      date: 'October 14, 2024',
      content: 'URL parameters are essential for creating dynamic routes. They allow you to capture values from the URL and use them in your components...'
    }
  };

  const post = blogPosts[id];

  if (!post) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#e74c3c' }}>Blog Post Not Found</h2>
        <p style={{ color: '#666', marginTop: '20px' }}>
          The blog post with ID "{id}" doesn't exist.
        </p>
        <Link to="/" style={{ color: '#3498db', marginTop: '20px', display: 'inline-block' }}>
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>{post.title}</h1>
      <div style={{ color: '#95a5a6', marginBottom: '30px', fontSize: '14px' }}>
        By {post.author} | {post.date}
      </div>
      <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
        {post.content}
      </p>
      
      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ecf0f1' }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Read More Posts:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['1', '2', '3'].filter(postId => postId !== id).map(postId => (
            <Link
              key={postId}
              to={`/blog/${postId}`}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3498db',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              Post {postId}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPost;