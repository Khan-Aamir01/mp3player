import { Outlet } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

const Header = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-emerald-300 via-teal-400 to-green-500 py-2 shadow-lg shadow-emerald-700 border-b border-black text-black flex items-center justify-between md:px-10 px-2 sticky top-0">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2 flex-wrap">
          <IoMdMenu className="text-3xl font-bold cursor-pointer" />
          <img
            className="w-10 rounded-full cursor-pointer shadow-lg"
            src="https://static.vecteezy.com/system/resources/previews/047/939/397/large_2x/illustration-of-headphone-vector.jpg"
            alt="solker Logo"
          />
          <h1 className="font-bold text-xl cursor-pointer">Solker</h1>
        </div>

        {/* Search Bar */}
        <div>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search music..."
            className="px-4 py-2 rounded-lg ring-2 shadow-lg outline-none"
          />
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
