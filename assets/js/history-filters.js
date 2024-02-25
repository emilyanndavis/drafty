window.addEventListener('DOMContentLoaded', () => {
  const monthFilterForm = document.querySelector('#month-filter-form');
  const monthSelect = monthFilterForm.querySelector('#month');
  const monthFilterBtn = monthFilterForm.querySelector('[type="submit"]');
  const dateRangeFilterForm = document.querySelector('#date-range-filter-form');
  const startDateInput = dateRangeFilterForm.querySelector('#start-date');
  const endDateInput = dateRangeFilterForm.querySelector('#end-date');
  const minStartDateStrIso = dateRangeFilterForm.getAttribute('data-min-start-date-iso');
  const maxEndDateStrIso = dateRangeFilterForm.getAttribute('data-max-end-date-iso');
  const minStartDateStrShort = dateRangeFilterForm.getAttribute('data-min-start-date-short');
  const maxEndDateStrShort = dateRangeFilterForm.getAttribute('data-max-end-date-short');
  const startDateError1 = dateRangeFilterForm.querySelector('#start-date-error-1');
  const startDateError2 = dateRangeFilterForm.querySelector('#start-date-error-2');
  const endDateError1 = dateRangeFilterForm.querySelector('#end-date-error-1');
  const endDateError2 = dateRangeFilterForm.querySelector('#end-date-error-2');
  const showAllBtn = document.querySelector('#show-all');
  const tableBody = document.querySelector('tbody');
  const tableRows = tableBody.querySelectorAll('tr');

  const dateStrToDate = (dateStr) => {
    const dateParams = dateStr.split('-');
    return new Date(dateParams[0], dateParams[1] - 1, dateParams[2]);
  };

  const isStartDateOnOrBeforeEndDate = (startDate, endDate) => {
    return startDate.getTime() <= endDate.getTime();
  };  

  const isDateInRange = (date, rangeStart, rangeEnd) => {
    return date.getTime() >= rangeStart.getTime() && date.getTime() <= rangeEnd.getTime();
  };  

  const clearErrorMessages = () => {
    startDateError1.textContent = '';
    startDateError2.textContent = '';
    endDateError1.textContent = '';
    endDateError2.textContent = '';
  };

  const clearTableBody = () => {
    tableRows.forEach(row => row.remove());
  };

  const populateTableRows = (rows) => {
    rows.forEach(row => {
      tableBody.append(row);
    });
  };

  const showAll = () => {
    clearTableBody();
    populateTableRows(tableRows);
  };

  monthFilterBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (monthSelect.value) {
      const monthAndYear = monthSelect.value.split(' ');
      clearTableBody();
      const filtered = [];      
      tableRows.forEach(row => {
        const dateCell = row.querySelector('td:first-child');
        if (dateCell.textContent.includes(monthAndYear[0]) && dateCell.textContent.includes(monthAndYear[1])) {
          filtered.push(row);
        }
      });
      populateTableRows(filtered);
    } else {
      showAll();
    }
  });

  dateRangeFilterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrorMessages();
    if (startDateInput.value && endDateInput.value) {
      const startDate = dateStrToDate(startDateInput.value);
      const endDate = dateStrToDate(endDateInput.value);
      const minStartDate = dateStrToDate(minStartDateStrIso);
      const maxEndDate = dateStrToDate(maxEndDateStrIso);    
      const rangeValid = isStartDateOnOrBeforeEndDate(startDate, endDate);
      const startDateValid = isDateInRange(startDate, minStartDate, maxEndDate);
      const endDateValid = isDateInRange(endDate, minStartDate, maxEndDate);
      if (rangeValid && startDateValid && endDateValid) {
        clearTableBody();
        const filtered = [];
        tableRows.forEach(row => {
          const dateCell = row.querySelector('td:first-child');
          const dateStr = dateCell.getAttribute('data-iso-date-str');
          const date = dateStrToDate(dateStr);
          if (isDateInRange(date, startDate, endDate)) {
            filtered.push(row);
          }
        });
        populateTableRows(filtered);          
      } else {
        if (!rangeValid) {
          startDateError1.textContent = 'Error: start date must be on or before end date.';
          endDateError1.textContent = 'Error: end date must be on or after start date.';
        }
        if (!startDateValid) {
          startDateError2.textContent = 'Error: start date must be on or after ' + minStartDateStrShort + ' and on or before ' + maxEndDateStrShort + '.';
        }
        if (!endDateValid) {
          endDateError2.textContent = 'Error: end date must be on or after ' + minStartDateStrShort + ' and on or before ' + maxEndDateStrShort + '.';
        }
        showAll();
      }
    } else {
      showAll();
    }  
  });

  showAllBtn.addEventListener('click', () => {
    showAll();    
  });
});