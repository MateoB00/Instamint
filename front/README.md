# Instamint Front-End

# React + TypeScript + Vite + SCSS

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

This project that utilizes SCSS for managing styles. The architecture of the SCSS files follows an organized structure to facilitate code maintenance and extension.

```
src/
  sass/ 
  | 
  |– base/ 
  |   |– _typography.scss   
  |   ...                  
  | 
  |– utils/ 
  |   |– _variables.scss    
  |   |– _functions.scss   
  |   |– _helpers.scss     
  |   ...                 
  |
  |– layout/ 
  |   |– _grid.scss       
  |   |– _header.scss   
  |   |– _footer.scss     
  |   ...                 
  | 
  |– components/ 
  |   |– _buttons.scss     
  |   |– _carousel.scss   
  |   |– _navigation.scss   
  |   ...                 
  |
  |– pages/ 
  |   |– _home.scss        
  |   |– _profile.scss     
  |   ...                 
  | 
  `– main.scss             # primary Sass file
```