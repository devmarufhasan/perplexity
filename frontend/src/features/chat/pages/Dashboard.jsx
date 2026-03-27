import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome, {user?.username || "User"}!
      </h1>
    </div>
  );
};

export default Dashboard;
