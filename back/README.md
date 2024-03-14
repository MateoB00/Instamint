# Instamint API

# NestJs Framework TypeScript

Welcome to Instamint API, a robust project built on the NestJs framework using TypeScript. This project aims to provide a scalable and efficient back-end solution for your applications, leveraging the power of TypeScript for enhanced developer experience and maintainability. With NestJs, you can seamlessly handle HTTP requests, manage database interactions, and implement complex business logic with ease, making it an ideal choice for building modern web applications. Let's dive into the world of NestJs and unleash the full potential of your back-end development endeavors!

- src/controllers/: Controllers handle incoming requests, process them, and return responses to the client.

- src/entities/: Entities represent the data models or database tables in the application.

- src/modules/: Modules encapsulate related functionality, such as authentication, user management, etc.

- src/services/: Services contain business logic and perform operations not directly tied to handling HTTP requests.

- main.ts: Entry point of the application, where the server is initialized and started.

- app.module.ts: Main module of the application, where other modules, controllers, and services are imported and configured.

## Dependencies

This project relies on several dependencies to enhance its functionality:

#### Nodemailer
Nodemailer is a module for Node.js applications that allows you to send emails. It supports various transport methods, including SMTP, sendmail, and others, making it versatile for different email sending needs within your application.

#### @nestjs-modules/mailer
@nestjs-modules/mailer is a module for NestJS applications that provides integration with Nodemailer. It simplifies the process of sending emails from your NestJS application by providing decorators and utilities for email-related tasks.

#### Passport-JWT
Passport-JWT is a Passport strategy for authenticating with JSON Web Tokens (JWT). It allows you to authenticate requests using JWTs as the bearer token, enabling secure and stateless authentication in your application.

These dependencies are crucial for implementing authentication and email functionalities within your NestJS application, providing security and communication capabilities essential for many web applications.