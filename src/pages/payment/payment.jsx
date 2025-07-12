import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaCreditCard, FaLock, FaMobile, FaShieldAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/footer';
import Navbar from '../../components/Navbar';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tripData, selectedDriver, totalPrice, bookingData } = location.state || {};

    const [step, setStep] = useState(1); // 1: Mobile, 2: MPIN, 3: OTP, 4: Payment
    const [isLoading, setIsLoading] = useState(false);

    // Form state for test credentials
    const [mobile, setMobile] = useState('9800000001');
    const [mpin, setMpin] = useState('1111');
    const [otp, setOtp] = useState('987654');

    useEffect(() => {
        if (!tripData || !selectedDriver) {
            navigate('/hire-driver');
        }
    }, [tripData, selectedDriver, navigate]);

    const handleMobileSubmit = () => {
        if (!mobile || mobile.length !== 10) {
            toast.error('Please enter a valid 10-digit mobile number');
            return;
        }
        setStep(2);
        toast.success('Mobile number verified! Now enter your MPIN.');
    };

    const handleMPINSubmit = () => {
        if (!mpin || mpin.length !== 4) {
            toast.error('Please enter a valid 4-digit MPIN');
            return;
        }
        setStep(3);
        toast.success('MPIN verified! Now enter the OTP.');
    };

    const handleOTPSubmit = () => {
        if (!otp || otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }
        setStep(4);
        toast.success('OTP verified! Proceeding to payment...');
        setTimeout(() => {
            initiateKhaltiPayment();
        }, 1000);
    };

    // 🚀 Modified: Route through your backend
    const initiateKhaltiPayment = async () => {
        setIsLoading(true);

        try {
            const paymentData = {
                amount: totalPrice * 100, // Convert to paisa
                purchase_order_id: `DRIVER_HIRE_${Date.now()}`,
                purchase_order_name: `Driver Hire - ${selectedDriver.name}`,
                customer_info: {
                    name: 'Test Customer',
                    email: 'test@example.com',
                    phone: mobile
                },
                amount_breakdown: [
                    {
                        label: `Driver hire for ${tripData.duration} day(s)`,
                        amount: totalPrice * 100
                    }
                ]
            };

            console.log('🚀 Initiating Khalti Payment:', paymentData);

            // ✅ Call YOUR backend instead of Khalti directly
            const response = await fetch('http://localhost:3000/api/payment/khalti/initiate', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    return_url: `${window.location.origin}/payment-success`,
                    website_url: window.location.origin,
                    amount: paymentData.amount,
                    purchase_order_id: paymentData.purchase_order_id,
                    purchase_order_name: paymentData.purchase_order_name,
                    customer_info: paymentData.customer_info,
                    amount_breakdown: paymentData.amount_breakdown
                })
            });

            const khaltiData = await response.json();
            console.log('✅ Khalti Response:', khaltiData);

            if (khaltiData.payment_url) {
                toast.success('Payment URL generated! Redirecting to Khalti...');

                // Store booking data for later use
                localStorage.setItem('pendingBooking', JSON.stringify({
                    ...bookingData,
                    pidx: khaltiData.pidx,
                    mobile: mobile
                }));

                console.log('🔗 Payment URL:', khaltiData.payment_url);

                // 🚀 Redirect to Khalti
                setTimeout(() => {
                    window.location.href = khaltiData.payment_url;
                }, 2000);
            } else {
                throw new Error('No payment URL received: ' + JSON.stringify(khaltiData));
            }
        } catch (error) {
            console.error('❌ Payment initiation failed:', error);
            toast.error('Failed to initialize payment: ' + error.message);
            setStep(3); // Go back to OTP step
        } finally {
            setIsLoading(false);
        }
    };

    if (!tripData || !selectedDriver) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors duration-200 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
                >
                    <FaArrowLeft className="mr-2" /> Back to Driver Selection
                </button>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
                            <h1 className="text-2xl font-bold text-white flex items-center">
                                <FaShieldAlt className="mr-3" />
                                Khalti Payment Test Mode
                            </h1>
                            <p className="text-purple-100 mt-2">Step-by-step payment verification with test credentials</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                            {/* Payment Steps */}
                            <div className="lg:col-span-2">
                                {/* Step Indicator */}
                                <div className="flex items-center justify-between mb-8">
                                    {[1, 2, 3, 4].map((stepNum) => (
                                        <div key={stepNum} className="flex items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= stepNum ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
                                                }`}>
                                                {step > stepNum ? <FaCheckCircle /> : stepNum}
                                            </div>
                                            {stepNum < 4 && (
                                                <div className={`flex-1 h-1 mx-4 ${step > stepNum ? 'bg-purple-600' : 'bg-gray-200'
                                                    }`} />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Step Labels */}
                                <div className="flex justify-between mb-6 text-sm text-gray-600">
                                    <span className={step >= 1 ? 'text-purple-600 font-medium' : ''}>Mobile</span>
                                    <span className={step >= 2 ? 'text-purple-600 font-medium' : ''}>MPIN</span>
                                    <span className={step >= 3 ? 'text-purple-600 font-medium' : ''}>OTP</span>
                                    <span className={step >= 4 ? 'text-purple-600 font-medium' : ''}>Payment</span>
                                </div>

                                {/* Step 1: Mobile Number */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                                <FaMobile className="mr-3 text-purple-600" />
                                                Step 1: Enter Mobile Number
                                            </h2>
                                            <p className="text-gray-600 mb-6">
                                                Enter your mobile number to start the payment process
                                            </p>
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                            <p className="text-sm text-blue-800 mb-2">
                                                💡 <strong>Test Mobile Number:</strong> 9800000001
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mobile Number
                                            </label>
                                            <div className="flex">
                                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                    +977
                                                </span>
                                                <input
                                                    type="tel"
                                                    value={mobile}
                                                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                    placeholder="9800000001"
                                                    className="flex-1 border border-gray-300 rounded-r-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleMobileSubmit}
                                            disabled={mobile.length !== 10}
                                            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                                        >
                                            Continue to MPIN
                                        </button>
                                    </div>
                                )}

                                {/* Step 2: MPIN */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                                <FaLock className="mr-3 text-purple-600" />
                                                Step 2: Enter MPIN
                                            </h2>
                                            <p className="text-gray-600 mb-6">
                                                Enter your 4-digit MPIN for mobile number +977{mobile}
                                            </p>
                                        </div>

                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                            <p className="text-sm text-green-800 mb-2">
                                                💡 <strong>Test MPIN:</strong> 1111
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                MPIN (4 digits)
                                            </label>
                                            <input
                                                type="password"
                                                value={mpin}
                                                onChange={(e) => setMpin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                                placeholder="1111"
                                                className="w-full border border-gray-300 rounded-md px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                maxLength={4}
                                            />
                                        </div>

                                        <div className="flex space-x-4">
                                            <button
                                                onClick={() => setStep(1)}
                                                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handleMPINSubmit}
                                                disabled={mpin.length !== 4}
                                                className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                                            >
                                                Continue to OTP
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: OTP */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                                <FaLock className="mr-3 text-purple-600" />
                                                Step 3: Enter OTP
                                            </h2>
                                            <p className="text-gray-600 mb-6">
                                                Enter the 6-digit OTP sent to +977{mobile}
                                            </p>
                                        </div>

                                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                            <p className="text-sm text-yellow-800 mb-2">
                                                💡 <strong>Test OTP:</strong> 987654
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                OTP Code (6 digits)
                                            </label>
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                placeholder="987654"
                                                className="w-full border border-gray-300 rounded-md px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                maxLength={6}
                                            />
                                        </div>

                                        <div className="flex space-x-4">
                                            <button
                                                onClick={() => setStep(2)}
                                                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handleOTPSubmit}
                                                disabled={otp.length !== 6}
                                                className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                                            >
                                                Verify & Pay
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Processing Payment */}
                                {step === 4 && (
                                    <div className="text-center space-y-6">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
                                                <FaCreditCard className="mr-3 text-purple-600" />
                                                Step 4: Processing Payment
                                            </h2>
                                            <p className="text-gray-600">Initializing Khalti payment gateway...</p>
                                        </div>

                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
                                        </div>

                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                            <h4 className="font-semibold text-green-800 mb-2">✅ Credentials Verified!</h4>
                                            <div className="text-sm text-green-700 space-y-1">
                                                <p>Mobile: +977{mobile}</p>
                                                <p>MPIN: ****</p>
                                                <p>OTP: ******</p>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-sm text-blue-800">
                                                🔄 Generating payment URL and redirecting to Khalti...
                                            </p>
                                        </div>

                                        {isLoading && (
                                            <div className="bg-yellow-50 p-4 rounded-lg">
                                                <p className="text-sm text-yellow-800">
                                                    ⏳ Please wait while we connect to Khalti payment gateway...
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Booking Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <img
                                                src={`http://localhost:3000${selectedDriver.image}`}
                                                alt={selectedDriver.name}
                                                className="w-12 h-12 rounded-full object-cover mr-3"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">{selectedDriver.name}</p>
                                                <p className="text-sm text-gray-600">{selectedDriver.experience} years exp.</p>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Duration:</span>
                                                <span className="font-medium">{tripData.duration} day(s)</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Daily Rate:</span>
                                                <span className="font-medium">Rs. {selectedDriver.inValleyPrice}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">From:</span>
                                                <span className="font-medium text-right">{tripData.pickup.location}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">To:</span>
                                                <span className="font-medium text-right">{tripData.dropoff.location}</span>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-gray-800">Total Amount:</span>
                                                <span className="text-xl font-bold text-purple-600">Rs. {totalPrice}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Amount in paisa: {totalPrice * 100}
                                            </p>
                                        </div>

                                        {/* Test Credentials Reference */}
                                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                            <h4 className="text-sm font-semibold text-blue-800 mb-2">
                                                🧪 Test Credentials
                                            </h4>
                                            <div className="text-xs text-blue-700 space-y-1">
                                                <div className="flex justify-between">
                                                    <span>Mobile:</span>
                                                    <span className="font-mono">9800000001</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>MPIN:</span>
                                                    <span className="font-mono">1111</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>OTP:</span>
                                                    <span className="font-mono">987654</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <p className="text-xs text-green-800 flex items-center">
                                                <FaShieldAlt className="mr-2" />
                                                Secured by Khalti Payment Gateway
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 9999 }}
            />
        </div>
    );
};

export default Payment;