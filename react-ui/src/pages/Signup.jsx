import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="border p-3 rounded-3xl" id="username"></input>
        <input type="text" placeholder="Email" className="border p-3 rounded-3xl" id="email"></input>
        <input type="text" placeholder="Password" className="border p-3 rounded-3xl" id="password"></input>
        <button className="bg-slate-600 rounded-3xl text-white p-3 uppercase hover:opacity-85">Sign Up</button>
      </form>
      <div className="flex gap-2 mt-4">
        <p>Have an Account???</p>
        <Link to={'/sign-in'}>
          <span className="text-blue-700">Sign-In</span>
        </Link>
      </div>
    </div>
  )
}
