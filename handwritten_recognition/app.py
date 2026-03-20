# app.py

import streamlit as st
from streamlit_drawable_canvas import st_canvas
from PIL import Image
import numpy as np
import cv2
from tensorflow.keras.models import load_model

# ================= CONFIG =================
st.set_page_config(page_title="AI Handwritten Recognizer", layout="centered")

# ================= LOAD MODEL =================
model = load_model("model/digit_model.h5")

# ================= GLASS UI + ANIMATION =================
st.markdown("""
<style>
.stApp {
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
    color: white;
    font-family: 'Segoe UI';
}

.title {
    text-align: center;
    font-size: 42px;
    font-weight: bold;
    animation: fadeIn 1s ease-in-out;
}

.subtitle {
    text-align: center;
    color: #cbd5e1;
    margin-bottom: 20px;
}

.glass {
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

@keyframes fadeIn {
    from {opacity: 0; transform: translateY(15px);}
    to {opacity: 1; transform: translateY(0);}
}
</style>
""", unsafe_allow_html=True)

# ================= HEADER =================
st.markdown('<div class="title">🤖 AI Handwritten Recognizer</div>', unsafe_allow_html=True)
st.markdown('<div class="subtitle">Draw or upload a digit</div>', unsafe_allow_html=True)

# ================= TABS =================
tab1, tab2 = st.tabs(["✍️ Draw", "📤 Upload"])

# ================= DRAW =================
with tab1:
    st.markdown('<div class="glass">', unsafe_allow_html=True)

    canvas = st_canvas(
        fill_color="black",
        stroke_width=15,
        stroke_color="white",
        background_color="black",
        height=280,
        width=280,
        drawing_mode="freedraw",
        key="canvas",
    )

    if canvas.image_data is not None:
        img = canvas.image_data

        img = cv2.cvtColor(img.astype('uint8'), cv2.COLOR_BGR2GRAY)
        img = cv2.resize(img, (28,28))
        img = img / 255.0
        img = img.reshape(1,28,28,1)

        prediction = model.predict(img)[0]

        digit = np.argmax(prediction)
        confidence = np.max(prediction)

        st.markdown(f"## 🧠 Prediction: {digit}")
        st.markdown(f"### Confidence: {confidence*100:.2f}%")

        st.write("### 📊 All Predictions")
        for i, prob in enumerate(prediction):
            st.progress(float(prob), text=f"{i}: {prob*100:.1f}%")

    st.markdown('</div>', unsafe_allow_html=True)

# ================= UPLOAD =================
with tab2:
    st.markdown('<div class="glass">', unsafe_allow_html=True)

    uploaded_file = st.file_uploader("Upload image", type=["png","jpg","jpeg"])

    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        st.image(image, caption="Uploaded Image")

        image = image.convert('L')
        image = np.array(image)
        image = cv2.resize(image, (28,28))
        image = image / 255.0
        image = image.reshape(1,28,28,1)

        prediction = model.predict(image)[0]

        digit = np.argmax(prediction)
        confidence = np.max(prediction)

        st.markdown(f"## 🧠 Prediction: {digit}")
        st.markdown(f"### Confidence: {confidence*100:.2f}%")

        st.write("### 📊 All Predictions")
        for i, prob in enumerate(prediction):
            st.progress(float(prob), text=f"{i}: {prob*100:.1f}%")

    st.markdown('</div>', unsafe_allow_html=True)

# ================= FOOTER =================
st.markdown("---")
st.caption("🚀 Built with CNN + Streamlit | By Sanket 🔥")