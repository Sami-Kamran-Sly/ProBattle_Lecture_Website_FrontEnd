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
    const storedLecture = localStorage.getItem("LecturesData");
    if (storedLecture) {
      const parseData = JSON.parse(storedLecture)

      setLecture({
        pdfIVid: parseData.pdfIVid,
        user: parseData.user,
        status: parseData.status,
        institute: parseData.institute,
        topic: parseData.topic,
        level: parseData.level,
        pdfUrl: parseData.pdfUrl,
        imageUrl: parseData.imageUrl,
        videoUrl: parseData.videoUrl,
        
      })
    }




    // const data = localStorage.getItem("auth");

    // if (data) {
    //   const parseData = JSON.parse(data);

    //   SetAuth({
    //     ...auth,
    //     user: parseData.user,
    //     token: parseData.token,
    //   });
    // }

  }, []);


  return (
    <LectureContext.Provider value={{ lecture, setLecture }}>
      {children}
    </LectureContext.Provider>
  );
}

export default LectureContextInfo;
