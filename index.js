import React, { useState } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const { addDays, addMonths, differenceInCalendarDays } = require("date-fns"); // Import addMonths from date-fns

function App() {
  const [startDate, setStartDate] = useState(null); // State for start date
  const [endDate, setendDate] = useState(null); // State for end date
  const [tables, setTables] = useState([]);

  // Calculate totals
  const totalOffDays = tables.reduce((total, item) => total + item.offDays, 0);
  const totalWorkingDays = tables.reduce((total, item) => total + item.workingDays, 0);


  const contractMonths = 12;

  // Function to handle start date change
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setendDate(null); // Reset end date when start date changes
  };

  // Function to handle end date change
  const handleEndDateChange = (date) => {
    setendDate(date);
  };

  const countSundays = (d1, d2) => {
    let sundayCount = 0;
    let currentDate = new Date(d1);

    while (currentDate <= d2) {
      if (currentDate.getDay() === 0) {
        sundayCount++;
      }
      currentDate = addDays(currentDate, 1);
    }

    return [sundayCount, differenceInCalendarDays(d2, d1) + 1];
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!startDate) return;

    const table = [];
    let payday;
    let d1; let d2; let sundayCount; let numDays;

    if(endDate == null){
      payday = new Date(startDate);
      d1 = addMonths(payday, 0);
      d2 = addDays(addMonths(payday, 1), -1);
      [sundayCount, numDays] = countSundays(d1, d2);

      table.push({
        startDate: d1,
        "endDate": d2,
        offDays: sundayCount,
        workingDays: numDays - sundayCount,
      });
    }
    else{
      // Remember to change this
      payday = new Date(startDate);
    }

    for (let i = 1; i < contractMonths - 1; i++) {
      d1 = addMonths(payday, i);
      d2 = addDays(addMonths(payday, i+1), -1);
      [sundayCount, numDays] = countSundays(d1, d2);

      table.push({
        startDate: d1,
        endDate: d2,
        offDays: sundayCount,
        workingDays: numDays - sundayCount,
      });
    }

    if(payday.getMonth() == 1 && payday.getDate() == 29){
      d1 = addMonths(payday, contractMonths - 1);
      d2 = addMonths(payday, contractMonths);
      [sundayCount, numDays] = countSundays(d1, d2);
      table.push({
        startDate: d1,
        endDate: d2,
        offDays: sundayCount,
        workingDays: numDays - sundayCount,
      });
    }
    else{
      d1 = addMonths(payday, contractMonths - 1);
      d2 = addDays(addMonths(payday, contractMonths), -1);
      [sundayCount, numDays] = countSundays(d1, d2);

      table.push({
        startDate: d1,
        endDate: d2,
        offDays: sundayCount,
        workingDays: numDays - sundayCount,
      });
    }

    // Set the generated table
    setTables(table);
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            id="startDate"
            required
            showYearDropdown // Enable year dropdown
            showMonthDropdown // Enable month dropdown
            scrollableYearDropdown // Allow scrolling through years
            yearDropdownItemNumber={15} // Number of years to show in dropdown
            renderCustomHeader={({ date, changeYear, changeMonth }) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <select
                  value={new Date(date).getFullYear()}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {Array.from(
                    { length: 15 },
                    (_, i) => new Date().getFullYear() - 7 + i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={new Date(date).getMonth()}
                  onChange={({ target: { value } }) => changeMonth(value)}
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            )}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        {startDate && ( // Only show end date picker if start date is selected
          <div>
            <label htmlFor="endDate">Payday:</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}                
              minDate={addDays(startDate,1)} // End date can't be before start date
              id="endDate"
              showYearDropdown // Enable year dropdown
              showMonthDropdown // Enable month dropdown
              scrollableYearDropdown // Allow scrolling through years
              yearDropdownItemNumber={15} // Number of years to show in dropdown
              renderCustomHeader={({ date, changeYear, changeMonth }) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <select
                    value={new Date(date).getFullYear()}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {Array.from(
                      { length: 15 },
                      (_, i) => new Date().getFullYear() - 7 + i
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    value={new Date(date).getMonth()}
                    onChange={({ target: { value } }) => changeMonth(value)}
                  >
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month, index) => (
                      <option key={index} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              dateFormat="MM/dd/yyyy"
            />
          </div>
        )}

        <button type="submit">Calculate table</button>

        {/* Displaying the generated table */}
        {tables.length > 0 && (
          <div>
            <h2>Generated Table:</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Off Days</th>
                  <th>Working Dates</th>
                </tr>
              </thead>
              <tbody>
                {tables.map((item, index) => (
                  <tr key={index}>
                    <td>{item.startDate.toLocaleDateString()}</td>
                    <td>{item.endDate.toLocaleDateString()}</td>
                    <td>{item.offDays}</td>
                    <td>{item.workingDays}</td>
                  </tr>
                ))}
                 {/* Totals Row */}
                <tr>
                  <td colSpan="2"><strong>Total</strong></td>
                  <td><strong>{totalOffDays}</strong></td>
                  <td><strong>{totalWorkingDays}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
