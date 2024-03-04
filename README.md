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
    scss/
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

## Project Deployment with Vercel

This project consists of both front-end and back-end applications that can be deployed to three different domains via three distinct branches: develop, staging, and main (production).

The deployment of the front-end or back-end application is executed only if there are modifications within the corresponding front or back directories with two scripts ```back/deploy_vercel.sh``` and ```front/deploys_vercel.sh```, which are read directly by Vercel.

### Frontend Deployment

The front-end can be deployed to the following domains:

* Develop: develop-instamint-iota.vercel.app

* Staging: staging-instamint-iota.vercel.app

* Production: instamint-iota.vercel.app

### Back-end Deployment

The back-end can be deployed to the following domains:

* Develop: develop-instamint-lxjh.vercel.app

* Staging: staging-instamint-lxjh.vercel.app

* Production: instamint-lxjh.vercel.app

### _This solution offers a number of advantages :_

* Isolation of Changes: Each branch corresponds to a specific stage of development or production, enabling changes to be made independently without affecting other environments.

* Easier Testing: Separate staging environments facilitate easy validation of changes by developers and testers before promotion to production, thereby reducing the risk of * introducing bugs or issues.

* Improved Stability: The segregation of development, staging, and production environments helps uphold stability in the production environment by minimizing the introduction of untested or unstable code.