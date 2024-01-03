import OrderTable from "../components/OrderTable";
import UserProfile from "../components/UserProfile";
import "./UserPage.css";

const UserPage = () => {
  return (
    <div className="UserPageContainer">
      <h2 className="UserPageHeading">User Page</h2>
      <UserProfile />
      <OrderTable />
    </div>
  );
};

export default UserPage;
