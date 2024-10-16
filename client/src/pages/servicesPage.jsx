import Benefits from "../components/Benefits";
import { useLocation } from "react-router-dom";

export default function Services() {
  //check what currentpage we are in
  const location = useLocation();
  const pathName = location.pathname;
  const isServicePage = pathName === "/services";

  return <Benefits isServicePage={isServicePage} />;
}
