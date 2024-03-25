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
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="flex items-center justify-center gap-5">
            <Link to="/login" className="btn btn-primary w-[30%]">
             Login
            </Link>
            <Link to="/" className="btn btn-primary w-[30%]">
            Get Assistance
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
