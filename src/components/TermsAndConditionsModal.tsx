
import React, { useState } from 'react';

interface TermsAndConditionsModalProps {
    onAgree: () => void;
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({ onAgree }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative p-8 border w-full max-w-lg m-4 bg-white dark:bg-brand-dark-secondary rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Terms & Conditions</h2>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                    <p>Lawlens is an AI-powered legal assistant. By using this service, you acknowledge and agree to the following:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b>AI Can Make Mistakes:</b> Lawlens is an AI and is not infallible. It may provide inaccurate or incomplete information.</li>
                        <li><b>AI Can Hallucinate:</b> The AI may generate information that is not factually correct or present in the source documents.</li>
                        <li><b>Not a Substitute for Legal Advice:</b> Lawlens is not a substitute for a qualified human lawyer. All information should be independently verified.</li>
                        <li><b>No Attorney-Client Privilege:</b> Communications with Lawlens are not protected by attorney-client privilege. Do not share sensitive or confidential information.</li>
                    </ul>
                    <p>You are responsible for your use of Lawlens and any consequences that may arise.</p>
                </div>
                <div className="flex items-center mt-6">
                    <input
                        type="checkbox"
                        id="agree-checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="h-4 w-4 text-brand-accent focus:ring-brand-accent border-gray-300 rounded"
                    />
                    <label htmlFor="agree-checkbox" className="ml-2 text-sm text-gray-700 dark:text-gray-300">I have read and agree to the terms and conditions.</label>
                </div>
                <button
                    onClick={onAgree}
                    disabled={!isChecked}
                    className="w-full mt-6 bg-brand-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default TermsAndConditionsModal;
