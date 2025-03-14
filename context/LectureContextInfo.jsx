import { createContext, useContext, useEffect, useState } from "react";

const LectureContext = createContext();

export const useLectureContext = () => useContext(LectureContext);

function LectureContextInfo({ children }) {
  const [lecture, setLecture] = useState({
    id: "",
    user: "",
    status: "",
    institute: "",
    topic: "",
    level: "",
    pdfUrl: "",
    imageUrl: "",
    videoUrl: "",
  });

  useEffect(() => {
    const storedLecture = localStorage.getItem("lectureData");
    if (storedLecture) {
      setLecture(JSON.parse(storedLecture));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lectureData", JSON.stringify(lecture));
  }, [lecture]);

  return (
    <LectureContext.Provider value={{ lecture, setLecture }}>
      {children}
    </LectureContext.Provider>
  );
}

export default LectureContextInfo;
