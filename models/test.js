const { sequelize } = require('../models'); // Adjust the import path as needed

// Function to fetch tables from the database
const fetchTables = async () => {
  try {
    // Fetch all schemas and their tables
    const schemas = await sequelize.showAllSchemas();
    
    // Log the schemas and tables
    console.log('Schemas and tables:', schemas);
  } catch (error) {
    console.error('Error fetching schemas and tables:', error);
  }
};

// Call the function to fetch tables
fetchTables();