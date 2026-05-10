// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Équira Credential Registry
/// @notice Immutable on-chain registry for academic credential verification
/// @dev Uses SHA-256 document hashes stored on Ethereum

contract CredentialRegistry {

    struct Credential {
        string  studentName;
        string  institution;
        string  course;
        string  semester;
        bytes32 documentHash;   // SHA-256 of original document
        uint256 issuedAt;       // Unix timestamp
        address issuedBy;       // University admin address
        bool    isValid;
    }

    // UVID (as bytes32) → Credential
    mapping(bytes32 => Credential) private credentials;

    // Track all UVIDs issued by an institution
    mapping(address => bytes32[]) private institutionCredentials;

    // Events
    event CredentialIssued(
        bytes32 indexed uvid,
        string  studentName,
        string  institution,
        uint256 issuedAt
    );
    event CredentialRevoked(bytes32 indexed uvid, address revokedBy);

    // ── Issue a new credential ──────────────────────────────
    function issueCredential(
        bytes32 uvid,
        string  memory studentName,
        string  memory institution,
        string  memory course,
        string  memory semester,
        bytes32 documentHash
    ) external {
        require(!credentials[uvid].isValid, "UVID already exists");
        require(bytes(studentName).length > 0, "Student name required");

        credentials[uvid] = Credential({
            studentName:  studentName,
            institution:  institution,
            course:       course,
            semester:     semester,
            documentHash: documentHash,
            issuedAt:     block.timestamp,
            issuedBy:     msg.sender,
            isValid:      true
        });

        institutionCredentials[msg.sender].push(uvid);

        emit CredentialIssued(uvid, studentName, institution, block.timestamp);
    }

    // ── Verify a credential ─────────────────────────────────
    function verifyCredential(bytes32 uvid)
        external view
        returns (
            bool    isValid,
            string  memory studentName,
            string  memory institution,
            string  memory course,
            string  memory semester,
            uint256 issuedAt,
            bytes32 documentHash
        )
    {
        Credential memory c = credentials[uvid];
        return (c.isValid, c.studentName, c.institution, c.course, c.semester, c.issuedAt, c.documentHash);
    }

    // ── Revoke a credential (issuing institution only) ──────
    function revokeCredential(bytes32 uvid) external {
        require(credentials[uvid].issuedBy == msg.sender, "Only issuer can revoke");
        require(credentials[uvid].isValid, "Already revoked");
        credentials[uvid].isValid = false;
        emit CredentialRevoked(uvid, msg.sender);
    }

    // ── Get all credentials issued by an institution ────────
    function getInstitutionCredentials(address institution)
        external view returns (bytes32[] memory)
    {
        return institutionCredentials[institution];
    }
}
