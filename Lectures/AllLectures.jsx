import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContextInfo";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AllLectures() {
  const [lectures, setLectures] = useState([]); // ✅ Always use an array
  const { auth } = useAuthContext();

  useEffect(() => {
    getAllLecture();
  }, []);

  const getAllLecture = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/lecture/getAllLecture`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch lectures");

      const data = await response.json();
      console.log("Fetched Data:", data);

      setLectures(data.lectures || []); // ✅ Ensure it's always an array
    } catch (error) {
      console.log(error);
    }
  };

  return (
<div className="container my-4 p-4 mt-5  bg-light rounded shadow" >
  <h2 className="text-center mb-4">📚 All Lectures</h2>

  {lectures.length > 0 ? (
    <div className="row row-cols-1 d-flex justify-content-center align-items-center  g-4"

    
    >
      {lectures.map((lecture) => (
        <div key={lecture._id} className="col d-flex justify-content-center align-items-center">
          <div className="card shadow-lg rounded border-0 p-3"
          
          style={{ maxwidth: "550px", maxheight: "500px", }}
          >
            {/* ✅ Image & Video in Flex Row */}
            {(lecture.imageUrl || lecture.videoUrl) && (
              <div className="d-flex justify-content-center align-items-center gap-3">
                {lecture.imageUrl && (
                  <img
                    src={lecture.imageUrl}
                    alt="Lecture"
                    className="img-fluid rounded"
                    style={{ width: "250px", height: "200px", objectFit: "cover" }}
                  />
                )}
                {lecture.videoUrl && (
                  <video
                    controls
                    className="rounded"
                    style={{ width: "250px", height: "200px" }}
                  >
                    <source src={lecture.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}

            <div className="card-body text-center">
              <h5 className="card-title">{lecture.topic} ({lecture.level})</h5>
              <p className="card-text">
                <strong>Institute:</strong> {lecture.institute} <br />
                <strong>Status:</strong> {lecture.status}
              </p>

              {/* ✅ Show Main PDF */}
              {lecture.pdfUrl && (
                <a href={lecture.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-2">
                  📄 View Main PDF
                </a>
              )}

              {/* ✅ Show Multiple PDFs */}
              {lecture.mulPdfUrls.length > 0 && (
                <div>
                  <strong>📚 Additional PDFs:</strong>
                  <ul className="list-group mt-2">
                    {lecture.mulPdfUrls.map((pdf, idx) => (
                      <li key={idx} className="list-group-item">
                        <a href={pdf} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                          📄 PDF {idx + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>




        </div>
      ))}

    </div>
  ) : (
    <div className="text-center">
      <p className="fs-4">⏳ Loading lectures...</p>
    </div>
  )}
</div>
  );
}

export default AllLectures;
