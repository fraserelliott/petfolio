# Error/success messages

Instead of using `console.log` or `console.error`, there is a toast system built in so all you need to do is as follows, please note the location to import from may differ depending on the file you are using this in. This function adds a message at the bottom right of the screen.

```js
import { useToast } from "../contexts/ToastContext";
const { addToastMessage } = useToast();
addToastMessage("Test", "success");
```

addToastMessage has 3 parameters:
- message: the text to display
- type: 'success' (green) or 'error' (red)
- delayMs: delay in milliseconds before the error starts to fade, this defaults to 2350

# 🏷️ Issue Tagging & Folder Structure Legend

**Priority (Traffic Light System):**  
- 🔴 **Must** — Core features required for MVP. Highest priority.  
- 🟠 **Should** — Important features to add after Musts. Medium priority.  
- 🟢 **Could** — Nice-to-have features, lower priority, add if time permits.

**Scope Tags:**  
- **page** — Full-page components; placed in `/src/pages`. These correspond to routes handled in `App` (using `react-router-dom`).  
- **context** — React Context providers or hooks managing state/data; placed in `/src/context`.  
- **frontend** — UI components that are neither full pages nor contexts; placed in `/src/components`.  
- **backend** — Backend-related issues like models, routes, middleware.

**Folder Structure Mapping:**  
/src
/pages ← page tagged issues go here
/context ← context tagged issues go here
/components ← frontend tagged issues (excluding contexts/pages) go here

**Additional Notes:**  
- Issues tagged with multiple scopes (e.g., `frontend` + `context`) follow the `context` folder for React Contexts.  
- Priority colors help identify urgency and focus. Work through **Must** issues first before moving to **Should** and **Could**.  
- Dependencies between issues will be linked in issue descriptions for clarity on task order.

# How to set up

1. Clone the repo
2. Open the folder in VS Code
3. `cd frontend` or `cd backend`, depending on which you are working on
4. Run `npm run setup`. This will install all dependencies and set up the Python virtual environment.
5. Edit the `.env` file in the backend folder with your MySQL configuration.
6. Set up mysql:
```bash
cd backend
mysql -u root -p
```
```sql
source schema.sql;
```


# How to run for testing

There are pre-made scripts to ensure the correct servers run and URLs are set for API access.  
Please do **not** change these; if anything isn't working or you're unsure, ask Fraser.

**For Frontend:**
1. Use `npm run dev-mock` while the backend is still in development or use `npm run dev-render` to use the live server instead of locally host.
2. Use `npm run dev-backend` once you get the go-ahead.

**For Backend:**
- Use `npm run dev`

# Server GUI Notes

- Failure Simulation: Use the dropdowns to trigger simulated failures on specific routes or middleware. This helps test error handling in the frontend.

- Reset Button: Reloads the server data from the JSON files. The server keeps data in memory during runtime and does not write changes back to JSON files, so resetting restores the initial dataset.


# Notes on Foreign Keys and Joined Data

Some dataset fields, like `post_id` or `user_id`, appear in mock data as placeholders to show relationships.  
**Please do not** use these fields to trigger extra fetches in the UI.

In the real backend, these relationships will be resolved and joined automatically, so the frontend receives fully joined data.

If you notice any foreign-key-like fields causing confusion or requiring additional fetching, please raise this with Fraser. This helps us improve the placeholders once the backend is complete. These are listed in the `Datasets` section of this document.

If you have any doubts, ask — these can be quickly checked in the generation config.


# Branches and Pull Requests

Please use a branch for the issue you've assigned yourself to and only upload here, never to the main branch. Once you have finished working on it, create a pull request and ensure you include a link to the issue in the request template. This will then be reviewed for consistency with the rest of the codebase, merged and any constructive feedback provided.

If you have any issues working on your branch or want any help, please feel free to ask straight away. We'll always be able to help you and will ensure a smooth project by tackling any problems together.


# Style Notes

There are some css variables in index.css, please use these across the project for consistent styling. If you are looking to change these, please discuss with the group so we can all agree on the project's direction.


# Contexts

If you feel there's anything that should be available across the whole project e.g. the username of the logged in user, check the contexts folder to see what's there. If it's not in here, please raise to the group and this can be created to stay consistent and have this available for everyone.


# Development Notes

The following section is auto-generated from the current API and dataset configurations to provide up-to-date information on endpoints, middleware, and datasets.


## Middleware

### auth_token
- accepted_token: petfolio123

### input_check


### permissions_token
- accepted_tokens: (none)

## Datasets

### users
id, name, email, password, avatar

### posts
id, caption, image, likes, created_at, posted_by

**Note:** This dataset is linked to `users` via `users_id` foreign key field.

### comments
id, text, created_at, commenter_id, posts_id

**Note:** This dataset is linked to `posts` via `posts_id` foreign key field.
**Note:** The following fields are foreign keys and should not be used to trigger extra fetches:
- `users_id`

## Endpoints

### /api/users
- method: POST
- data_set: users
- middleware: [  ]
- metadata: 
  - creates_entry: True

### /api/users/{id}
- method: GET
- data_set: users
- middleware: [ auth_token ]
- metadata: 
  - singular_response: True

### /api/users/{id}
- method: DELETE
- data_set: users
- middleware: [ auth_token ]
- metadata: 
  - singular_response: True

### /api/users/{id}
- method: PUT
- data_set: users
- middleware: [ auth_token ]
- metadata: (none)

### /api/users/login
- method: AUTH
- data_set: users
- middleware: [  ]
- metadata: (none)

### /api/posts
- method: GET
- data_set: posts
- middleware: [  ]
- metadata: (none)

### /api/posts
- method: POST
- data_set: posts
- middleware: [ auth_token ]
- metadata: (none)

### /api/posts/:id
- method: DELETE
- data_set: posts
- middleware: [ auth_token ]
- metadata: 
  - singular_response: True

### /api/posts/{id}
- method: PUT
- data_set: posts
- middleware: [ auth_token ]
- metadata: (none)

### /api/posts/following
- method: GET
- data_set: posts
- middleware: [ auth_token ]
- metadata: (none)

### /api/comments
- method: POST
- data_set: comments
- middleware: [ auth_token ]
- metadata: 
  - creates_entry: True
  - creates_created_at: True

### /api/comments
- method: GET
- data_set: comments
- middleware: [  ]
- metadata: (none)

### /api/comments/{id}
- method: DELETE
- data_set: comments
- middleware: [ auth_token ]
- metadata: 
  - singular_response: True

### /api/comments/{id}
- method: PUT
- data_set: comments
- middleware: [ auth_token ]
- metadata: (none)