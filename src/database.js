
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('./database.sqlite')

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS staff (
    id TEXT PRIMARY KEY,
    status TEXT,
    level TEXT DEFAULT 'Beginner'
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    staffId TEXT,
    userId TEXT,
    startTime INTEGER,
    endTime INTEGER,
    duration INTEGER
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS points (
    staffId TEXT PRIMARY KEY,
    total INTEGER DEFAULT 0
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    staffId TEXT,
    userId TEXT,
    rating INTEGER,
    time INTEGER
  )`)
})

export default db
