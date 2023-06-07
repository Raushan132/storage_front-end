import { Link } from "react-router-dom"


const TopBar = () => {
    return (
        <>
          
            <div className="navbar bg-base-200 fixed z-10">
               
                <div className="flex-grow pl-72 gap-2">
                    <div className="flex-1 form-control">
                        <div className="input-group">
                            <input type="text" placeholder="Search…" className="input input-bordered" />
                            <button className="btn btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end pr-6">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52">
                            <li>
                                <Link to="/user/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopBar