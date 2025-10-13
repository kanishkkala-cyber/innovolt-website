const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DB_PATH || './database.sqlite';
const db = new sqlite3.Database(dbPath);

// Initialize database tables
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Cars table
      db.run(`
        CREATE TABLE IF NOT EXISTS cars (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          image TEXT,
          kilometers TEXT,
          owners TEXT,
          price TEXT,
          emi TEXT,
          location TEXT,
          brand TEXT,
          year TEXT,
          registrationYear TEXT,
          vehicleNumber TEXT,
          spareKey TEXT,
          spareWheel TEXT,
          chargerAvailable TEXT,
          batteryCondition TEXT,
          toolKitAvailable TEXT,
          images TEXT,
          status TEXT DEFAULT 'active',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Contact submissions table
      db.run(`
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          city TEXT NOT NULL,
          message TEXT NOT NULL,
          status TEXT DEFAULT 'new',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Lead captures table
      db.run(`
        CREATE TABLE IF NOT EXISTS lead_captures (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          carId INTEGER,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          message TEXT,
          status TEXT DEFAULT 'new',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (carId) REFERENCES cars (id)
        )
      `);

      // Callback requests table
      db.run(`
        CREATE TABLE IF NOT EXISTS callback_requests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          city TEXT NOT NULL,
          preferredTime TEXT,
          message TEXT,
          status TEXT DEFAULT 'new',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // User preferences table (for liked cars, compared cars, etc.)
      db.run(`
        CREATE TABLE IF NOT EXISTS user_preferences (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sessionId TEXT,
          likedCars TEXT,
          comparedCars TEXT,
          selectedCity TEXT DEFAULT 'Bangalore',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('✅ Database tables initialized successfully');
      resolve();
    });
  });
};

// Insert sample car data
const insertSampleData = () => {
  const sampleCars = [
    {
      title: "2022 Piaggio Ape E City FX",
      image: "https://assets.turnoclub.com/developer/offer-turno-images/S3/revamp/Piaggio_Gallery/piaggio_15.webp",
      kilometers: "15,000 km",
      owners: "1st Owner",
      price: "₹2,85,000",
      emi: "₹4,500/m*",
      location: "Bangalore",
      brand: "Piaggio E City Fx",
      year: "2022",
      registrationYear: "Sep 2022",
      vehicleNumber: "KA53**5209",
      spareKey: "Yes",
      spareWheel: "Yes",
      chargerAvailable: "Yes",
      batteryCondition: "Good",
      toolKitAvailable: "Yes",
      images: JSON.stringify([
        "https://assets.turnoclub.com/developer/offer-turno-images/S3/revamp/Piaggio_Gallery/piaggio_15.webp",
        "https://assets.turnoclub.com/developer/offer-turno-images/S3/revamp/Piaggio_Gallery/piaggio_1.webp",
        "https://assets.turnoclub.com/developer/offer-turno-images/S3/revamp/Piaggio_Gallery/piaggio_2.webp",
        "https://assets.turnoclub.com/developer/offer-turno-images/S3/revamp/Piaggio_Gallery/piaggio_3.webp",
        "https://assets.turnoclub.com/developer/offer-turno-images/S3/revamp/Piaggio_Gallery/piaggio_4.webp"
      ])
    },
    {
      title: "2021 Mahindra Treo Zor",
      image: "https://assets.turnoclub.com/developer/offer-turno-images/S3/revamp/Mahindra_Gallery/mahindra_1.webp",
      kilometers: "12,500 km",
      owners: "1st Owner",
      price: "₹3,20,000",
      emi: "₹5,200/m*",
      location: "Delhi",
      brand: "Mahindra Treo Zor",
      year: "2021",
      registrationYear: "Mar 2021",
      vehicleNumber: "DL8C**1234",
      spareKey: "Yes",
      spareWheel: "Yes",
      chargerAvailable: "Yes",
      batteryCondition: "Excellent",
      toolKitAvailable: "Yes",
      images: JSON.stringify([
        "https://assets.turnoclub.com/developer/offer-turno-images/S3/revamp/Mahindra_Gallery/mahindra_1.webp",
        "https://assets.turnoclub.com/developer/offer-turno-images/S3/revamp/Mahindra_Gallery/mahindra_2.webp",
        "https://assets.turnoclub.com/developer/offer-turno-images/S3/revamp/Mahindra_Gallery/mahindra_3.webp"
      ])
    }
  ];

  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO cars (
        title, image, kilometers, owners, price, emi, location, brand, year,
        registrationYear, vehicleNumber, spareKey, spareWheel, chargerAvailable,
        batteryCondition, toolKitAvailable, images
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    sampleCars.forEach(car => {
      stmt.run([
        car.title, car.image, car.kilometers, car.owners, car.price, car.emi,
        car.location, car.brand, car.year, car.registrationYear, car.vehicleNumber,
        car.spareKey, car.spareWheel, car.chargerAvailable, car.batteryCondition,
        car.toolKitAvailable, car.images
      ]);
    });

    stmt.finalize();
    console.log('✅ Sample car data inserted');
    resolve();
  });
};

module.exports = {
  db,
  initDatabase,
  insertSampleData
};
