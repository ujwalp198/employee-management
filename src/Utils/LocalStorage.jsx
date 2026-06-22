const defaultEmployees = [
  {
    "id": "EMP-1001",
    "name": "Arjun",
    "email": "employee1@example.com",
    "password": "123",
    "tasks": [
      {
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false,
        "title": "Update UI",
        "description": "Design a new login page.",
        "date": "2026-06-25",
        "category": "Design"
      },
      {
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false,
        "title": "Fix Bugs",
        "description": "Fix bug in the header component.",
        "date": "2026-06-20",
        "category": "Development"
      }
    ]
  },
  {
    "id": "EMP-1002",
    "name": "Priya",
    "email": "employee2@example.com",
    "password": "123",
    "tasks": [
      {
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false,
        "title": "Write Documentation",
        "description": "Update API docs.",
        "date": "2026-06-28",
        "category": "Docs"
      }
    ]
  }
];

const defaultAdmin = [
  {
    "id": "ADM-001",
    "name": "Admin",
    "email": "admin@example.com",
    "password": "123"
  }
];

export const setLocalStorage = () => {
  if (!localStorage.getItem('employees')) {
    localStorage.setItem('employees', JSON.stringify(defaultEmployees));
  }
  if (!localStorage.getItem('admin')) {
    localStorage.setItem('admin', JSON.stringify(defaultAdmin));
  }
}

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const admin = JSON.parse(localStorage.getItem('admin')) || [];
  return { employees, admin };
}

export const saveEmployeesData = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
}

export const saveAdminData = (admin) => {
  localStorage.setItem('admin', JSON.stringify(admin));
}
