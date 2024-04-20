import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";


function Profile() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const { state } = useAppContext();
  const logAgentId = localStorage.getItem("agent_id");
  const currentAgent = state.agents.find(
    (agent) => agent.id === Number(logAgentId)
  );
  console.log(currentAgent);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };
  const handleSubmit = () => {
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (!password || !repeatPassword) {
      setErrorMessage("Both fields must be filled out");
      return;
    } else {
      axios
        .put(`/api/v1/agents/${currentAgent.id}`, { agent: { password }})
        .then((response) => {
          setMessage(response.data.message);
          setPassword("");
          setRepeatPassword("");
          setErrorMessage("");
        });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow rounded-lg">
      <img
        className="w-24 h-24 rounded-full mb-4"
        src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Profile"
      />
      <h1 className="text-xl font-semibold">{currentAgent?.full_name}</h1>
      <p className="text-gray-600">{currentAgent?.email}</p>
      <div className="mt-4 w-full px-3">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Change Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Repeat Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
      {message && <p className="text-green-500 mt-3">{message}</p>}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default Profile;
