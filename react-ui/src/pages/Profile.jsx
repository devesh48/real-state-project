import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess } from "../redux/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector(state => state.user)
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});

  // this is used to persist value accross the applicaiton without re-rendering the page on updation of its value.
  const fileRef = useRef(null);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePercent(Math.round(progress));
    }, (err) => {
      console.log(err)
      setFileError(true)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, photo: downloadURL });
      });
    })
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)
    } catch (err) {
      dispatch(updateUserFailure(err));
    }
  }

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  //Firebase rule to upload image
  // allow read;
  //allow write: if request.resource.size < 2*1024*1024 &&
  //request.resource.contentType.matches('image/.*')

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* to bring image in the center we use self center, to bring text in the center we use text-center */}
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
        <img src={formData.photo || currentUser.photo} onClick={() => fileRef.current.click()} alt="profile" className="rounded-full w-24 h-24 flex-auto object-cover cursor-pointer self-center mt-2"></img>
        <p className='text-sm self-center'>
          {fileError ? (
            <span className='text-red-700'>Error Uploading Image to the server!!!</span>)
            : filePercent > 0 && filePercent < 100 ? (<span className='text-orange-500'>{`Uploading Image.....${filePercent}%`}</span>) : filePercent === 100 ? (<span className='text-green-600 font-bold'>Image Uploaded Successfully!!</span>) : ''}
        </p>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-3xl"
          id="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
        ></input>
        <input
          type="text"
          placeholder="User Name"
          className="border p-3 rounded-3xl"
          id="username"
          onChange={handleChange}
          defaultValue={currentUser.username}
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
          {loading ? "Loading...." : "Update"}
        </button>
      </form>
      <div className="flex gap-2 mt-4 justify-between">
        <span className="text-red-800 cursor-pointer font-semibold">Delete Account</span>
        <span className="text-red-800 cursor-pointer font-semibold">Sign Out</span>
      </div>
      {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}
    </div >
  )
}
