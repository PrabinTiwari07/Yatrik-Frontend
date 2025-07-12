import { useEffect, useState } from 'react';
import { FaCheckCircle, FaSpinner, FaTimes } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/footer';
import Navbar from '../../components/Navbar';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState('verifying');
    const [paymentData, setPaymentData] = useState(null);

    const pidx = searchParams.get('pidx');
    const status = searchParams.get('status');
    const amount = searchParams.get('amount');

    useEffect(() => {
        if (pidx) {
            verifyPayment();
        } else {
            setPaymentStatus('failed');
            toast.error('Invalid payment reference');
        }
    }, [pidx]);

    const verifyPayment = async () => {
        try {
            console.log('🔍 Verifying payment with pidx:', pidx);

            const response = await fetch('http://localhost:3000/api/payment/verify', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pidx })
            });

            const result = await response.json();
            console.log('✅ Verification result:', result);

            if (result.success && result.status === 'Completed') {
                setPaymentStatus('success');
                setPaymentData(result.payment_data);
                toast.success('Payment verified successfully!');

                // Complete the booking process here
                await completeBooking(result.payment_data);
            } else {
                setPaymentStatus('failed');
                toast.error('Payment verification failed');
            }
        } catch (error) {
            console.error('❌ Payment verification error:', error);
            setPaymentStatus('failed');
            toast.error('Failed to verify payment');
        }
    };

    const completeBooking = async (paymentData) => {
        try {
            // Get pending booking data
            const pendingBooking = JSON.parse(localStorage.getItem('pendingBooking') || '{}');

            console.log('📋 Completing booking with payment data:', paymentData);
            console.log('📋 Booking details:', pendingBooking);

            // 🚀 NEW: Save the driver hire booking with payment info
            const bookingResponse = await fetch('http://localhost:3000/api/driver-hires', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...pendingBooking,
                    paymentInfo: {
                        pidx: paymentData.pidx || pidx,
                        transactionId: paymentData.transaction_id,
                        amount: paymentData.total_amount,
                        status: 'Paid',
                        paymentMethod: 'Khalti',
                        paidAt: new Date().toISOString()
                    },
                    status: 'pending', // Driver approval status
                    paymentStatus: 'paid' // Payment status
                })
            });

            const bookingResult = await bookingResponse.json();
            console.log('✅ Booking saved:', bookingResult);

            if (bookingResult.success) {
                toast.success('Booking confirmed and saved successfully!');
            } else {
                toast.error('Booking could not be saved: ' + bookingResult.message);
            }

            // Clean up
            localStorage.removeItem('pendingBooking');

        } catch (error) {
            console.error('❌ Booking completion error:', error);
            toast.error('Failed to save booking details');
        }
    };

    const handleContinue = () => {
        if (paymentStatus === 'success') {
            navigate('/my-bookings'); // Navigate to bookings page
        } else {
            navigate('/hire-driver'); // Go back to driver selection
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 text-center">
                            {paymentStatus === 'verifying' && (
                                <div className="space-y-6">
                                    <div className="flex justify-center">
                                        <FaSpinner className="text-6xl text-blue-600 animate-spin" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        Verifying Payment...
                                    </h1>
                                    <p className="text-gray-600">
                                        Please wait while we confirm your payment with Khalti
                                    </p>
                                </div>
                            )}

                            {paymentStatus === 'success' && (
                                <div className="space-y-6">
                                    <div className="flex justify-center">
                                        <FaCheckCircle className="text-6xl text-green-600" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-green-800">
                                        Payment Successful!
                                    </h1>
                                    <p className="text-gray-600">
                                        Your booking has been confirmed and saved. Thank you for choosing YatriK!
                                    </p>

                                    {paymentData && (
                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-left">
                                            <h3 className="font-semibold text-green-800 mb-2">Payment Details:</h3>
                                            <div className="text-sm text-green-700 space-y-1">
                                                <p><strong>Transaction ID:</strong> {paymentData.transaction_id}</p>
                                                <p><strong>Amount:</strong> Rs. {paymentData.total_amount / 100}</p>
                                                <p><strong>Status:</strong> {paymentData.status}</p>
                                                <p><strong>Payment Method:</strong> Khalti</p>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleContinue}
                                        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                                    >
                                        View My Bookings
                                    </button>
                                </div>
                            )}

                            {paymentStatus === 'failed' && (
                                <div className="space-y-6">
                                    <div className="flex justify-center">
                                        <FaTimes className="text-6xl text-red-600" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-red-800">
                                        Payment Failed
                                    </h1>
                                    <p className="text-gray-600">
                                        Your payment could not be processed. Please try again.
                                    </p>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => navigate('/hire-driver')}
                                            className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200"
                                        >
                                            Try Again
                                        </button>
                                        <button
                                            onClick={() => navigate('/')}
                                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            Go Home
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default PaymentSuccess;