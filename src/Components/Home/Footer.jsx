import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                {/* Contact Section */}
                <div>
                    <h3 className="text-2xl font-bold text-blue-500">Earn<span className="text-white">Flow</span></h3>
                    <p className="mt-4">
                        <span className="block"><strong>Email:</strong> support@earnflow.com</span>
                        <span className="block mt-2"><strong>Address:</strong> 125 Tech Street, Berlin, Germany</span>
                        <span className="block"><strong>Phone:</strong> +49 123 456 7890</span>
                    </p>
                    <div className="flex items-center space-x-4 mt-4">
                        <Link to='https://www.facebook.com/mahabub.bsc.7' className="text-blue-500 hover:text-white">
                            <FaFacebookF size={30} />
                        </Link>
                        <Link href="https://twitter.com" className="text-blue-500 hover:text-white">
                            <FaTwitter size={30} />
                        </Link>
                        <Link href="https://linkedin.com" className="text-blue-500 hover:text-white">
                            <FaLinkedinIn size={30} />
                        </Link>
                        <Link href="https://github.com" className="text-blue-500 hover:text-white">
                            <FaGithub size={30} />
                        </Link>
                    </div>
                </div>

                {/* FAQ Section */}
                <div>
                    <h4 className="text-lg font-bold text-white">Frequently Asked Questions</h4>
                    <ul className="mt-4 space-y-2">
                        <li><Link href="#" className="hover:text-blue-500">How can I start earning with EarnFlow?</Link></li>
                        <li><Link href="#" className="hover:text-blue-500">What is the minimum withdrawal amount?</Link></li>
                        <li><Link href="#" className="hover:text-blue-500">How do I refer friends to EarnFlow?</Link></li>
                        <li><Link href="#" className="hover:text-blue-500">What types of tasks are available?</Link></li>
                        <li><Link href="#" className="hover:text-blue-500">How secure is my data on EarnFlow?</Link></li>
                    </ul>
                </div>

                {/* Newsletter Section */}
                <div>
                    <h4 className="text-lg font-bold text-white">Stay Updated</h4>
                    <p className="mt-4">
                        Join our newsletter to receive the latest updates on tasks, earning opportunities, and platform features.
                    </p>
                    <div className="flex items-center mt-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="px-4 py-2 w-full rounded-l-lg focus:outline-none"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">
                            <FaArrowUp />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-10 border-t border-gray-700 pt-4 text-center">
                <p>© 2025 EarnFlow. All rights reserved. Designed by EarnFlow Team.</p>
                <div className="mt-4">
                    <Link href="#" className="text-white hover:text-white">About Us</Link> |
                    <Link href="#" className="text-white hover:text-white"> Terms & Conditions</Link> |
                    <Link href="#" className="text-white hover:text-white"> Privacy Policy</Link> |
                    <Link href="#" className="text-white hover:text-white"> Help Center</Link> |
                    <Link href="#" className="text-white hover:text-white"> Blog</Link> |
                    <Link href="#" className="text-white hover:text-white"> Contact</Link>
                </div>
                <Link href="#" className="text-blue-500 hover:text-white mt-4 inline-block">
                    Back to top <FaArrowUp className="inline" />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;