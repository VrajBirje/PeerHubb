# server.py

from flask import Flask, request, jsonify
from better_profanity import profanity

app = Flask(__name__)

# Load abusive words from file
profanity.load_censor_words_from_file("abusivewords.txt")

@app.route('/detect-abusive', methods=['POST'])
def detect_abusive():
    data = request.get_json()
    text = data['text']
    
    # Check if the text contains abusive words
    is_abusive = profanity.contains_profanity(text)
    
    return jsonify({'isAbusive': is_abusive})

if __name__ == '__main__':
    app.run(debug=True)
