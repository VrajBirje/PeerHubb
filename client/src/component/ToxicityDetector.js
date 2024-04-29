import * as toxicity from '@tensorflow-models/toxicity';

const detectToxicity = async (textToClassify) => {
    const model = await toxicity.load();
    const predictions = await model.classify(textToClassify);
    const toxicPrediction = predictions.find((pred) => pred.results[0].match);
    if (toxicPrediction) {
        return {
            label: toxicPrediction.label,
            value: true,
        };
    } else {
        return {
            value: false,
        };
    }
};

export default detectToxicity;
