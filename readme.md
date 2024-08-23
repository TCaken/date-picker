# Date Calculation React App

## Overview

This React application calculates and displays a table of date ranges, off days, and working days based on user input. It uses `react-datepicker` for date selection and `date-fns` for date manipulation.

## Features

- **Date Selection:** Choose a start date and optionally an end date.
- **Date Calculation:** Automatically calculates monthly date ranges, off days (Sundays), and working days.
- **Dynamic Table:** Displays a table with calculated date ranges, off days, working days, and totals.

## Personal Journey

As a Computer Science major, I’ve been exploring React and various libraries to deepen my understanding. This project offered a hands-on opportunity to apply React concepts and integrate third-party libraries like `react-datepicker` and `date-fns`. 

I faced and resolved challenges related to date manipulation and state management, which enhanced my problem-solving skills and understanding of React’s ecosystem.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Basic knowledge of React and JavaScript

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/date-calculation-react-app.git
   cd date-calculation-react-app
    ```

2. **Install Dependencies:**

    ```bash
    Copy code
    npm install
    ``` 

3. **Run the Application:**

    ```bash
    Copy code
    npm start
    ```

Navigate to http://localhost:3000 in your browser to see the application.

## Usage
- **Select Start Date**: Choose the start date using the date picker.
- **Optionally Select End Date**: Choose an end date if needed.
- **Calculate Table**: Click the Calculate table button to generate the table.
- **View Results**: Check the table for date ranges, off days, and working days.


## Code Explanation
- **State Management**: Utilizes React’s useState for managing start date, end date, and the generated table.
- **Date Calculations**: Uses date-fns functions like addDays, addMonths, and differenceInCalendarDays for date manipulations.
- **Rendering**: Dynamically renders a table with calculated results and totals.
