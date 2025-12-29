import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    const res = await API.post("/auth/login", { email, password });
    login(res.data.token);
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <input className="border w-full p-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="border w-full p-2 mt-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit} className="bg-blue-600 text-white w-full p-2 mt-3">
        Login
      </button>
    </div>
  );
}
