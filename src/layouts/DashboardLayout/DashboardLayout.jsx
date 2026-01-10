import React, { useEffect, useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaParachuteBox, FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { MdOutlinePayment } from "react-icons/md";
import { RiContactsBook2Fill } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router";
import UseRole from "../../Hooks/UseRole";
import { FaBookBookmark } from "react-icons/fa6";
import { TbJewishStarFilled } from "react-icons/tb";
import Loading from "../../Components/Loading/Loading";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const DashboardLayout = () => {
  const { role, roleLoading } = UseRole();

  // Theme toggle state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 flex justify-between">
          <div className="flex items-center gap-3">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M9 4v16" />
                <path d="M14 10l2 2l-2 2" />
              </svg>
            </label>

            {roleLoading ? (
              <Loading />
            ) : (
              <h1 className="text-base-content playfair capitalize text-[clamp(2rem,3.5vw,3.75rem)] font-bold">
                {role} Dashboard
              </h1>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="btn btn-ghost btn-circle mr-2"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <BsMoonStarsFill className="text-lg" />
            ) : (
              <BsSunFill className="text-lg" />
            )}
          </button>
        </nav>

        <div className="w-full h-1 bg-primary"></div>

        {/* Page content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            {/* Home */}
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* Dashboard Links */}
            <li>
              <NavLink
                to={"/dashboard/my-profile"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My profile"
              >
                <CgProfile />
                <span className="is-drawer-close:hidden">My profile</span>
              </NavLink>
            </li>

            {role === "user" && (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/my-orders"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My orders"
                  >
                    <FaParachuteBox />
                    <span className="is-drawer-close:hidden">My orders</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/my-myWishList"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My wish List"
                  >
                    <TbJewishStarFilled />
                    <span className="is-drawer-close:hidden">My wish List</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/my-paymentHistory"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payment History"
                  >
                    <MdOutlinePayment />
                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/manageBooks"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Books"
                  >
                    <RiContactsBook2Fill />
                    <span className="is-drawer-close:hidden">Manage Books</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/AllUsers"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Users"
                  >
                    <FaUsers />
                    <span className="is-drawer-close:hidden">All Users</span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "librarian" && (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/addBooks"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Books"
                  >
                    <BiBookAdd />
                    <span className="is-drawer-close:hidden">Add Books</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/myBooks"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Books"
                  >
                    <ImBooks />
                    <span className="is-drawer-close:hidden">My Books</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/librarianOrders"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Librarian Orders"
                  >
                    <FaBookBookmark />
                    <span className="is-drawer-close:hidden">
                      Librarian Orders
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
