import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextInfo";
import { useLectureContext } from "../../context/LectureContextInfo";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const HomePage = () => {
  const [pdfUrl, setPdfUrl] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("");
  const [institute, setInstitute] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [user, setUser] = useState("");
  const [pdfIVid, setpdfIVid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lectureCreated, setLectureCreated] = useState(false);
const {auth} = useAuthContext()
const {  setLecture} = useLectureContext()
  



// const handlePDFUpload = async (files) => {
//   try {
//     setLoading(true);
//     setError("");
    
//     const formData = new FormData();
//     for (let file of files) {
//       formData.append("pdf", file); // Append multiple files
//     }

//     const response = await fetch(`${API_BASE_URL}/api/v1/lecture/uploadPDF`, {
//       method: "POST",
//       headers: { Authorization: auth?.token }, // No `Content-Type`, FormData sets it automatically
//       body: formData,
//     });

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.error || "Failed to upload PDFs");

//     setPdfUrl(data.pdfUrl); // Set multiple URLs instead of one

//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };


  const handlePDFUpload = async (file) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch(`${API_BASE_URL}/api/v1/lecture/uploadPDF`, {
        method: "POST",
        headers: { Authorization: auth?.token },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to upload PDF");

      setPdfUrl(data.pdfUrl); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };






  const handleImageUpload = async (file) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${API_BASE_URL}/api/v1/lecture/uploadImage`, {
        method: "POST",
        headers: { Authorization: auth?.token },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to upload Image");

      setImageUrl(data.imageUrl); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = async (file) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("video", file);

      const response = await fetch(`${API_BASE_URL}/api/v1/lecture/uploadVideo`, {
        method: "POST",
        headers: { Authorization: auth?.token },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to upload Video");

      setVideoUrl(data.videoUrl); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLecture = async () => {
    try {
      setLoading(true);
      setError("");

      if (!status || !institute || !topic || !level || !user || !pdfIVid) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }

      const lectureData = {
        pdfIVid,
        user,
        status,
        institute,
        topic,
        level,
        pdfUrl,
        imageUrl,
        videoUrl,
      };

      const response = await fetch(`${API_BASE_URL}/api/v1/lecture/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify(lectureData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create lecture");

      localStorage.setItem("LecturesData", JSON.stringify(data));
      setLecture((prevLecture) => ({
          ...prevLecture,
          ...data, 
        }));
        console.log("Lecture Created:", data);
        setLectureCreated(true)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="container mt-4 d-flex justify-content-center align-items-center min-vh-100">
    <div className="card shadow-lg p-4 border-0">
      <h2 className="text-center mb-4">Upload Your Lecture</h2>
      <div className="row g-3">


        <div className="col-md-6">
          <label className="form-label">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            className="form-control"
            onChange={(e) => handlePDFUpload(e.target.files[0])}
          />
        </div>
{/* <div className="col-md-6">
  <label className="form-label">Upload PDF</label>
  <input
    type="file"
    accept="application/pdf"
    className="form-control"
    multiple // Allows multiple file selection
    onChange={(e) => handlePDFUpload(e.target.files)}
  />
</div> */}


        <div className="col-md-6">
          <label className="form-label">Upload Image (Optional Not Recommended)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Upload Video (Optional Not Recommended)</label>
          <input
            type="file"
            accept="video/*"
            className="form-control"
            onChange={(e) => handleVideoUpload(e.target.files[0])}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Status</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Institute</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Institute Name"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Topic</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Level</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>

        <div className="col-md-6">
  <label className="form-label">PDF Password</label>
  <input
    type="password"
    className="form-control"
    placeholder="Enter PDF Password"
    value={pdfIVid}
    onChange={(e) => setpdfIVid(e.target.value)}
  />
</div>
<div className="col-md-6">
  <label className="form-label">Username</label>
  <input
    type="text"
    className="form-control"
    placeholder="Enter Username"
    value={user}
    onChange={(e) => setUser(e.target.value)}
  />
</div>

      </div>
      <div className="text-center mt-4 d-flex justify-content-center align-items-center gap-3">
  <button className="btn btn-primary px-4 py-2" onClick={handleCreateLecture} disabled={loading}>
    {loading ? "Uploading..." : "Create Lecture"}
  </button>

  {lectureCreated && (
    <Link to={`/pdflecture/${pdfIVid}`}>
      <button className="btn btn-success">View Your Lecture</button>
    </Link>
  )}
</div>

      
      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </div>
  </div>
  );
};

export default HomePage;


