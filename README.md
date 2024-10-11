# API Documentation

## 1. Users (/users)

### GET

This endpoint retrieves a list of all users and their current points.

- **Request**: No body required.
- **Response**:
  - **Status code**: `200 (OK)`
  - **Body**: An array of objects containing user data:
    - `userId` (string): Unique identifier for the user.
    - `name` (string): Username of the user.
    - `totalPoints` (number): Total points accumulated by the user.

---

## 2. Leaderboard (/leaderboard)

### GET

This endpoint retrieves the leaderboard ranking of all users. Users are ranked by their total points in descending order.

- **Request**: No body required.
- **Response**:
  - **Status code**: `200 (OK)`
  - **Body**: An array of objects containing leaderboard data:
    - `rank` (number): Current position of the user in the leaderboard.
    - `userId` (string): Unique identifier for the user.
    - `name` (string): Username of the user.
    - `totalPoints` (number): Total points accumulated by the user.

---

## 3. User History (/user-history)

### GET

This endpoint retrieves the historical point claim history for a specific user.

- **Request**:
  - **Query parameter**: 
    - `userId` (string): The unique identifier of the user for which to retrieve history.
- **Response**:
  - **Status code**: `200 (OK)`
  - **Body**: An array of objects containing historical claim data (if data exists):
    - `timestamp` (string): Date and time of the point claim in ISO 8601 format (e.g., "2024-10-11T20:36:00.000Z").
    - `pointsClaimed` (number): Number of points claimed in the specific entry.

---

## 4. Add User (/add-user)

### POST

This endpoint creates a new user in the system.

- **Request Body**:
  - `name` (string): Required. Username of the new user.
- **Response**:
  - **Status code**:
    - `201 (Created)` if the user is successfully added.
    - `400 (Bad Request)` if the request is invalid (e.g., missing required name field).
  - **Body**: Upon successful creation, an object containing the newly created user's data, with the properties mentioned in the GET /users endpoint response.

---

## 5. Claim Points (/claim-points)

### POST

This endpoint allows a user to claim points.

- **Request Body**:
  - `userId` (string): Required. Unique identifier of the user claiming points.
  - `pointsClaimed` (number): Required. Number of points being claimed (positive integer).
- **Response**:
  - **Status code**:
    - `200 (OK)` if the point claim is successful.
    - `400 (Bad Request)` if the request is invalid (e.g., missing required fields, invalid point value).
    - `404 (Not Found)` if the user with the provided userId is not found.
  - **Body**: Upon successful claim, an object containing the updated user data, with the properties mentioned in the GET /users endpoint response.