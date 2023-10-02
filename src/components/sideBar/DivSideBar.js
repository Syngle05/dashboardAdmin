import useSideBarContext from "../../hooks/useSideBarContext";

function DivSideBar(props) {
  const { titleState } = useSideBarContext();

  return (
    <>
      {props.divName === titleState && (
        <div className="sidebar">{props.children}</div>
      )}
    </>
  );
}

export default DivSideBar;
