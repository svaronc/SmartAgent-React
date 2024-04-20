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
  console.log("currentAgent", currentAgent);
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
    <div className="h-full flex flex-col items-center justify-center">

      <div className="flex flex-col items-center justify-center w-1/2 p-10 bg-white shadow rounded-lg">
        <div className="flex justify-center items-center h-24 w-24 mb-3 bg-gray-200 text-gray-700 rounded-full mx-3">
          <span className="text-4xl">{currentAgent?.full_name.charAt(0)}</span>
        </div>
        <h1 className="text-xl font-semibold">{currentAgent?.full_name}</h1>
        <p className="text-gray-600">{currentAgent?.email}</p>
        <div className="w-full px-3 p-5 m-5">
        <h1 className="text-2xl font-semibold mb-5">Reset Password</h1>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
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
            className="block text-sm font-medium text-gray-700 mt-5"
          >
            Confirm Password
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
    </div>
  );
}

export default Profile;
