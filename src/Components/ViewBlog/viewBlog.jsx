import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewBlog = ({user}) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments,setComments]=useState(null);
  const [error, setError] = useState("");
  const [content, setContent] = useState("")

  useEffect(() => {
    fetch(`http://localhost:8000/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched blog data:", data);
        setBlog(data.oneblog);
        setComments(data.comments);
        console.log(data.comments);
      })
      
      .catch((err) => {
        console.error(err);
        setError("Failed to load blog.");
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!blog) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/blog/comments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
        credentials: "include", // important if using cookies for auth
      });

      const newComment = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, newComment]);
        setContent("");
        alert(" posted comment.");
      } else {
        alert("Failed to post comment.");
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };
  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 rounded">
        <h1 className="fw-bold text-center">{blog.title}</h1>
        <div className="text-center">
          <img
            src={blog.CoverImgUrl}
            alt="cover"
            className="img-fluid rounded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="mt-4">
          <pre className="fs-5">{blog.body}</pre>
        </div>
        <div className="d-flex align-items-center mt-4 p-3 bg-light rounded">
          <img
            src={blog.createdBy?.profileImgUrl || "/defaults/blog-profile.png"}
            alt="Author"
            className="rounded-circle"
            width="50"
            height="50"
          />
          <h4 className="ms-3">{blog.createdBy?.firstName || "Unknown"}</h4>
        </div>
      </div>
        <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded">
        <h2 className="fw-bold">Comments ({comments.length})</h2>

        {!user ? (
          <p className="text-muted">Log in to add comments.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="input-group">
              <input
                type="text"
                name="content"
                className="form-control"
                placeholder="Write your comment..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </form>
        )}

        {/* Display Comments */}
        <div className="mt-4">
          {comments.map((comment, idx) => (
            <div className="d-flex align-items-center p-3 border-bottom" key={idx}>
              <img
                src={comment.createdBy?.profileImgUrl || '/default-profile.png'}
                alt="User"
                className="rounded-circle"
                width="40"
                height="40"
              />
              <div className="ms-3">
                <h5 className="mb-1">{comment.createdBy?.firstName}</h5>
                <p className="text-muted">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewBlog;
