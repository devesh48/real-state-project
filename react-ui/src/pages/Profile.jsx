import { useSelector } from "react-redux"

export default function Profile() {
  const { currentUser } = useSelector(state => state.user)
  const loading = false
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* to bring image in the center we use self center, to bring text in the center we use text-center */}
        <img src={currentUser.photo} alt="profile" className="rounded-full w-24 h-24 flex-auto object-cover cursor-pointer self-center mt-2"></img>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-3xl"
          id="email"
        ></input>
        <input
          type="text"
          placeholder="User Name"
          className="border p-3 rounded-3xl"
          id="username"
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-3xl"
          id="password"
        ></input>
        <button
          disabled={loading}
          className="bg-slate-600 rounded-3xl text-white p-3 uppercase hover:opacity-85"
        >
          {loading ? "Loading...." : "Update"}
        </button>
      </form>
      <div className="flex gap-2 mt-4 justify-between">
        <span className="text-red-800 cursor-pointer font-semibold">Delete Account</span>
        <span className="text-red-800 cursor-pointer font-semibold">Sign Out</span>
      </div>
      {/* {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>} */}
    </div >
  )
}
