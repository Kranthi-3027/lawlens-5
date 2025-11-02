
import React, { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { 
    RecaptchaVerifier, 
    signInWithPhoneNumber, 
    ConfirmationResult, 
    User 
} from 'firebase/auth';

const PhoneAuth: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
    }, []);

    const handleSendOtp = async () => {
        setError(null);
        try {
            const appVerifier = window.recaptchaVerifier;
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setConfirmationResult(confirmation);
        } catch (err: any) {
            setError(err.message);
            console.error("Error sending OTP:", err);
        }
    };

    const handleVerifyOtp = async () => {
        setError(null);
        if (confirmationResult) {
            try {
                const result = await confirmationResult.confirm(otp);
                setUser(result.user);
            } catch (err: any) {
                setError(err.message);
                console.error("Error verifying OTP:", err);
            }
        }
    };

    if (user) {
        return (
            <div>
                <h2>Welcome, {user.phoneNumber}!</h2>
                <p>You have successfully signed in.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-dark text-brand-light">
            <h2 className="text-2xl font-bold mb-4">Phone Number Sign-In</h2>
            <div id="recaptcha-container"></div>
            {confirmationResult ? (
                <div className="flex flex-col items-center">
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="bg-brand-dark-secondary p-2 rounded mb-4 w-64 text-center"
                    />
                    <button onClick={handleVerifyOtp} className="bg-brand-primary p-2 rounded w-64">Verify OTP</button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1 123 456 7890"
                        className="bg-brand-dark-secondary p-2 rounded mb-4 w-64 text-center"
                    />
                    <button onClick={handleSendOtp} className="bg-brand-primary p-2 rounded w-64">Send OTP</button>
                </div>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default PhoneAuth;

// Augment the Window interface
declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
    }
}
