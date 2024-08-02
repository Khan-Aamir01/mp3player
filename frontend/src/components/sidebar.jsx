import UserProfile from "./userProfile";

function Sidebar() {
    return (
      <div className="bg-gray-800 w-1/4  h-screen fixed top-0 left-0 flex flex-col">
        <UserProfile />
        <div className="flex-grow">
          <ul className="space-y-4">
            <li>
              <a href="#" className="ml-4 text-white hover:bg-gray-700 px-4 py-2 block">New Songs</a>
            </li>
            <li>
              <a href="#" className="ml-4 text-white hover:bg-gray-700 px-4 py-2 block">History</a>
            </li>
            <li>
              <a href="#" className="ml-4 text-white hover:bg-gray-700 px-4 py-2 block">Download</a>
            </li>
          </ul>
        </div>
        <div className="flex-shrink-0 p-4">
          <a href="#" className="text-white hover:bg-gray-700 px-4 py-2 block">Settings</a>
        </div>
      </div>
    );
  }
  
  export default Sidebar;