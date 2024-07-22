import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Cookies from "js-cookie";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    Cookies.remove("token");
    navigate("/auth"); // Navigate to the auth page on logout
  };

  // Generate breadcrumb items based on current route
  const generateBreadcrumbItems = () => {
    const paths = location.pathname.split("/").filter((path) => path !== "");
    const breadcrumbItems = [{ name: "Auth", path: "/auth" }]; // Adjust breadcrumb to reflect auth page

    paths.reduce((prevPath, currentPath) => {
      const fullPath = `${prevPath}/${currentPath}`;
      breadcrumbItems.push({
        name: currentPath.charAt(0).toUpperCase() + currentPath.slice(1), // Capitalize first letter
        path: fullPath,
      });
      return fullPath;
    }, "/auth"); // Start breadcrumb path from /auth

    return breadcrumbItems;
  };

  return (
    <div className="w-full min-h-screen flex relative bg-gray-200 text-black">
      <div className="w-[20%] flex flex-col gap-4 border-r border-gray-400 bg-gray-800 min-h-screen">
        <div className="mt-10">
        </div>
        <div className="mt-6 flex flex-col space-y-4 pl-3 flex-1 text-white">
          <Link to="/auth" className="font-bold text-xl hover:text-customGreen">
            Auth
          </Link>
        </div>
        {/* button logout */}
        <Button variant={"destructive"} onClick={() => logout()} className="w-20 h-8 mt-auto mb-6 mx-3">
          Log out
        </Button>
      </div>
      <div className="w-full ml-4 p-6">
        {/* Breadcrumb component for navigation */}
        <Breadcrumb items={generateBreadcrumbItems()} />
        {children}
      </div>
    </div>
  );
}
