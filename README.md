# Équira — Verify Credentials. Instantly. Forever.

> **Blockchain-powered academic credential verification** that makes fake degrees cryptographically impossible.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-equira--academic--cred--ltir.bolt.host-5B21B6?style=for-the-badge)](https://equira-academic-cred-ltir.bolt.host)
[![License](https://img.shields.io/badge/License-MIT-teal?style=for-the-badge)](LICENSE)
[![Hackathon](https://img.shields.io/badge/Quantum_Sprint_2026-For_Social_Good-gold?style=for-the-badge)](https://devpost.com)

---

## 🚨 The Problem

**100M+ academic credentials are issued every year — with no universal verification system.**

| Pain Point | Reality |
|---|---|
| 📈 Fake credentials | Rising globally — employers have no reliable way to detect forgeries |
| ⏳ Slow verification | Takes days to weeks — manual, non-standardized processes |
| 🔗 No universal system | Every institution uses different methods; no interoperability |
| ❌ Broken trust | Employers can't trust resumes at scale |

> *"Trust is becoming a requirement — not an option."*

---

## ✅ Our Solution — Équira

Équira is an **AI + Blockchain** platform that allows any employer, institution, or individual to verify an academic credential **in under 2 seconds**, from anywhere in the world.

### How It Works

```
  [01 Upload]  →  [02 AI Extract]  →  [03 Hash & Store]  →  [04 Generate QR]  →  [05 Verify]
 Admin uploads    Gemini AI extracts   SHA-256 hash on       UVID + QR code       Scan QR →
 the marksheet    & standardizes data  Ethereum blockchain   generated             instant result
```

### Key Features

- 🔐 **Tamper-proof** — Immutable blockchain records (Ethereum + SHA-256)
- ⚡ **Instant** — Verify in under 2 seconds via QR code or UVID
- 🌍 **Global** — Accessible anytime, anywhere, by anyone
- 🧠 **AI-powered** — Google Gemini extracts & standardizes data automatically
- 📊 **Admin Dashboard** — Full credential management interface
- 🏦 **Multi-institution** — Supports any university or institution

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JS (no framework bloat) |
| AI Extraction | Google Gemini API |
| Blockchain | Ethereum (Solidity smart contracts) |
| Cloud | Google Cloud Platform |
| Hashing | SHA-256 Cryptographic hashing |
| Storage | IPFS + GCP Cloud Storage |

---

## 🚀 Getting Started

### Prerequisites
- A modern browser (Chrome, Firefox, Edge, Safari)
- No installation required for the demo

### Run Locally

```bash
git clone https://github.com/yourusername/equira.git
cd equira
# Open index.html in your browser — that's it!
open index.html
```

### Try the Live Demo

👉 **[equira-academic-cred-ltir.bolt.host](https://equira-academic-cred-ltir.bolt.host)**

Use these demo Verification IDs to test instantly:
```
3f4a9c12-8e2b-4d7f-a1b0-c9e3d2f18a45   → Priya Sharma, Anna University
7b2d4e89-1f3a-4c6d-b8e2-a5f97c3d20b1   → Arjun Mehta, IIT Madras
9e1c5a37-4b8d-4f2e-c3a7-d6b82e5f19c4   → Kavya Nair, SIMATS
```

---

## 📁 Project Structure

```
equira/
├── index.html              # Full working demo (single-file MVP)
├── src/
│   ├── app.js              # Core verification logic
│   ├── blockchain.js       # Ethereum integration layer
│   └── ai-extractor.js     # Gemini AI extraction module
├── contracts/
│   └── CredentialRegistry.sol   # Ethereum smart contract
├── docs/
│   ├── architecture.md     # System architecture
│   └── api.md              # API documentation
└── README.md
```

---

## 📜 Smart Contract (Ethereum)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialRegistry {
    struct Credential {
        string studentName;
        string institution;
        string course;
        bytes32 documentHash;
        uint256 issuedAt;
        bool isValid;
    }

    mapping(bytes32 => Credential) public credentials;

    event CredentialIssued(bytes32 indexed uvid, string studentName, string institution);
    event CredentialRevoked(bytes32 indexed uvid);

    function issueCredential(
        bytes32 uvid,
        string memory studentName,
        string memory institution,
        string memory course,
        bytes32 documentHash
    ) public {
        credentials[uvid] = Credential(studentName, institution, course, documentHash, block.timestamp, true);
        emit CredentialIssued(uvid, studentName, institution);
    }

    function verifyCredential(bytes32 uvid) public view returns (bool, string memory, string memory) {
        Credential memory c = credentials[uvid];
        return (c.isValid, c.studentName, c.institution);
    }
}
```

---

## 📊 Business Model

| Customer | Model | Revenue |
|---|---|---|
| 🎓 Students | One-time verification, lifetime access | ₹300/credential |
| 🏛️ Universities | SaaS platform integration | ₹50L/yr per institution |
| 💼 Employers | Verification API access | ₹25L/yr per organization |

**Runway:** ₹5 Crore seed · 18–24 months

---

## 📈 Traction

- ✅ MVP successfully developed and deployed
- 🤝 In discussions with **IIT Madras** and **SIMATS** for pilot programs
- 👥 Early interest from students and recruiters
- 🏆 Presented to Google Cloud Campus Fund jury (FutureX AI, 2nd Edition)

---

## 🔬 Research Foundation

This project is backed by **4 peer-reviewed publications**:

1. **IEEE ICSES 2024** — AI-Driven Mentor Service Advising using RNN/LSTM
2. **IEEE ICEEICT 2024** — Equivalency Certificates using Quantum AI (QAA)
3. **IET CP913 2024** — Hybrid quantum-classical credential equivalence via Qiskit
4. **IEEE ICSCDS 2025** — LEConvBERT for Secure Certificate Generation using NLP + Blockchain

---

## 👩‍💻 Team

| Name | Role |
|---|---|
| **Maha Sweta S** | Lead Developer & Product |
| **Dr Sumathy K** | Research Advisor & Architecture |

📍 Chennai, Tamil Nadu, India

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Équira</strong> — Verify credentials. Instantly. Forever.<br/>
  Built with ❤️ for Quantum Sprint 2026 · For Social Good
</div>
