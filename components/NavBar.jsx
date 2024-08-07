import React, { useState, useContext } from "react";
import Link from 'next/link'; // Import Link from next/link
import { CrowdFundingContext } from '../Context/CroudFunding';
import { Close, Logo, Menu } from '@/components/index';

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = ["White Paper", "Project", "Donation", "Members"];

  const formatAddress = (address) => {
    return `${address.slice(0, 3)}...${address.slice(-5)}`;
  };

  return (
      <div className="backgroundMain">
        <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <Link
                  href="/"
                  aria-label="Company"
                  title="Company"
                  className="inline-flex items-center mr-8"
              >
                {/*<Logo />*/}
                <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                Company
              </span>
              </Link>
              <ul className="flex items-center space-x-8 lg:flex">
                {menuList.map((el, i) => (
                    <li key={i + 1}>
                      <Link
                          href={`/${el.toLowerCase().replace(/\s+/g, '-')}`} // Replace with actual paths if needed
                          aria-label={el}
                          title={el}
                          className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-400"
                      >
                        {el}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
            {!currentAccount ? (
                <ul className="items-center hidden space-x-8 lg:flex">
                  <li>
                    <button
                        onClick={() => connectWallet()}
                        className="inline-flex items-center justify-between h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-3xl shadow-md bg-teal-500 hover:bg-teal-600 focus:shadow-outline focus:outline-none background"
                        aria-label="Connect Wallet"
                        title="Connect Wallet"
                    >
                      Connect Wallet
                    </button>
                  </li>
                </ul>
            ) : (
                <ul className="items-center hidden space-x-8 lg:flex">
                  <li>
                <span className="font-medium tracking-wide text-gray-100">
                  <button
                      className="inline-flex items-center justify-between h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-3xl shadow-md bg-teal-500 hover:bg-teal-600 focus:shadow-outline focus:outline-none background"
                      aria-label="Account"
                      title="Account"
                  >
                    {formatAddress(currentAccount)}
                  </button>
                </span>
                  </li>
                </ul>
            )}
            <div className="lg:hidden z-40">
              <button
                  aria-label="Open Menu"
                  title="Open Menu"
                  className="p-2 -mr-1 transition duration-200 rounded-2xl focus:outline-non focus:shadow-outline"
                  onClick={() => setIsMenuOpen(true)}
              >
                <svg
                    className="w-5 text-white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      fill="currentColor"
                      d="M12 2L2 22h20L12 2z"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                  <div className="absolute top-0 left-0 w-full">
                    <div className="p-5 bg-white border rounded shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <Link
                              href="/"
                              aria-label="Company"
                              title="Company"
                              className="inline-flex items-center"
                          >
                            <Logo color="text-black" />
                            <span className="ml-2 text-2xl font-bold tracking-wide text-gray-800 uppercase">
                          Company
                        </span>
                          </Link>
                        </div>
                        <div>
                          <button
                              aria-label="Close Menu"
                              title="Close Menu"
                              className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                              onClick={() => setIsMenuOpen(false)}
                          >
                            <svg
                                className="w-5 text-gray-600"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                  fill="currentColor"
                                  d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <nav>
                        <ul className="space-y-4">
                          {menuList.map((el, i) => (
                              <li key={i + 1}>
                                <Link
                                    href={`/${el.toLowerCase().replace(/\s+/g, '-')}`} // Replace with actual paths if needed
                                    aria-label={el}
                                    title={el}
                                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"
                                >
                                  {el}
                                </Link>
                              </li>
                          ))}
                          {!currentAccount ? (
                              <li>
                                <button
                                    onClick={() => connectWallet()}
                                    className="inline-flex items-center background justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-400 hover:bg-teal-600 focus:shadow-outline focus:outline-none"
                                    aria-label="Connect Wallet"
                                    title="Connect Wallet"
                                >
                                  Connect Wallet
                                </button>
                              </li>
                          ) : (
                              <li>
                          <span className="font-medium tracking-wide text-gray-700">
                            <button
                                className="inline-flex items-center justify-between h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-3xl shadow-md bg-teal-500 hover:bg-teal-600 focus:shadow-outline focus:outline-none background"
                                aria-label="Account"
                                title="Account"
                            >
                              {formatAddress(currentAccount)}
                            </button>
                          </span>
                              </li>
                          )}
                        </ul>
                      </nav>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default NavBar;