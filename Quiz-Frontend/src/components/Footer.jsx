import React from "react";
import { Link } from "react-router-dom";
import { REAL_EMAIL, REAL_NAME, REAL_NUMBER } from "../helper/constants";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="px-2 py-20 mx-auto max-w-7xl">
          <div className="pt-12 border-t border-gray-300 flex flex-col md:flex-row gap-10 items-center justify-between">
            {/* Left Section */}
            <div className="text-black flex flex-col">
              <Link to="/" className="font-bold text-xl mx-auto md:mx-0">
                <span className="text-purple-500">
                  <i className="bi bi-bookmark-fill"></i> Quiz
                </span>
                Me
              </Link>
              <p className="mt-2 text-sm text-gray-500 lg:w-4/5">
                Put your knowledge to the test
              </p>
            </div>

            {/* Contact Information (Bottom-right on larger screens) */}
            <div className="text-sm text-gray-500 text-center md:text-right">
              <h2 className="text-black font-bold text-lg">Contact Me</h2>
              <p>Name: {REAL_NAME}</p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${REAL_EMAIL}`}
                  className="hover:text-purple-500"
                >
                  {REAL_EMAIL}
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href={`tel:+${REAL_NUMBER}`}
                  className="hover:text-purple-500"
                >
                  {REAL_NUMBER}
                </a>
              </p>
            </div>
          </div>

          {/* Bottom copyright row */}
          <div className="flex flex-col pt-12 md:flex-row md:items-center md:justify-between">
            <p className="text-center md:text-left">
              <span className="mx-auto mt-2 text-sm text-gray-500 lg:mx-0">
                ©copyright 2025
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
