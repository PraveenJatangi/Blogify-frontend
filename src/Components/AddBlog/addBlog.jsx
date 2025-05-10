import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage) return alert("Cover image is required");

    const data = new FormData();
    data.append("coverImage", coverImage);
    data.append("title", formData.title);
    data.append("body", formData.body);

    try {
      const res = await axios.post("http://localhost:8000/blog/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true // Important if you use cookies for auth
      });

      console.log("Blog uploaded:", res.data);
      alert("Blog uploaded!");
      navigate("/");
      // Optionally navigate: useNavigate('/blog/' + res.data.blog._id)
    } catch (err) {
        console.error("Upload error:", err.response?.data || err.message);
        alert("Failed to upload blog");
      }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow-lg p-4 rounded" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center mb-4 fw-bold">Create a New Blog</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="coverImage">Cover Image</label>
            <input
              type="file"
              className="form-control"
              id="coverImage"
              name="coverImage"
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter blog title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="body">Content</label>
            <textarea
              className="form-control"
              id="body"
              name="body"
              rows="5"
              value={formData.body}
              onChange={handleChange}
              required
              placeholder="Write your blog here..."
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Publish Blog</button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;

