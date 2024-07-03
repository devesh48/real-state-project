import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";

export default function Signin() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  // state.user ---> represent the name of state set in userSlice.js
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      //setLoading(true);
      const result = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        // setLoading(false)
        // SpeechSynthesisErrorEvent(data.message)
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      // setLoading(false)
      // SpeechSynthesisErrorEvent(error.message)
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-3xl"
          id="email"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-3xl"
          id="password"
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          className="bg-slate-600 rounded-3xl text-white p-3 uppercase hover:opacity-85"
        >
          {loading ? "Loading...." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-4">
        <p>Does have an Account???</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700 font-semibold">Sign-Up</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}
    </div>
  );
}
