# ✨ Reciplorer ✨

## Table of Contents
- [Introduction](#introduction)
- [Setup and Installation](#setup-and-installation)
- [Design Decisions and Trade-offs](#design-decisions-and-trade-offs)
- [Known Limitations](#known-limitations)

---

## Introduction
**Reciplorer** is your go-to recipe explorer! Discover a curated collection of recipes, making it easy to find and prepare delicious meals. The platform focuses on providing a user-friendly interface with features that help users search, filter, and explore recipes effortlessly.

GitHub Repository: [https://github.com/rahmlad-aramide/reciplorer](https://github.com/rahmlad-aramide/reciplorer)

---

## Setup and Installation

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/rahmlad-aramide/reciplorer.git
   cd reciplorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Access the application:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## Design Decisions and Trade-offs

### Key Design Decisions
1. **Technology Stack**:
   - **Next.js** was chosen for its built-in routing, perfomance and optimization, and SEO benefits.
   - **Tailwind CSS** was used for fast and consistent UI styling.
   - **shadcn UI library** was incorporated to accelerate UI development, ensuring the interface is intuitive, responsive, and easy to extend.
   
2. **State Management**:
   - **React Context API** was used for managing global state. This choice simplifies state management as the application doesn't deal with highly complex states.

3. **Responsive Design**:
   - The application is fully responsive, ensuring a great user experience on both desktop and mobile devices.

4. **Component Reusability**:
   - The app uses a modular, component-based architecture to ensure scalability and maintainability.

### Trade-offs

1. **Feature Prioritization**:
   - The project prioritizes delivering essential features (e.g., recipe search and filtering) over advanced capabilities like internationalization.

---

## Known Limitations

1. **Browser Support**:
   - The application has been tested on modern browsers (Chrome, Firefox, Safari) and may not work optimally on older versions of Internet Explorer.

2. **Lack of Internationalization**:
   - The application currently supports only English.

3. **Minimal Error Handling**:
   - Some error scenarios (e.g., network failures) are handled minimally and may require further enhancements.

---