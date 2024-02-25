window.addEventListener('DOMContentLoaded', () => {
  const monthFilterForm = document.querySelector('#month-filter-form');
  const monthSelect = monthFilterForm.querySelector('#month');
  const monthFilterBtn = monthFilterForm.querySelector('[type="submit"]');
  const showAllBtn = document.querySelector('#show-all');
  const tableBody = document.querySelector('tbody');
  const tableRows = tableBody.querySelectorAll('tr');

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

  showAllBtn.addEventListener('click', () => {
    showAll();    
  });
});