import { createContext, useContext, useEffect, useState } from "react";

const LectureContext = createContext();

export const useLectureContext = () => useContext(LectureContext);

function LectureContextInfo({ children }) {
  const [lecture, setLecture] = useState({
    _id: null, // Correct ID field
    status: "",
    institute: "",
    topic: "",
    level: "",
    pdfUrl: "",
    mulPdfUrls: [],
    imageUrl: "",
    videoUrl: "",
  });
  useEffect(() => {
    const storedLecture = localStorage.getItem("LecturesData");
    if (storedLecture) {
      const parseData = JSON.parse(storedLecture);
  
      setLecture({
        _id: parseData._id, // Ensure 'lecture' is part of stored structure
        status: parseData.status,
        institute: parseData.institute,
        topic: parseData.topic,
        level: parseData.level,
        pdfUrl: parseData.pdfUrl,
        mulPdfUrls: parseData.mulPdfUrls,
        imageUrl: parseData.imageUrl,
        videoUrl: parseData.videoUrl,
      });
    }
  }, []);// Empty dependency array to run only once on mount

  return (
    <LectureContext.Provider value={{ lecture, setLecture }}>
      {children}
    </LectureContext.Provider>
  );
}

export default LectureContextInfo;
