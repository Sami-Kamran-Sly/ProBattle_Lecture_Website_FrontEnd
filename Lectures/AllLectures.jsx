import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContextInfo";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AllLectures() {
  const [lectures, setLectures] = useState([]); 
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
      setLectures(data.lectures || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-5 p-5 bg-light rounded shadow-lg">
      <h2 className="text-center mb-5 text-primary fw-bold">
        📚 Explore Our Lectures
      </h2>

      {lectures.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {lectures.map((lecture) => (
            <div key={lecture._id} className="col">
              <div className="card shadow-lg rounded border-0 p-3 h-100">
                {/* Image & Video Section */}
                {(lecture.imageUrl || lecture.videoUrl) && (
                  <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-3">
                    {lecture.imageUrl && (
                      <img
                        src={lecture.imageUrl}
                        alt="Lecture"
                        className="img-fluid rounded shadow-sm"
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                      />
                    )}
                    {lecture.videoUrl && (
                      <video
                        controls
                        className="rounded shadow-sm"
                        style={{ width: "100%", height: "200px" }}
                      >
                        <source src={lecture.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                )}

                {/* Card Body */}
                <div className="card-body text-center">
                  <h5 className="card-title text-dark fw-bold">
                    {lecture.topic} <span className="badge bg-secondary">{lecture.level}</span>
                  </h5>
                  <p className="card-text">
                    <strong>Institute:</strong> {lecture.institute} <br />
                    <strong>Status:</strong>{" "}
                    <span className={`badge ${lecture.status === "Active" ? "bg-success" : "bg-danger"}`}>
                      {lecture.status}
                    </span>
                  </p>

                  {/* Main PDF */}
                  {lecture.pdfUrl && (
                    <a
                      href={lecture.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm mb-2 px-4 shadow-sm"
                    >
                      📄 View Main PDF
                    </a>
                  )}

                  {/* Multiple PDFs */}
                  {lecture.mulPdfUrls.length > 0 && (
                    <div className="text-start mt-3">
                      <strong>📚 Additional PDFs:</strong>
                      <ul className="list-group mt-2">
                        {lecture.mulPdfUrls.map((pdf, idx) => (
                          <li key={idx} className="list-group-item border-0 bg-light shadow-sm">
                            <a
                              href={pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none text-primary"
                            >
                              📄 PDF {idx + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="text-center mt-3">
                  <Link to={`/pdflecture/${lecture._id}`} className="btn btn-success px-4 py-2 shadow-sm">
                    View Your Lecture
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="fs-4 text-muted">⏳ Loading lectures...</p>
        </div>
      )}
    </div>
  );
}

export default AllLectures;

// import React, { useEffect, useState } from "react";
// import { useAuthContext } from "../context/AuthContextInfo";
// import { Link } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// function AllLectures() {
//   const [lectures, setLectures] = useState([]); // ✅ Always use an array
//   const { auth } = useAuthContext();

//   useEffect(() => {
//     getAllLecture();
//   }, []);

//   const getAllLecture = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/v1/lecture/getAllLecture`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: auth?.token,
//         },
//       });

//       if (!response.ok) throw new Error("Failed to fetch lectures");

//       const data = await response.json();
//       console.log("Fetched Data:", data);

//       setLectures(data.lectures || []); // ✅ Ensure it's always an array
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
// <div className="container my-4 p-4 mt-5  bg-light rounded shadow" >
//   <h2 className="text-center mb-4">📚 All Lectures</h2>

//   {lectures.length > 0 ? (
//     <div className="row row-cols-1 d-flex justify-content-center align-items-center g-4"

    
//     >
//       {lectures.map((lecture) => (
//         <div key={lecture._id} className="col d-flex justify-content-center    align-items-center">
//           <div className="card shadow-lg rounded border-0 p-3"
          
//           style={{ maxwidth: "550px", maxheight: "500px", }}
//           >
//             {/* ✅ Image & Video in Flex Row */}
//             {(lecture.imageUrl || lecture.videoUrl) && (
//               <div className="d-flex justify-content-center align-items-center flex-wrap gap-3">
//                 {lecture.imageUrl && (
//                   <img
//                     src={lecture.imageUrl}
//                     alt="Lecture"
//                     className="img-fluid rounded"
//                     style={{ width: "250px", height: "200px", objectFit: "cover" }}
//                   />
//                 )}
//                 {lecture.videoUrl && (
//                   <video
//                     controls
//                     className="rounded"
//                     style={{ width: "250px", height: "200px" }}
//                   >
//                     <source src={lecture.videoUrl} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 )}
//               </div>
//             )}

//             <div className="card-body text-center">
//               <h5 className="card-title">{lecture.topic} ({lecture.level})</h5>
//               <p className="card-text">
//                 <strong>Institute:</strong> {lecture.institute} <br />
//                 <strong>Status:</strong> {lecture.status}
//               </p>

//               {/* ✅ Show Main PDF */}
//               {lecture.pdfUrl && (
//                 <a href={lecture.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-2">
//                   📄 View Main PDF
//                 </a>
//               )}

//               {/* ✅ Show Multiple PDFs */}
//               {lecture.mulPdfUrls.length > 0 && (
//                 <div>
//                   <strong>📚 Additional PDFs:</strong>
//                   <ul className="list-group mt-2">
//                     {lecture.mulPdfUrls.map((pdf, idx) => (
//                       <li key={idx} className="list-group-item">
//                         <a href={pdf} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
//                           📄 PDF {idx + 1}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>

// <div>

//           <Link
//     to={`/pdflecture/${lecture._id}`}
//     className="btn btn-success px-4 py-2"
//     >
//     View Your Lecture
//   </Link>

//     </div>


//         </div>
//       ))}

//     </div>
//   ) : (
//     <div className="text-center">
//       <p className="fs-4">⏳ Loading lectures...</p>
//     </div>
//   )}
// </div>
//   );
// }

// export default AllLectures;
