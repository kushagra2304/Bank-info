import { NavLink } from "react-router-dom";

export default function Navbar1() {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Banks", path: "/banks" },
    { name: "Cases", path: "/cases" },
    { name: "Entity", path: "/entity" },
    { name: "Statement", path: "/statement" },
    { name: "Categories", path: "/categories" },
    { name: "Narration Types", path: "/narration-types" },
    { name: "Sub Types", path: "/sub-types" },
  ];

  return (
    <nav className="w-full bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-8 h-14">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition duration-200 
                ${
                  isActive
                    ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                    : "text-white hover:text-yellow-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}