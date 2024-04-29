// import React, { useState } from 'react';
// import * as toxicity from '@tensorflow-models/toxicity';

// const AbusiveDetection = () => {
//   const [inputText, setInputText] = useState('');
//   const [results, setResults] = useState([]);

//   const loadModel = async () => {
//     const model = await toxicity.load();
//     return model;
//   };

//   const classifyText = async (model, text) => {
//     const predictions = await model.classify(text);
//     setResults(predictions);
//   };

//   const handleInputChange = (event) => {
//     const text = event.target.value;
//     setInputText(text);
//   };

//   const handleSubmit = async () => {
//     const model = await loadModel();
//     classifyText(model, [inputText]);
//   };

//   return (
//     <div>
//       <textarea value={inputText} onChange={handleInputChange} />
//       <button onClick={handleSubmit}>Detect Toxicity</button>
//       <div>
//         {results.map((result, index) => (
//           <div key={index}>
//             <p>{result.label}</p>
//             <p>{result.results[0].match ? 'Toxic' : 'Non-Toxic'}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AbusiveDetection;
// import React, { useState } from 'react';
// import ToxicityDetector from './ToxicityDetector';

// const AbusiveDetection = () => {
//   const [inputText, setInputText] = useState('');
//   const [toxicityResult, setToxicityResult] = useState(null);

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleSendText = () => {
//     // Call the ToxicityDetector component to classify the text
//     const result = ToxicityDetector({ textToClassify: inputText });
//     setToxicityResult(result);
//   };

//   return (
//     <div>
//       <input type="text" value={inputText} onChange={handleInputChange} />
//       <button onClick={handleSendText}>Send</button>
//       {toxicityResult && (
//         <div>
//           {toxicityResult.value ? (
//             <p>The text contains {toxicityResult.label} and is considered toxic.</p>
//           ) : (
//             <p>The text is not toxic.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AbusiveDetection;
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
