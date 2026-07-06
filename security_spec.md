# Security Specifications for ScriptIQ Firebase Firestore Integration

## 1. Data Invariants
- **Users**: A user document (`/users/{userId}`) can only be read, created, or updated by the authenticated user whose `uid` matches `{userId}`. Users cannot modify their subscription `plan` field from client-side SDKs. They can increment their `usageCount` and update `lastUsageReset` only under strict verification.
- **Saved Scripts**: A script document (`/savedScripts/{scriptId}`) can only be created, read, updated, or deleted if `request.auth.uid == resource.data.userId` (for read/delete/update) or `request.auth.uid == request.resource.data.userId` (for create).
- **Newsletter Signups**: Anyone can write (create) to the `/newsletterSignups/{signupId}` collection. Nobody can read, list, update, or delete signup entries client-side.

---

## 2. The "Dirty Dozen" Payloads
Here are 12 specific JSON payloads designed to break the laws of Identity, Integrity, and State:

1. **Spoofed User Registration**: Attempt to register a user profile with an ID other than the auth UID.
   - *Target Path*: `/users/hacker123` (by auth UID `user789`)
2. **Self-Promote Subscription Plan**: Attempt to upgrade plan to `studio` or `pro` client-side.
   - *Target Path*: `/users/user789` (updating `plan: "studio"`)
3. **Reset Own Usage Count**: Attempt to manually zero-out the usage count client-side.
   - *Target Path*: `/users/user789` (updating `usageCount: 0`)
4. **Steal Other User's Saved Script**: Attempt to read another user's saved script.
   - *Target Path*: `/savedScripts/scriptABC` (owned by `user111`, requested by `user222`)
5. **Create Script for Another User**: Attempt to save a script with another user's `userId`.
   - *Target Path*: `/savedScripts/newScript` (auth UID `user222`, payload contains `userId: "user111"`)
6. **Overwrite Another User's Saved Script**: Attempt to modify a script owned by someone else.
   - *Target Path*: `/savedScripts/scriptABC` (owned by `user111`, updated by `user222`)
7. **Delete Another User's Saved Script**: Attempt to delete a script owned by someone else.
   - *Target Path*: `/savedScripts/scriptABC` (owned by `user111`, deleted by `user222`)
8. **Malicious Script Payload (Value Poisoning)**: Attempt to save a script with a 10MB prompt/topic.
   - *Target Path*: `/savedScripts/scriptXYZ` (payload topic size exceeds maximum limit of 5,000 characters)
9. **Junk ID Poisoning**: Attempt to write a script with a massive 2KB corrupted ID.
   - *Target Path*: `/savedScripts/corruptedID_very_long_string_overflow`
10. **Read Newsletter Signups**: Attempt to query/list all newsletter signups.
    - *Target Path*: `/newsletterSignups` (read/list query by any user)
11. **Edit Newsletter Signup**: Attempt to alter an email address in the newsletter signup list.
    - *Target Path*: `/newsletterSignups/signup123` (update action)
12. **Delete Newsletter Signup**: Attempt to delete a newsletter signup entry.
    - *Target Path*: `/newsletterSignups/signup123` (delete action)

---

## 3. The Test Runner Reference
All of these malicious inputs must fail. This specification guarantees they will be rejected by `firestore.rules`.
