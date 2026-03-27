import { useEffect } from "react";
import { useSelector } from "react-redux";
import useChat from "../hooks/useChat";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const chat = useChat();

  useEffect(() => {
    chat.initializeSocketConnection();
  }, [chat]);

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome, {user?.username || "User"}!
      </h1>
    </div>
  );
};

export default Dashboard;
