  
  /* script.js */
  
  let currentPage = 1;
  const itemsPerPage = 10;
  
  function getEmployees() {
    return JSON.parse(localStorage.getItem('employees')) || [];
  }
  
  function saveEmployees(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employeeForm');
    const errorMsg = document.getElementById('errorMsg');
    const employeeList = document.getElementById('employeeList');
    const searchInput = document.getElementById('searchInput');
    const exportBtn = document.getElementById('exportCSV');
    const editingIdInput = document.getElementById('editingId');
    const submitBtn = document.getElementById('submitButton');
  
    displayEmployees();
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = editingIdInput.value;
      const lastName = document.getElementById('lastName').value.trim();
      const firstName = document.getElementById('firstName').value.trim();
      const email = document.getElementById('email').value.trim();
      const position = document.getElementById('position').value.trim();
  
      if (!lastName || !firstName || !email || !position) {
        errorMsg.textContent = 'Tous les champs sont obligatoires.';
        return;
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMsg.textContent = 'Email invalide.';
        return;
      }
  
      let employees = getEmployees();
  
      if (id) {
        employees = employees.map(emp => emp.id == id ? { id: parseInt(id), lastName, firstName, email, position } : emp);
      } else {
        employees.push({ id: Date.now(), lastName, firstName, email, position });
      }
  
      saveEmployees(employees);
      form.reset();
      editingIdInput.value = '';
      submitBtn.textContent = 'Ajouter';
      errorMsg.textContent = '';
      displayEmployees();
    });
  
    function displayEmployees() {
      const employees = getEmployees();
      const filtered = employees.filter(emp => {
        const q = searchInput.value.toLowerCase();
        return emp.lastName.toLowerCase().includes(q) || emp.firstName.toLowerCase().includes(q) || emp.email.toLowerCase().includes(q) || emp.position.toLowerCase().includes(q);
      });
  
      const start = (currentPage - 1) * itemsPerPage;
      const paginated = filtered.slice(start, start + itemsPerPage);
  
      employeeList.innerHTML = '';
  
      if (filtered.length === 0) {
        document.getElementById('emptyListMsg').style.display = 'block';
      } else {
        document.getElementById('emptyListMsg').style.display = 'none';
        paginated.forEach(emp => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${emp.lastName} ${emp.firstName}</td>
            <td>${emp.email}</td>
            <td>${emp.position}</td>
            <td>
              <button class="btn-edit" data-id="${emp.id}">Modifier</button>
              <button class="btn-delete" data-id="${emp.id}">Supprimer</button>
            </td>`;
          employeeList.appendChild(row);
        });
      }
  
      document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          const employees = getEmployees().filter(emp => emp.id !== id);
          saveEmployees(employees);
          displayEmployees();
        });
      });
  
      document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          const emp = getEmployees().find(emp => emp.id === id);
          if (emp) {
            document.getElementById('lastName').value = emp.lastName;
            document.getElementById('firstName').value = emp.firstName;
            document.getElementById('email').value = emp.email;
            document.getElementById('position').value = emp.position;
            editingIdInput.value = emp.id;
            submitBtn.textContent = 'Mettre à jour';
          }
        });
      });
  
      document.getElementById('pageInfo').textContent = `Page ${currentPage} / ${Math.ceil(filtered.length / itemsPerPage) || 1}`;
      document.getElementById('prevPage').disabled = currentPage === 1;
      document.getElementById('nextPage').disabled = currentPage >= Math.ceil(filtered.length / itemsPerPage);
    }
  
    searchInput.addEventListener('input', () => {
      currentPage = 1;
      displayEmployees();
    });
  
    document.getElementById('prevPage').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayEmployees();
      }
    });
  
    document.getElementById('nextPage').addEventListener('click', () => {
      currentPage++;
      displayEmployees();
    });
  
    exportBtn.addEventListener('click', () => {
      const employees = getEmployees();
      if (employees.length === 0) return;
      let csv = 'Nom Complet,Email,Poste\n';
      employees.forEach(emp => {
        csv += `${emp.lastName} ${emp.firstName},${emp.email},${emp.position}\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'annuaire_employes.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });
  