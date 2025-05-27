import React from 'react';

export default function Footer () {
    return (
        <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8 md:h-20"> 
                {/* Logo */}
                    <span className="text-lg font-bold">TicketOffice</span>
                    <div className="mt-4 md:mt-0">
                        <p className="mb-4">&copy; {new Date().getFullYear()} Ticket Office. All rights reserved.</p>
                        <nav aria-label="Footer Navigation" className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                            <ul className="flex space-x-4">
                                <li>
                                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="/terms" className="hover:underline">Terms of Service</a>
                                </li>
                                <li>
                                    <a href="/contact" className="hover:underline">Contact Us</a>
                                </li>
                            </ul>
                            <ul className="flex space-x-4 items-center">
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        <i className="fa fa-facebook"></i> {/* Facebook icon */}
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-400">
                                        <i className="fa fa-twitter"></i> {/* Twitter icon */}
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-pink-500">
                                        <i className="fa fa-instagram"></i> {/* Instagram icon */}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </footer>
    );
}