/**
 * Équira — AI Extraction Module
 * Uses Google Gemini to extract and standardize data from academic documents
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Extract structured credential data from a document image/PDF
 * @param {string} base64Document - Base64 encoded document
 * @param {string} mimeType - 'image/jpeg' | 'image/png' | 'application/pdf'
 * @returns {Object} Structured credential data
 */
async function extractCredentialData(base64Document, mimeType = "image/jpeg") {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an academic credential extraction AI for Équira.
Analyze this academic document (marksheet, degree certificate, or transcript).

Extract and return ONLY a valid JSON object with these fields:
{
  "studentName": "Full name as on document",
  "studentId": "Roll number or student ID",
  "institution": "University or institution name",
  "course": "Degree or course name",
  "semester": "Semester or year",
  "issueDate": "Date in YYYY-MM-DD format",
  "grades": [{"subject": "...", "marks": "...", "grade": "..."}],
  "cgpa": "Overall CGPA or percentage if present",
  "isVerifiable": true
}

If a field is not present, use null.
Return ONLY the JSON, no explanation.
`;

  const result = await model.generateContent([
    prompt,
    { inlineData: { data: base64Document, mimeType } }
  ]);

  const text = result.response.text().trim();
  const json = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(json);
  } catch {
    throw new Error("AI extraction failed to parse document. Please ensure the document is clear and readable.");
  }
}

/**
 * Standardize extracted data to Équira's canonical format
 */
function standardizeCredential(rawData) {
  return {
    studentName:  (rawData.studentName || "").trim().toUpperCase(),
    institution:  (rawData.institution || "").trim(),
    course:       (rawData.course || "").trim(),
    semester:     (rawData.semester || "").trim(),
    issueDate:    rawData.issueDate || new Date().toISOString().split("T")[0],
    metadata: {
      studentId: rawData.studentId,
      cgpa:      rawData.cgpa,
      grades:    rawData.grades || [],
    }
  };
}

module.exports = { extractCredentialData, standardizeCredential };
