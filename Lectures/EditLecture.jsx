import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextInfo";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EditLecture() {
  const { id } = useParams(); // Get lecture ID from URL
  const { auth } = useAuthContext();
  const navigate = useNavigate();
    const [pdfUrl, setPdfUrl] = useState("")
    const [mulPdfUrls, setmulPdfUrls] = useState([])
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [status, setStatus] = useState("");
    const [institute, setInstitute] = useState("");
    const [topic, setTopic] = useState("");
    const [level, setLevel] = useState("");

  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");




  const handleMultiplePDFUpload = async (files) => {
    try {
      setLoading(true);
      setError("");
  
      const formData = new FormData();
      for (let file of files) {
        formData.append("mulpdf", file); // Ensure backend expects "mulpdf"
      }
  
      const response = await fetch(`${API_BASE_URL}/api/v1/lecture/uploadMulPDF`, {
        method: "POST",
        headers: { Authorization: auth?.token }, // Do NOT set Content-Type
        body: formData,
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to upload PDFs");
  
      if (Array.isArray(data.mulPdfUrls)) {
        setmulPdfUrls((prevUrls) => [...prevUrls, ...data.mulPdfUrls]); // Ensure proper state update
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
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

  // Fetch lecture details
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/v1/lecture/getLecture/${id}`,{
          headers: {
            Authorization: auth?.token,
          },
        });

        


        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch lecture");


        
    const lecture = data.lecture;
    setTopic(lecture.topic);
    setLevel(lecture.level);
    setInstitute(lecture.institute);
    setStatus(lecture.status);
    setPdfUrl(lecture.pdfUrl);
    setImageUrl(lecture.imageUrl);
    setVideoUrl(lecture.videoUrl);
    setmulPdfUrls(lecture.mulPdfUrls);

        setLecture(data.lecture);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [id, auth?.token]);

//   // Handle update form submission
//   const handleUpdateLecture = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch(`${API_BASE_URL}/api/v1/lecture/update/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: auth?.token,
//         },
//         body: JSON.stringify(lecture),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Failed to update lecture");

//       console.log("Lecture Updated:", data);
//       navigate("/getAllLecture"); // Navigate back to the lecture list
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };


  const handleUpdateLecture = async () => {
    try {
      setLoading(true);
      setError("");

      if (!status || !institute || !topic || !level || !pdfUrl  ) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }

      const lectureData = {

        mulPdfUrls,
        status,
        institute,
        topic,
        level,
        pdfUrl,
        imageUrl,
        videoUrl,
      };

      const response = await fetch(`${API_BASE_URL}/api/v1/lecture/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify(lectureData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create lecture");

      localStorage.setItem("LecturesData", JSON.stringify(data.lecture));

      setLecture(data.lecture);








        console.log("Lecture Created:", data._id);
        console.log("Lecture Created:", data);
        console.log("Lecture ID Created:", data.lecture._id)

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };











  if (loading) return <p>⏳ Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-3 d-flex justify-content-center align-items-center min-vh-100">
    <div className="card mt-5 md:mt-1 shadow-lg p-4 border-0">
    <>
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
            <div className="col-md-6">
              <label className="form-label">Upload PDF (Multiple Files)</label>
              <input
                type="file"
                accept="application/pdf"
                className="form-control"
                multiple
                onChange={(e) => handleMultiplePDFUpload(e.target.files)}
              />
            </div>
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
          </div>
          <div className="text-center mt-4 d-flex justify-content-center align-items-center gap-3">
            <button
              className="btn btn-primary px-4 py-2"
              onClick={handleUpdateLecture}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Update Lecture"}
            </button>
          </div>
        </>
        </div>
        </div>
  );
}

export default EditLecture;
