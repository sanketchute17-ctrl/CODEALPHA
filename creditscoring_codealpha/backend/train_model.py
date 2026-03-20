# train_model.py
# 👉 Ye file model train karegi (sirf 1 baar run karna hai)

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# 📊 Dataset load karo
df = pd.read_csv("data.csv")

# 🧹 Missing values hatao
df = df.dropna()

# 🎯 Features & Target define karo
X = df[['ApplicantIncome', 'LoanAmount', 'Credit_History']]
y = df['Loan_Status'].map({'Y': 1, 'N': 0})  # Y/N ko 1/0 me convert

# 🔀 Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 🤖 Model create karo
model = RandomForestClassifier()

# 🎓 Model train karo
model.fit(X_train, y_train)

# 💾 Model save karo
joblib.dump(model, "model.pkl")

print("✅ Model trained & saved as model.pkl")