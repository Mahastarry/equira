/**
 * Équira — Blockchain Integration Layer
 * Handles Ethereum smart contract interactions for credential verification
 */

const CHAIN_CONFIG = {
  network: "sepolia",          // Testnet for demo; mainnet for production
  contractAddress: "0xEquiraRegistryContractAddress",
  rpcUrl: process.env.ETH_RPC_URL || "https://sepolia.infura.io/v3/YOUR_KEY",
};

/**
 * Hash a document buffer using SHA-256
 * @param {Buffer} documentBuffer - Raw document bytes
 * @returns {string} hex hash
 */
async function hashDocument(documentBuffer) {
  const crypto = require("crypto");
  return crypto.createHash("sha256").update(documentBuffer).digest("hex");
}

/**
 * Issue a credential on-chain
 * @param {Object} credentialData - Student info & document hash
 * @returns {Object} transaction receipt + UVID
 */
async function issueCredentialOnChain(credentialData) {
  const { studentName, institution, course, semester, documentHash } = credentialData;

  const uvid = generateUVID();
  const uvidBytes32 = `0x${uvid.replace(/-/g, "").padEnd(64, "0")}`;

  // In production: submit to Ethereum via ethers.js
  // const tx = await contract.issueCredential(uvidBytes32, studentName, institution, course, semester, `0x${documentHash}`);
  // const receipt = await tx.wait();

  console.log(`[Équira] Credential issued on-chain`);
  console.log(`  UVID:        ${uvid}`);
  console.log(`  Student:     ${studentName}`);
  console.log(`  Institution: ${institution}`);
  console.log(`  Hash:        ${documentHash}`);

  return { uvid, documentHash, txHash: "0x" + documentHash.slice(0, 64) };
}

/**
 * Verify a credential by UVID
 * @param {string} uvid - The Universal Verification ID
 * @returns {Object|null} credential data or null if not found/tampered
 */
async function verifyCredential(uvid) {
  const uvidBytes32 = `0x${uvid.replace(/-/g, "").padEnd(64, "0")}`;

  // In production: query Ethereum contract
  // const result = await contract.verifyCredential(uvidBytes32);
  // return result.isValid ? result : null;

  // Demo fallback to local DB
  return null;
}

/**
 * Generate a UUID-style UVID
 */
function generateUVID() {
  const s = () => Math.random().toString(16).substr(2);
  return `${s().substr(0,8)}-${s().substr(0,4)}-${s().substr(0,4)}-${s().substr(0,4)}-${s().substr(0,12)}`;
}

module.exports = { hashDocument, issueCredentialOnChain, verifyCredential, generateUVID };
