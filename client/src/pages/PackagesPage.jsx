import Plan from "../components/Plan";
import { useLocation } from "react-router-dom";

export default function Packages() {
  //check what currentpage we are in
  const location = useLocation();
  const pathName = location.pathname;
  const isPackagesPage = pathName === "/packages";
  return <Plan isPackagesPage={isPackagesPage} />;
}
