import React from "react";
import { useAuthContext } from "../../context/AuthContextInfo";
import { useLectureContext } from "../../context/LectureContextInfo";

function About() {
  const { lectures } = useLectureContext();
  const { auth } = useAuthContext();

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 rounded-4" style={{ marginTop:"50px", maxWidth: "600px", width: "100%" }}>
        
        {/* User Avatar */}
        <div className="text-center mb-4">
          <div
            className="rounded-circle userProfileColor text-white d-flex align-items-center justify-content-center"
            style={{ width: "80px", height: "80px", fontSize: "24px", margin: "auto" }}
          >
            {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h3 className="mt-3 text-dark fw-bold">{auth?.user?.name || "Unknown User"}</h3>
          <p className="text-muted">{auth?.user?.email || "No Email Provided"}</p>
        </div>

        {/* User Information */}
        <div className="w-100 mt-4">
          <div className="mb-3 d-flex align-items-center">
            <i className="bi bi-person-circle text-primary fs-5 me-2"></i>
            <strong className="text-secondary">Name:</strong>
            <span className="ms-2 text-dark">{auth?.user?.name || "N/A"}</span>
          </div>

          <div className="mb-3 d-flex align-items-center">
            <i className="bi bi-envelope text-primary fs-5 me-2"></i>
            <strong className="text-secondary">Email:</strong>
            <span className="ms-2 text-dark">{auth?.user?.email || "N/A"}</span>
          </div>

          <hr />

          <div className="mb-3 d-flex align-items-center">
            <i className="bi bi-clipboard-check text-success fs-5 me-2"></i>
            <strong className="text-secondary">Status:</strong>
            <span className="ms-2 text-dark">{lectures?.status || "N/A"}</span>
          </div>

          <div className="mb-3 d-flex align-items-center">
            <i className="bi bi-buildings text-info fs-5 me-2"></i>
            <strong className="text-secondary">Institute:</strong>
            <span className="ms-2 text-dark">{lectures?.institute || "N/A"}</span>
          </div>

          <div className="mb-3 d-flex align-items-center">
            <i className="bi bi-journal-text text-danger fs-5 me-2"></i>
            <strong className="text-secondary">Topic:</strong>
            <span className="ms-2 text-dark">{lectures?.topic || "N/A"}</span>
          </div>

          <div className="mb-3 d-flex align-items-center">
            <i className="bi bi-bar-chart-line text-primary fs-5 me-2"></i>
            <strong className="text-secondary">Level:</strong>
            <span className="ms-2 text-dark">{lectures?.level || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
