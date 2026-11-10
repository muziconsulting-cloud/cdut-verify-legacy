/**
 * Public API of the verifier.
 *
 * `import { verifyTranscript, verifyCompleteness } from 'cdut-verify'`
 */

export * from './types.ts'
export {
  canonicalManifest,
  canonicalTranscriptV1,
  canonicalTranscriptV2,
  contentHash,
  manifestHash,
  transcriptIdV1,
  transcriptIdV2,
} from './canonical.ts'
export {
  fromBase64Url,
  generateKeyPair,
  importPrivateKey,
  importPublicKey,
  keyId,
  readEnv,
  signCanonical,
  toBase64Url,
  verifyCanonical,
} from './sign.ts'
export {
  CDUT_MEDIA_TYPE,
  TRANSCRIPT_ISSUER,
  canonicaliseManifest,
  hashManifest,
  issueTranscriptV1,
  issueTranscriptV2,
  sha256,
  transcriptV1,
  transcriptV2,
  verifyCompleteness,
  verifyTranscript,
  verifyTranscriptV1,
  verifyTranscriptV2,
} from './transcript.ts'
export type { SigningKeys } from './transcript.ts'
