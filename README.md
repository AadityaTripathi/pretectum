# Flight Data Table with CSV Upload, Search, and Filter

This project implements a web application where users can upload a CSV file containing flight booking data, and the data is rendered in a responsive table. The table allows for pagination, searching, and filtering of the data. The app is built using Next.js with server-side rendering (SSR), React.js for the frontend, Ant Design for UI components, Redux Toolkit for state management, and TailwindCSS for styling.

## Features

- **CSV Upload**: The user can upload a CSV file with flight data.
- **Table Rendering**: The flight data is displayed in an Ant Design Table with pagination.
- **Search Functionality**: Users can search for records by typing keywords, with the search working across all columns or a specific column.
- **Filter by Column**: Users can filter data by selecting a specific column to search in.
- **Responsive Design**: The table and UI scale to fit different screen sizes and form factors.
- **Server-Side Rendering**: The page is loaded using Next.js' server-side rendering for fast performance.
- **Client-Side Search & Pagination**: Both search and pagination functionalities are handled client-side for optimal user experience.
- **Rich Visual Experience**: Ant Design components provide a polished UI/UX, including tooltips, labels, and responsive layouts.

## Tech Stack

- **Next.js**: Used for server-side rendering and routing.
- **React.js**: Core framework for building the user interface.
- **Ant Design**: UI library to handle layout, tables, inputs, and other UI elements.
- **Redux Toolkit**: Manages the global state, including the CSV data and filters.
- **Typescript**: Provides type safety throughout the application.
- **TailwindCSS**: Used for responsive styling and utility-based CSS.


## Key Functionalities

### 1. **CSV to JSON Conversion**
   - The uploaded CSV file is parsed into JSON and stored in Redux state for rendering in the table.

### 2. **Table Pagination**
   - The data is displayed in a paginated form using Ant Design's `Table` component.

### 3. **Search Affordance**
   - Users can search through the data using an input field. Searches can be performed across all columns or a specific column selected from a dropdown.

### 4. **Responsive UI**
   - The table and UI scale properly across different screen sizes using Ant Design’s grid system and TailwindCSS for mobile responsiveness.

### 5. **Column Filtering**
   - Users can filter data by a specific column, allowing for more focused searches.

### 6. **Server-Side Rendering (SSR)**
 - The page is loaded via Next.js' SSR for fast and efficient loading.

### 7. **Rich Visual Experience**
   - Ant Design components ensure that the UI is clean and polished with tooltips, well-labeled inputs, and responsive layouts for a smooth user experience.

