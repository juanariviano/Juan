import { createContext, useContext, useState } from "react";
import CvModal from "../components/CvModal";

const CvModalContext = createContext(null);

export function CvModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <CvModalContext.Provider
      value={{
        openCv: () => setOpen(true),
        closeCv: () => setOpen(false),
      }}
    >
      {children}
      <CvModal open={open} onClose={() => setOpen(false)} />
    </CvModalContext.Provider>
  );
}

export function useCvModal() {
  const ctx = useContext(CvModalContext);
  if (!ctx) throw new Error("useCvModal must be used within CvModalProvider");
  return ctx;
}
