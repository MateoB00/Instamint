# Instamint

- Mohamed BENKHADDA (BenkhaddaMd) <mohamed.ben-khadda@supdevinci-edu.fr>
- Soumaya BEN HAMADI (ssoumayabenhamadi) <soumaya.ben-hamadi@supdevinci-edu.fr>
- Alexandre CANO (LePariisien) <alexandre.cano@supdevinci-edu.fr>
- Matéo BIANCO (MateoB00) <mateo.bianco@supdevinci-edu.fr>

## Overview

>We're developers at a young digital agency, and we've embarked on a mission to respond to a call for proposals for the development of a social sharing platform based on NFTs (Non-Fungible Tokens). The platform is envisaged as a fusion of familiar Instagram features with web3 technologies. Our aim is to create a dynamic and immersive space where users can share, discover and interact with NFT content in innovative ways. 

## Folder Structure

```
hooks.sh
.github/
  pull_request_template.md
  workflows/
    github-ci.yml
back/
  README.md
  package.json
  .eslintrc.js
  .tsconfig.json
  .vercel.json
  ...
  node_modules/
  test/
  src/
    user/
        user.controller.ts
        user.service.ts
        user.entity.ts
        user.module.ts      
    main.ts
    app.module.ts
front/
  README.md
  .eslintrc.js
  .tsconfig.json
  package.json
  ...
  node_modules/
  public/
    index.html
    favicon.ico
  src/
    assets/
    components/
    pages/
    main.tsx
    App.tsx
```

## Installation and start of the project
This project is a full-stack web application built with NestJS and ReactJS. It consists of a backend API powered by NestJS and a frontend user interface built with ReactJS.
### Pre-commit Hook
The pre-commit hook is designed to run before each commit. It checks for any changes made to TypeScript files (.ts, .tsx) and triggers the following actions:

Runs ESLint to enforce code style and catch potential errors.
Applies Prettier formatting to maintain consistent code formatting.
Executes Jest tests to ensure code integrity.
This hook helps maintain code quality and prevents committing code that does not meet specified standards.

### Pre-push Hook
The pre-push hook is executed before each push to a remote repository. It verifies the name of the local branch to ensure it adheres to a specific naming convention. Branch names must start with one of the following prefixes: feature/, bugfix/, docs/, build/, refactor/, hotfix/, test/, main, dev, or staging. If the branch name does not meet this requirement, the push is rejected, prompting the developer to rename the branch accordingly.

### Commit-msg hook
The commit message format should match the following pattern:

- Feature commits: feature/feature_name
- Documentation commits: docs/documentation_name
- Build commits: build/build_name
- Refactor commits: refactor/refactor_name
- Tests commits: tests/test_name
- Bugfix commits: bugfix/bug_description
- Hotfix commits: hotfix/bug_description

### 1 - Clone repository

```
with SSH
git clone git@github.com:MateoB00/Instamint.git 
with HTTPS
git clone https://github.com/MateoB00/Instamint.git
```

### 2 - Launch hooks

```
chmod +x ./hooks.sh
./hooks.sh
```

### 3 - Install dependencies
Install back-end dependencies
```
cd back/
npm install
```
Create .env file and replace environnements variables
```
cp .env.example .env.local 
```
Start back-end application
```
npm run start
```
Install front-end dependencies
```
cd ../front/
npm install
```
Create .env file and replace environnements variables
```
cp .env.example .env.local 
```
Start front-end application
```
npm run dev
```

## Project Deployment
Both the frontend and backend of our project are deployed using Vercel, ensuring seamless and efficient deployment workflows.

### Frontend Deployment

The frontend of our project is deployed automatically on every push to the repository. This ensures that the latest changes to the frontend are immediately reflected in the production environment providing real-time updates to users.

### Backend Deployment

The backend of our project follows a controlled deployment strategy to maintain stability and consistency across different environments.

- Deployment on Dev, Staging, and Main Branches:  
The backend is deployed to Vercel only when changes are pushed to the dev, staging, or main branches. This ensures that backend changes undergo thorough testing and validation before being deployed to production.  

- Forced Production Deployment:   
 A script named ```deploy_vercel.sh``` is located at the root of the backend project. This script, when executed, forces the backend to be deployed to the main, dev, and staging branches. By enforcing backend deployment first, we maintain consistency and prevent any discrepancies between frontend and backend versions in production.  

This deployment strategy ensures a robust and synchronized deployment process, allowing us to deliver high-quality software with confidence and reliability.
