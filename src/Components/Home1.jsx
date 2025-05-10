// BlogPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api'); // Replace if your endpoint is different
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading blogs...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">📝 Latest Blogs</h2>

      {blogs.length === 0 ? (
        <p className="text-center">No blogs found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {blogs.map((blog) => (
            <div className="col" key={blog._id}>
              <div className="card shadow-sm h-100 border-0">
                {blog.CoverImgUrl && (
                  <img
                    src={blog.CoverImgUrl}
                    alt="Blog Cover"
                    className="card-img-top img-fluid"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '10px 10px 0 0',
                    }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{blog.title}</h5>
                  <p className="text-muted small">
                    By {blog.createdBy?.firstName || 'Unknown'} |{' '}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="card-text text-truncate" style={{ maxHeight: '60px' }}>
                    {blog.body}
                  </p>
                  <a href={`/blog/${blog._id}`} className="btn btn-primary mt-auto">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  
  );
};

export default Home;
