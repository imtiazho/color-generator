import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../Firebase.init';
import useNav from '../../Hooks/useNav';
import '../../Style/Common-style.css'

const Nav = () => {
    const [user] = useAuthState(auth)
    const { navbar } = useNav()
    const handleSignOut = () => {
        signOut(auth)
    }
    return (
        <nav className={`border-gray-200 px-2 sm:px-8 py-2.5 fixed w-full top-0 z-50 transition-all ${navbar && "bg-white shadow-lg"
            }`}>
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <h1 className='text-2xl md:font-medium'>Habibi</h1>

                <div className="hidden w-full md:block md:w-auto">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg">
                        <li>
                            <Link to='/' className="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/generator"
                                className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover: dark:hover:bg-gray-700 dark:hover: md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Generator
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover: dark:hover:bg-gray-700 dark:hover: md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Docs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="block py-2 pr-4 pl-3  hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover: dark:hover:bg-gray-700 dark:hover: md:dark:hover:bg-transparent"
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            {user ?
                                <Link onClick={handleSignOut}
                                    to="/login"
                                    className="block py-2 pr-4 pl-3  hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover: dark:hover:bg-gray-700 dark:hover: md:dark:hover:bg-transparent"
                                >
                                    Logout
                                </Link>
                                :
                                <Link
                                    to="/login"
                                    className="block py-2 pr-4 pl-3  hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover: dark:hover:bg-gray-700 dark:hover: md:dark:hover:bg-transparent"
                                >
                                    Login
                                </Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;