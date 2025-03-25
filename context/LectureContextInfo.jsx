import { createContext, useContext,  useState } from "react";

const LectureContext = createContext();

export const useLectureContext = () => useContext(LectureContext);

function LectureContextInfo({ children }) {
  const [lectures,setLectures] = useState(null)
  return (
    <LectureContext.Provider value={{ lectures,setLectures }}>
      {children}
    </LectureContext.Provider>
  );
}

export default LectureContextInfo;
