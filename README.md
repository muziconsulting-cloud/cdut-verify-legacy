# cdut-verify

An offline verifier for `.cdut` academic transcripts, including a check that a
transcript actually completes a published programme.

This is the open-source verification slice of Conquest Designer University. The
university itself — its curriculum, its registrar, its student records — is
proprietary and is not in this repository. What is here is the part a third party
needs in order to trust a transcript without trusting the university's servers.

Licensed under the [Apache License 2.0](LICENSE).

## What a `.cdut` file proves

A transcript is a JSON document with an Ed25519 signature over its canonical
bytes. Two formats exist:

| Format   | Carries                          | Answers                                  |
| -------- | -------------------------------- | ---------------------------------------- |
| `cdut/1` | enrolments, assessments, awards  | "is this file genuine, and what happened?" |
| `cdut/2` | the above plus a programme block | "was this programme actually completed?" |

`cdut/2` adds three things: the programme id, the programme version, and the
SHA-256 hash of the published programme manifest. Because the manifest hash is
inside the signed payload, a transcript cannot be checked against a curriculum
the registrar did not publish.

Verification needs no network, no database and no issuer. It needs the file and a
public key. Completeness checking additionally needs the published manifest.

## Run it

```sh
bun install
bun test                      # baseline + task
bun test test/transcript.test.ts   # baseline only: 13 pass
bun test test/completeness.test.ts # the task: 12 fail until implemented
bun run typecheck
```

Verify a transcript from the command line:

```sh
bun src/cli.ts student.cdut --manifest BCOM-ACC.json --key "$AVC_PUBLIC_KEY"
```

Exit codes: `0` genuine (and complete when a manifest was given), `1` invalid or
incomplete, `2` usage or parse error.

## The task

`verifyCompleteness` in `src/transcript.ts` is deliberately a stub. The failing
suite in `test/completeness.test.ts` is the specification, and
[TASK.md](TASK.md) writes the contract out in prose. Implement the function until
the suite passes.

The baseline suite (`test/transcript.test.ts`) must stay green: it covers the
canonical serialisation, content ids and signature verification.

## Layout

```
src/types.ts       the public shapes: cdut/1, cdut/2, manifest, results
src/canonical.ts   deterministic serialisation, content ids, manifest hash
src/sign.ts        Ed25519 sign/verify, base64url, key ids
src/transcript.ts  issue and verify transcripts; verifyCompleteness (the task)
src/index.ts       public API
src/cli.ts         command-line verifier
test/              baseline suite + the failing task suite
```

## Dependencies

There are none at runtime. The verifier uses Bun's `node:crypto` and nothing
else. TypeScript and `@types/bun` are development-only.

## A note on data

The fixtures use a placeholder identity (`Fixture Student`, a zeroed identifier).
No real student record, credential or private key is in this repository. A
verifier never needs a private key: it is given a public key by whoever asks it to
check a transcript.
