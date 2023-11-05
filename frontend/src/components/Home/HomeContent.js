import { useNavigate } from "react-router-dom";

export default function HomeContent() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Welcome To Brewery</h1>
      <p>Please select an option from below</p>
      <div className="home-buttons">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </>
  );
}
