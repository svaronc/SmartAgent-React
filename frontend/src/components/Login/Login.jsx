import login from "../../assets/login.svg";
import { FcGoogle } from "react-icons/fc";
import "./styles.css";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
      <div className="relative background__card rounded-s-2xl ">
          <img
            src={login}
            alt="login image"
            className="h-[90%] hidden rounded-r-2xl lg:block object-cover"
          />
        </div>
        {/* Right side */}
        <form
          className="flex flex-col justify-center p-8 md:p-14"
          action="/submit-your-login-form"
          method="POST"
        >
          <h1 className="mb-3 text-4xl font-bold">Welcome back</h1>
          <p className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details.
          </p>
          <div className="py-4">
            <label htmlFor="email" className="mb-2 text-md">
              Email
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              required
            />
          </div>
          <div className="py-4">
            <label htmlFor="pass" className="mb-2 text-md">
              Password
            </label>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              required
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <label htmlFor="ch" className="text-md">
                Remember me
              </label>
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full p-2 rounded-lg mb-6"
          >
            Sign in
          </button>
          <button
            type="button"
            className="btn btn-primary w-full p-2 rounded-lg mb-6"
            onClick={() => {
              /* handle sign in with Google */
            }}
          >
           <FcGoogle className = "w-[20px] h-[20px]"/> Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
