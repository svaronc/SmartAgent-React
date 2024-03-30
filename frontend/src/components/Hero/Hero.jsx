import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1711356042156-da2e7ae500eb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-7xl font-bold">Welcome to SmartAgent</h1>
          <p className="mb-5 text-4xl font-bold">
            Are you a
          </p>
          <div className="flex items-center justify-center gap-5">
            <Link to="/" className="btn btn-primary w-[40%]">
            Customer
            </Link>
            <Link to="/login" className="btn btn-primary w-[40%]">
             SmartAgent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
