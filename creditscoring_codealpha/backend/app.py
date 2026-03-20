from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import shap

app = Flask(__name__)
CORS(app)

model = joblib.load("model.pkl")
explainer = shap.TreeExplainer(model)

@app.route("/")
def home():
    return "Credit Risk API Running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    income = float(data['income'])
    loan = float(data['loan'])
    credit = float(data['credit_history'])

    features = np.array([[income, loan, credit]])

    prediction = model.predict(features)[0]
    prob = model.predict_proba(features)[0][1]

    # 🎯 Credit Score (0–100)
    score = int(300 + prob * 600)

    # 💡 Smart Suggestions
    if loan > income:
        suggestion = "⚠️ Reduce loan amount"
    elif income < 3000:
        suggestion = "⚠️ Increase income"
    elif credit == 0:
        suggestion = "⚠️ Improve credit history"
    else:
        suggestion = "✅ Strong financial profile"

    return jsonify({
        "approval": int(prediction),
        "confidence": round(float(prob), 2),
        "score": score,
        "suggestion": suggestion
    })


@app.route("/explain", methods=["POST"])
def explain():
    data = request.json

    features = np.array([[ 
        float(data['income']),
        float(data['loan']),
        float(data['credit_history'])
    ]])

    shap_values = explainer.shap_values(features)

    return jsonify({
        "impact": shap_values[1].tolist()
    })


if __name__ == "__main__":
    app.run(debug=True)