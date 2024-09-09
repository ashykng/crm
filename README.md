# CRM (Customer Relationship Management) System

This project is a Customer Relationship Management (CRM) system built with React for the frontend and Django for the backend. It allows users to manage customers, deals, leads, and track interactions between the business and its clients.

## Features

- **Customer Management**: Add, update, and delete customer records.
- **Lead Tracking**: Track leads and their progress through the sales funnel.
- **Deal Management**: Manage deals and contracts with customers.
- **User Authentication**: User registration, login, and secure access to CRM features.
- **Interaction History**: Track and log all customer interactions (calls, emails, meetings).
- **Dashboard**: View key metrics such as total deals, lead conversion rate, and active customers.
  
## Technologies Used

- **React**: For building the dynamic, component-based user interface.
- **Django**: For managing the backend, APIs, and business logic.
- **Django Rest Framework (DRF)**: For building a robust REST API to connect with the React frontend.
- **SQLite / PostgreSQL / MySQL**: For database management.
- **JWT Authentication**: For secure user authentication and session management.
- **Bootstrap**: For styling the React components and making the interface responsive.

## How It Works

1. **React Frontend**: Provides the user interface for managing customers, deals, and leads.
2. **Django Backend**: Manages API requests and handles the business logic for the CRM system.
3. **API Communication**: React sends HTTP requests (GET, POST, PUT, DELETE) to Django's API to fetch or modify CRM data.
4. **User Authentication**: Uses JWT tokens to authenticate users securely.
5. **Database**: Stores customer, deal, lead, and user information using SQLite by default or any other SQL-based database.
