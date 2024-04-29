
import React, { useState } from 'react';
import detectToxicity from './ToxicityDetector';

const AbusiveDetection = () => {
    const [inputText, setInputText] = useState('');
    const [toxicityResult, setToxicityResult] = useState(null);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSendText = async () => {
        const result = await detectToxicity(inputText);
        setToxicityResult(result);
    };

    return (
        <div>
            <input type="text" value={inputText} onChange={handleInputChange} />
            <button onClick={handleSendText}>Send</button>
            {toxicityResult && (
                <div>
                    {toxicityResult.value ? (
                        <p>The text contains {toxicityResult.label} and is considered toxic.</p>
                    ) : (
                        <p>The text is not toxic.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AbusiveDetection;
