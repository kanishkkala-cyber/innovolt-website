const { initDatabase, insertSampleData } = require('../models/database');

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing Innovolt Database...');
    
    await initDatabase();
    await insertSampleData();
    
    console.log('✅ Database initialization completed successfully!');
    console.log('📊 Sample data has been inserted.');
    console.log('🎉 You can now start the server with: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();
