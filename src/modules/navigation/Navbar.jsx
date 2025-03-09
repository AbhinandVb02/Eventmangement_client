import { LogOut } from "lucide-react";
import React from "react";

export const Navbar = () => {
  const navLinks = [
    { label: "Home", href: "/home" },
    { label: "Events", href: "/view_Event" },
    { label: "Task", href: "/view_Task" },
    // { label: "Contact", href: "#" },
  ];

  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <nav className="bg-white shadow-sm px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center font-semibold">EV</div>

        <div className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <img
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            alt=""
            className="h-[40px] w-[40px]"
          />

          <LogOut size={22} onClick={handleLogOut}/>
        </div>
      </div>

      <div className="block md:hidden">
        <button className="text-gray-700 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};
