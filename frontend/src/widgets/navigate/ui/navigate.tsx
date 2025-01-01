import { pathNavigate } from "@/shared/utils/routes/navigate";
import { NavLink } from "react-router-dom";

const Navigate = () => {
  return (
    <nav className="flex-col bg-gray-300 flex w-[72px] items-center min-h-screen space-y-5 py-2">
      <section className="flex-col flex space-y-2">
        {pathNavigate.map((navigate) => (
          <NavLink
            to={navigate.path}
            className={({ isActive }) =>
              isActive
                ? "h-[52px] cursor-pointer bg-gray-500 text-white w-[52px] before:rounded-3xl rounded-full  flex items-center justify-center transition-all duration-150 ease-in-out hover:rounded-2xl"
                : "h-[52px] cursor-pointer bg-gray-500 text-white w-[52px] before:rounded-3xl rounded-full  flex items-center justify-center transition-all duration-150 ease-in-out hover:rounded-2xl"
            }
          >
            <span>{navigate.icon}</span>
          </NavLink>
        ))}
      </section>
    </nav>
  );
};

export default Navigate;
