import { useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp, FaEnvelope, FaHeadset, FaPhone, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const faqs = [
    {
        question: "How do I book a vehicle on YatriK?",
        answer: "To book a vehicle, browse available options, choose your dates, and click 'Book Now'. You'll need to provide your travel details and complete the payment process.",
        category: "Booking"
    },
    {
        question: "What documents do I need to rent a vehicle?",
        answer: "You typically need a valid driving license, government-issued ID (citizenship/passport), and sometimes a credit card for security deposit.",
        category: "Requirements"
    },
    {
        question: "Can I cancel or modify my booking?",
        answer: "Yes, you can manage your bookings in the profile section before the trip starts. Cancellation policies may apply depending on timing.",
        category: "Booking"
    },
    {
        question: "What payment options are available?",
        answer: "We support Khalti, eSewa, Cash on Delivery, and other secure online payment methods for your convenience.",
        category: "Payment"
    },
    {
        question: "How do I update my profile information?",
        answer: "Go to your profile page, click 'Edit Profile', update your details, and save changes. You can update contact info, address, and preferences.",
        category: "Account"
    },
    {
        question: "How do I contact customer support?",
        answer: "You can reach us via the Contact page, email us at support@yatrik.com, or call our 24/7 helpline at +977-1-XXXXXXX.",
        category: "Support"
    },
    {
        question: "What if my vehicle breaks down during the trip?",
        answer: "Contact our emergency helpline immediately. We provide 24/7 roadside assistance and will arrange a replacement vehicle if needed.",
        category: "Emergency"
    },
    {
        question: "Are there any age restrictions for renting?",
        answer: "Yes, drivers must be at least 21 years old with a valid license for at least 1 year. Additional fees may apply for drivers under 25.",
        category: "Requirements"
    }
];

const categories = ["All", "Booking", "Payment", "Account", "Support", "Requirements", "Emergency"];

const Help = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq => {
            const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-white border-b">
                    <div className="max-w-4xl mx-auto text-center px-6 py-16">
                        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                            How can we help you?
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Find answers to commonly asked questions
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400 text-sm" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 py-8">
                    {/* Category Filter */}
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedCategory === category
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white rounded-lg border">
                        <div className="p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'} found
                            </p>
                        </div>

                        <div className="divide-y">
                            {filteredFaqs.length === 0 ? (
                                <div className="p-8 text-center">
                                    <p className="text-gray-500 mb-4">No results found</p>
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setSelectedCategory("All");
                                        }}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            ) : (
                                filteredFaqs.map((faq, index) => (
                                    <div key={index} className="hover:bg-gray-50 transition-colors">
                                        <div
                                            className="p-4 cursor-pointer"
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 pr-4">
                                                    <div className="mb-2">
                                                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                                            {faq.category}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-medium text-gray-900">
                                                        {faq.question}
                                                    </h3>
                                                </div>
                                                <div className="ml-4">
                                                    {openIndex === index ? (
                                                        <FaChevronUp className="text-gray-400" />
                                                    ) : (
                                                        <FaChevronDown className="text-gray-400" />
                                                    )}
                                                </div>
                                            </div>

                                            {openIndex === index && (
                                                <div className="mt-4 pt-4 border-t">
                                                    <p className="text-gray-600">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Contact Support Section */}
                    <div className="mt-8 bg-white rounded-lg border p-6">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Still need help?
                            </h2>
                            <p className="text-gray-600">
                                Get in touch with our support team
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-4 border rounded-lg">
                                <FaPhone className="mx-auto text-blue-600 mb-2" />
                                <h3 className="font-medium mb-1">Call Us</h3>
                                <p className="text-sm text-gray-600 mb-2">+977-9869028215</p>
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                                    24/7 Available
                                </span>
                            </div>

                            <div className="text-center p-4 border rounded-lg">
                                <FaEnvelope className="mx-auto text-green-600 mb-2" />
                                <h3 className="font-medium mb-1">Email Us</h3>
                                <p className="text-sm text-gray-600 mb-2">yatrik49@gmail.com</p>
                                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    2-4 hours response
                                </span>
                            </div>

                            <div className="text-center p-4 border rounded-lg relative">
                                <div className="absolute top-2 right-2">
                                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                                        Coming Soon
                                    </span>
                                </div>
                                <FaHeadset className="mx-auto text-purple-600 mb-2 opacity-60" />
                                <h3 className="font-medium mb-1 text-gray-500">Live Chat</h3>
                                <p className="text-sm text-gray-400 mb-2">Chat with us now</p>
                                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                    Feature in development
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => navigate("/contact")}
                                className="bg-black text-white py-2 px-6 rounded-lg transition-colors"
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Help;
