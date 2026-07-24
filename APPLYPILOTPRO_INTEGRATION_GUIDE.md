# CodeQuest × ApplyPilotPro Integration Guide

v51 keeps CodeQuest and ApplyPilotPro as separate products.

## Current integration

CodeQuest creates a user-controlled JSON evidence package containing only the sections the
learner selects. No data is automatically transmitted.

The package can contain:

- professional profile;
- target role;
- academy scores;
- credentials;
- capstones;
- workplace missions;
- production releases;
- peer-review evidence;
- technical viva history;
- CV evidence bullets;
- development gaps and CodeQuest deep links.

## Privacy model

- Explicit consent is required for every export.
- Shared login is not enabled.
- Automatic background transfer is not enabled.
- The learner chooses whether to import the file into ApplyPilotPro.
- Export history records package metadata, not a second copy of the full exported content.

## Future integration

A future authenticated API could accept the same evidence contract. It should use:

- explicit account linking;
- revocable consent;
- a signed one-time exchange or OAuth-style authorisation;
- per-section permissions;
- audit history;
- deletion and unlinking controls.

Do not add a cross-product service-role key to browser code.
