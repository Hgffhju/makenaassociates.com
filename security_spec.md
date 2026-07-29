# Firestore Security Rules Specification

## 1. Data Invariants

1. **Consultation Requests (`/consultations/{consultationId}`)**:
   - `fullName`, `email`, `serviceType`, and `projectScope` are required strings with length constraints.
   - `status` must be one of `['Pending', 'Contacted', 'Scheduled', 'Completed', 'Archived']`.
   - Creation is allowed for anyone (clients submitting consultation forms) or authenticated users.
   - Updates are restricted: users can update their own consultation requests before completion, or admins can update status.

2. **Saved Estimates (`/estimates/{estimateId}`)**:
   - `userId` must equal `request.auth.uid`.
   - `buildingType`, `finishLevel`, `grossFloorArea`, `estimatedCostKes` are required.
   - Only the creator (`userId == request.auth.uid`) or admin can read, update, or delete an estimate.

3. **User Profiles (`/users/{userId}`)**:
   - A user profile at `/users/{userId}` can only be created/updated if `request.auth.uid == userId`.
   - Reads allowed if `request.auth.uid == userId` or admin.

## 2. Dirty Dozen Test Payloads

1. **Malicious Admin Promotion**: `{ "isAdmin": true, "email": "attacker@fake.com" }` to `/users/{userId}`. (Blocked: No user-editable admin flags)
2. **Consultation Overflow Attack**: String of 1,000,000 characters in `fullName`. (Blocked: `fullName.size() <= 100`)
3. **Invalid Consultation Status**: `{ "status": "APPROVED_FREE_PROJECT" }`. (Blocked: Enum restriction)
4. **Estimate Spoofing**: `userId: "victim_uid_123"` when auth UID is `"attacker_uid_456"`. (Blocked: `incoming().userId == request.auth.uid`)
5. **Ghost Field Injection**: Adding `{ "secretBackdoor": "granted" }` on consultation submission. (Blocked: Strict key checks)
6. **Path Traversal / ID Poisoning**: Document ID `"../../admin_override"`. (Blocked: `isValidId(id)`)
7. **Negative Square Footage**: `{ "grossFloorArea": -500, "estimatedCostKes": -10000 }`. (Blocked: Positive number bounds)
8. **Unauthenticated Estimate Creation**: Trying to write to `/estimates/est123` with `request.auth == null`. (Blocked: `isSignedIn()`)
9. **Tampering with Immutable Creation Time**: Updating `createdAt` in `/estimates/{estimateId}` to a past date. (Blocked: `incoming().createdAt == existing().createdAt`)
10. **Shadow Key Attack on User Profile**: Attempting to alter `email` to another user's address. (Blocked: Auth identity matching)
11. **Spoofed Email Access**: User with `email_verified == false` attempting admin write. (Blocked: `request.auth.token.email_verified == true`)
12. **Blanket Query Scraping**: Attempting to list all saved estimates without filtering by `userId`. (Blocked: List rule checks `resource.data.userId == request.auth.uid`)
