import { Link } from "react-router-dom";
import OrderTable from "../components/OrderTable";
import UserProfile from "../components/UserProfile";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./UserPage.css";

const UserPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="UserPageContainer">
      <h1 className="UserPageHeading">User Page</h1>
      {user.role === 1 && (
        <Link to="/managerpanel">
          <p>
            cos trzeba tutaj dodac ale narazie to jest link ktory prowadzi do
            strony na ktorej mozna dodawac wino, co ciekawe chyba nawet działa,
            pozdrawiam serdecznie
          </p>
        </Link>
      )}

      <UserProfile />
      <OrderTable />
    </div>
  );
};

export default UserPage;
