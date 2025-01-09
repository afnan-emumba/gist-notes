# Git Notes - Advanced Level

## Description

This project, **Git Notes**, aims to provide a powerful and user-friendly solution for managing GitHub Gists. While Gists are popular for sharing code snippets, configuration files, and more, this application elevates the experience by offering seamless management, enhanced functionality, and intuitive design.

## Features

### **Landing Page**

- Displays a paginated list of public Gists from the GitHub API.
- **Layouts**:
  - List Layout
  - Grid Layout
- **Search**: Search for Gists using their ID.
- **Header**: Includes a login menu for GitHub authentication.

### **Login**

- Login using GitHub OAuth.
- Maintains the user session.
- Displays the user profile picture in the header after logging in.

### **Gist Page**

- Displays detailed information about a selected Gist, including owner details.
- Users can:
  - Star a Gist.
  - Fork a Gist (available only after logging in).
- Public Gists:
  - Editing and deleting options are disabled.

### **Create Gist**

- Allows users to create a new Gist with multiple files.
- Add files dynamically with the "Add File" button.
- Submit the Gist using the "Create Gist" button.

### **User Profile**

- Access via the profile menu:
  - View and manage the user’s own Gists.
  - View starred Gists (starred Gists display a filled star icon).
- Logout functionality to end the session.

### **Dynamic Updates**

- Real-time updates for all operations:
  - Starred Gists.
  - Forked Gists.
  - Created Gists.
