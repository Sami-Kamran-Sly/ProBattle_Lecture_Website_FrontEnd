import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextInfo";
import { useLectureContext } from "../context/LectureContextInfo";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PDFSpecificLecture = () => {
const navigate = useNavigate()
const { lecture,setLecture} = useLectureContext()
  const { pdfIVid } = useParams();
  const { auth } = useAuthContext();
  // const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getLecture = async () => {
      if (!pdfIVid) return;

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/lecture/getLecture/${pdfIVid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth?.token,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch lecture details");

        const data = await response.json();
        localStorage.setItem("LecturesData", JSON.stringify(data));
        setLecture((prevLecture) => ({
          ...prevLecture,
          ...data,
        }));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getLecture();
  }, [pdfIVid, auth?.token]);


  const deleteLecture = async () => {
    if (!window.confirm("Are you sure you want to delete this lecture?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/lecture/delete/${pdfIVid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
      });

      if (!response.ok) throw new Error("Failed to delete lecture");

      // alert("Lecture deleted successfully!");
      setLecture(null);
      navigate("/home"); // Redirect after deletion
    } catch (error) {
      alert(error.message);
    }
  };

  // Function to download PDF
  const downloadPDF = () => {
    if (lecture?.pdfUrl) {
      // Create an anchor element
      const link = document.createElement('a');
      link.href = lecture.pdfUrl;
      link.download = `${lecture.topic || 'lecture'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };




  if (loading) {
    return (
      <div className="container text-center mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center mt-4">{error}</p>;
  }

  if (!lecture) {
    return <p className="text-center mt-4">No Lecture Data Available</p>;
  }

  return (
 <div className="container d-flex   justify-content-center align-items-center vh-100"
 style={{marginTop:"60px"}}
 >
  <div className="card shadow-lg  p-4 w-100" style={{ maxWidth: "900px" }}>
    <h2 className="text-center mb-4 text-primary fw-bold">Lecture Details</h2>

    {/* Lecture Info */}
    <div className="row">
      <div className="col-md-6">
        <h4 className="mb-2 fw-bold"><strong>Topic:</strong> {lecture.topic}</h4>
        <p><strong>Professional Name: </strong> {lecture.user}</p>
        <p><strong>Level:</strong> {lecture.level}</p>
        <p><strong>Institute:</strong> {lecture.institute}</p>

        {/* PDF Download Button */}
        {lecture.pdfUrl && (
          <div className="mt-3">
            <h5 className="text-success fw-bold">Lecture PDF</h5>
            <button className="btn btn-success" onClick={downloadPDF}>
              Download PDF
            </button>
          </div>
        )}



      </div>
    </div>

    {/* Image & Video Section */}
    <div className="row mt-4 g-4">
      {/* Lecture Image */}
      {lecture.imageUrl && (
        <div className="col-md-6">
          <div className="p-3 border rounded shadow-sm bg-light text-center">
            <h5 className="text-success fw-bold">Lecture Image</h5>
            <img
              src={lecture.imageUrl}
              alt="Lecture"
              className="img-fluid rounded"
              style={{ height: "250px", objectFit: "cover" }}
            />
          </div>
        </div>
      )}

      {/* Lecture Video */}
      {lecture.videoUrl && (
        <div className="col-md-6">
          <div className="p-3 border rounded shadow-sm bg-light text-center">
            <h5 className="text-success fw-bold">Lecture Video</h5>
            <video className="border rounded shadow w-100" style={{ height: "250px" }} controls>
              <source src={lecture.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>


    <div className="d-flex   justify-content-center align-items-center gap-3">

<div>
  
    {/* Delete Lecture Button */}
    {auth?.token && (
      <div className="mt-3">
            <button className="btn btn-danger" onClick={deleteLecture}>
              Delete Lecture
            </button>
          </div>
        )}

        </div>

        <div>
  
  {auth?.token && (
    <div className="mt-3">
          <button className="btn btn-danger" 
          // onClick={deleteLecture}
          >
            Update Lecture
          </button>
        </div>
      )}

      </div>

</div>
  </div>



</div>

  );
};

export default PDFSpecificLecture;


















// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContextInfo";

// const PDFSpecificLecture = () => {
//   const { id } = useParams();
//   const { auth } = useAuthContext();
//   const [lecture, setLecture] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const getLecture = async () => {
//       if (!id) return;

//       setLoading(true);
//       setError("");

//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/v1/lecture/getLecture/${id}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: auth?.token,
//             },
//           }
//         );

//         if (!response.ok) throw new Error("Failed to fetch lecture details");

//         const data = await response.json();
//         setLecture(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getLecture();
//   }, [id, auth?.token]);

//   if (loading) {
//     return (
//       <div className="container text-center mt-4">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="text-danger text-center mt-4">{error}</p>;
//   }

//   if (!lecture) {
//     return <p className="text-center mt-4">No Lecture Data Available</p>;
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-lg p-4">
//         <h2 className="text-center mb-4 text-primary fw-bold">Lecture Details</h2>

//         {/* Lecture Info */}
//         <div className="row">
//           <div className="col-md-6">
//             <h4 className="mb-2 fw-bold">{lecture.topic}</h4>
//             <p><strong>Instructor:</strong> {lecture.user}</p>
//             <p><strong>Level:</strong> {lecture.level}</p>
//             <p><strong>Institute:</strong> {lecture.institute}</p>

//             {/* Lecture PDF Button */}
//             {lecture.pdfUrl && (
//   <>
//     <h5 className="text-success fw-bold">Lecture PDF</h5>
//     <div className="mt-2">
 
//     <button
//   className="btn btn-primary"
//   onClick={() => window.open(lecture.pdfUrl, "_blank", "noopener,noreferrer")}
// >
//   Open PDF
// </button>
//     </div>
//   </>
// )}

//           </div>
//         </div>

//         {/* PDF & Image (Flexbox) */}
//         <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
//           {/* Lecture Image */}
//           {lecture.imageUrl && (
//             <div className="p-3 border rounded shadow-sm bg-light text-center">
//               <h5 className="text-success fw-bold">Lecture Image</h5>
//               <img
//                 src={lecture.imageUrl}
//                 alt="Lecture"
//                 className="img-fluid rounded"
//                 style={{ width: "100%", height: "400px", objectFit: "cover" }}
//               />
//             </div>
//           )}
//         </div>

//         {/* Video Section */}
//         {lecture.videoUrl && (
//         <div className="mt-4 text-center">
//         <h5 className="text-success fw-bold">Lecture Video</h5>
//         <div className=" mx-auto  w-100 ">
//           <video className="border rounded shadow  videoclass " controls>
//             <source src={lecture.videoUrl} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       </div>
      
        
//         )}
//       </div>
//     </div>
//   );
// };

// export default PDFSpecificLecture;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContextInfo";

// const PDFSpecificLecture = () => {
//   const { id } = useParams();
//   const { auth } = useAuthContext();
//   const [lecture, setLecture] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const getLecture = async () => {
//       if (!id) return;

//       setLoading(true);
//       setError("");

//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/v1/lecture/getLecture/${id}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: auth?.token,
//             },
//           }
//         );

//         if (!response.ok) throw new Error("Failed to fetch lecture details");

//         const data = await response.json();
//         setLecture(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getLecture();
//   }, [id, auth?.token]);

//   if (loading) {
//     return (
//       <div className="container text-center mt-4">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="text-danger text-center mt-4">{error}</p>;
//   }

//   if (!lecture) {
//     return <p className="text-center mt-4">No Lecture Data Available</p>;
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-lg p-4">
//         <h2 className="text-center mb-4 text-primary fw-bold">Lecture Details</h2>
        
//         {/* Lecture Info */}
//         <div className="row">
//           <div className="col-md-6">
//             <h4 className="mb-2 fw-bold">{lecture.topic}</h4>
//             <p><strong>Instructor:</strong> {lecture.user}</p>
//             <p><strong>Level:</strong> {lecture.level}</p>
//             <p><strong>Institute:</strong> {lecture.institute}</p>
//                     {/* Lecture PDF */}
//           {lecture.pdfUrl && (
//             <>
//               <h5 className="text-success fw-bold ">Lecture PDF</h5>
        
//               <div className="mt-2 ">
//                 <a href={lecture.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
//                   Open PDF
//                 </a>
//               </div>
              
//               </>
        
//           )}
//           </div>
//         </div>

//         {/* PDF & Image (Flexbox) */}
//         <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
  

//           {/* Lecture Image */}
//           {lecture.imageUrl && (
//             <div className="p-3 border rounded shadow-sm bg-light text-center">
//               <h5 className="text-success fw-bold">Lecture Image</h5>
//               <img
//                 src={lecture.imageUrl}
//                 alt="Lecture"
//                 className="img-fluid rounded"
//                 style={{ width: "100%", height: "400px", objectFit: "cover" }}
//               />
//             </div>
//           )}
//         </div>

//         {/* Video Section (Takes Half Width) */}
//         {lecture.videoUrl && (
//           <div className="mt-4 text-center">
//             <h5 className="text-success fw-bold">Lecture Video</h5>
//             <video
//                 className="w-100 w-md-50 border rounded shadow"
//             height="200"
//               controls
//             >
//               <source src={lecture.videoUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default PDFSpecificLecture;

// import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContextInfo";


// const PDFSpecificLecture = () => {
//   const { id } = useParams(); // Get lecture ID from URL
//   const { auth } = useAuthContext(); // Get authentication details

//   const [lecture, setLecture] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const getLectureDetails = async () => {
//     if (!id) return; // Ensure we have a valid ID

//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch(`http://localhost:5000/api/v1/lecture/getLecture/${id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: auth?.token,
//         },
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Failed to fetch lecture");

//       setLecture(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getLectureDetails();
//   }, [id, auth?.token]);

//   if (loading) {
//     return <p className="text-center mt-4">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-danger text-center">{error}</p>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Lecture Details</h2>
//       {lecture ? (
//         <div className="card p-4 shadow">
//           <h3>{lecture.topic}</h3>
//           <p><strong>Instructor:</strong> {lecture.user}</p>
//           <p><strong>Level:</strong> {lecture.level}</p>
//           <p><strong>Institute:</strong> {lecture.institute}</p>

//           {lecture.pdfUrl && (
//             <div className="mb-3">
//               <h5>Lecture PDF</h5>
//               <iframe src={lecture.pdfUrl} width="100%" height="500px" title="Lecture PDF"></iframe>
//             </div>
//           )}

//           {lecture.imageUrl && (
//             <div className="mb-3">
//               <h5>Lecture Image</h5>
//               <img
//                 src={lecture.imageUrl}
//                 alt="Lecture"
//                 className="img-fluid rounded"
//                 style={{ maxWidth: "100%", height: "auto" }}
//               />
//             </div>
//           )}

//           {lecture.videoUrl && (
//             <div className="mb-3">
//               <h5>Lecture Video</h5>
//               <video controls width="100%">
//                 <source src={lecture.videoUrl} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           )}

//           <button className="btn btn-primary" onClick={() => navigate(`/edit/${id}`)}>
//             Edit Lecture
//           </button>
//         </div>
//       ) : (
//         <p className="text-center">No Lecture Data Available</p>
//       )}
//     </div>
//   );
// }



// export default PDFSpecificLecture;
