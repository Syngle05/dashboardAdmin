import { sideBarContext } from "./sideBarContext";
import { useState } from "react";
function SideBarProvider({ children }) {
  const [titleState, setTitleState] = useState("");
  const [lineState, setLineState] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <sideBarContext.Provider
      value={{
        titleState,
        setTitleState,
        lineState,
        setLineState,
        isExpanded,
        toggleSidebar,
      }}
    >
      {children}
    </sideBarContext.Provider>
  );
}

export default SideBarProvider;
