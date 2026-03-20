import { useState } from "react";
import axios from "axios";

function App() {
  const [income, setIncome] = useState("");
  const [loan, setLoan] = useState("");
  const [credit, setCredit] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    setTimeout(async () => {
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        income,
        loan,
        credit_history: credit
      });

      setResult(res.data);
      setLoading(false);
    }, 1200);
  };

  // 🎯 FIXED ANGLE (PERFECT)
  const angle = result ? ((result.score - 300) / 600) * 180 - 90 : -90;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#dbeafe,#ede9fe)",
      fontFamily: "'Poppins', sans-serif",
      padding: "20px"
    }}>

      <h1 style={{
        textAlign: "center",
        fontWeight: "700",
        color: "#1e293b"
      }}>
        💳 Smart CIBIL Analyzer
      </h1>

      {/* LANDING */}
      {!result && !loading && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "40px"
        }}>

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331943.png" width="90"/>
            <img src="https://cdn-icons-png.flaticon.com/512/1041/1041870.png" width="90"/>
          </div>

          {/* FORM */}
          <div style={glass}>
            <h2>Check CIBIL Score</h2>

            <input placeholder="Income" onChange={(e)=>setIncome(e.target.value)} /><br/><br/>
            <input placeholder="Loan Amount" onChange={(e)=>setLoan(e.target.value)} /><br/><br/>
            <input placeholder="Credit History (0/1)" onChange={(e)=>setCredit(e.target.value)} /><br/><br/>

            <button onClick={handleSubmit} style={btn}>Analyze</button>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <img src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png" width="90"/>
            <img src="https://cdn-icons-png.flaticon.com/512/2830/2830284.png" width="90"/>
          </div>

        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <div className="loader"></div>
          <h2>Analyzing your credit...</h2>
        </div>
      )}

      {/* DASHBOARD */}
      {result && (
        <div style={{ maxWidth: "900px", margin: "auto", marginTop: "30px" }}>

          {/* SCORE CARD */}
          <div style={glass}>
            <h2>Your CIBIL Score</h2>

            <div style={{
              width: "260px",
              height: "140px",
              margin: "auto",
              position: "relative"
            }}>

              {/* ARC */}
              <div style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: "260px",
                borderTopRightRadius: "260px",
                background: "linear-gradient(to right, red, orange, yellow, green)"
              }}></div>

              {/* NEEDLE FIXED */}
              <div style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                width: "3px",
                height: "110px",
                background: "#111",
                transformOrigin: "bottom center",
                transform: `translateX(-50%) rotate(${angle}deg)`,
                transition: "0.8s ease"
              }}></div>

              {/* CENTER DOT */}
              <div style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translate(-50%, 50%)",
                width: "16px",
                height: "16px",
                background: "#111",
                borderRadius: "50%"
              }}></div>

              {/* SCORE */}
              <div style={{
                position: "absolute",
                bottom: "-40px",
                width: "100%",
                textAlign: "center",
                fontSize: "28px",
                fontWeight: "700"
              }}>
                {result.score}
              </div>

            </div>

            <p style={{ marginTop: "30px" }}>
              {result.approval ? "Excellent Profile" : "Needs Improvement"}
            </p>
          </div>

          {/* GOOGLE PAY STYLE CARDS */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "20px",
            marginTop: "20px"
          }}>

            <GCard title="Payment History" value="90%" color="#22c55e"/>
            <GCard title="Credit Usage" value="40%" color="#f59e0b"/>
            <GCard title="Active Loans" value="2" color="#3b82f6"/>
            <GCard title="Credit Age" value="3 Years" color="#8b5cf6"/>

          </div>

          {/* REPORT SECTION */}
          <div style={glass}>
            <h3>📄 Credit Report</h3>

            <Progress label="Payment History" value={90} />
            <Progress label="Credit Usage" value={40} />
            <Progress label="Loan Activity" value={70} />

            <p style={{ marginTop: "10px" }}>
              💡 {result.suggestion}
            </p>
          </div>

        </div>
      )}

      {/* CSS */}
      <style>{`
        input {
          padding:10px;
          width:80%;
          border-radius:10px;
          border:none;
          outline:none;
        }

        .loader {
          border:6px solid #eee;
          border-top:6px solid #2563eb;
          border-radius:50%;
          width:60px;
          height:60px;
          animation: spin 1s linear infinite;
          margin:auto;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}

/* GLASS */
const glass = {
  background: "rgba(255,255,255,0.25)",
  backdropFilter: "blur(15px)",
  padding: "25px",
  borderRadius: "20px",
  marginTop: "20px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
};

/* BUTTON */
const btn = {
  padding: "10px",
  width: "100%",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px"
};

/* GOOGLE STYLE CARD */
const GCard = ({title,value,color}) => (
  <div style={{
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  }}>
    <h4>{title}</h4>
    <p style={{ fontSize: "18px", color }}>{value}</p>
  </div>
);

/* PROGRESS */
const Progress = ({label,value}) => (
  <div style={{ marginTop: "10px" }}>
    <p>{label}</p>
    <div style={{ background:"#ddd",borderRadius:"10px" }}>
      <div style={{
        width:`${value}%`,
        background:"#2563eb",
        padding:"5px",
        borderRadius:"10px",
        color:"white"
      }}>{value}%</div>
    </div>
  </div>
);

export default App;