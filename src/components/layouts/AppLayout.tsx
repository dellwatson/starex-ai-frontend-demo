import { Outlet } from "react-router-dom";
// import HeaderMenu from "../menus/HeaderMenu";

export function Applayout() {
  return (
    <>
      {/* <HeaderMenu /> */}
      <Outlet />
      {/* <div className="flex-grow flex flex-col">
        <div className="container px-4 md:px-8 flex-grow flex flex-col ">
          <Outlet />
        </div>
      </div> */}
      <div className="container w-full px-4 md:px-8">{/* <Footer /> */}</div>
    </>
  );
}
