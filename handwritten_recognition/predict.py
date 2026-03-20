import string

letters = list(string.ascii_uppercase)

predicted_char = letters[np.argmax(prediction)]
confidence = np.max(prediction)

st.markdown(f"## 🔤 Prediction: {predicted_char}")
st.markdown(f"### Confidence: {confidence*100:.2f}%")