-- Habash Med Database Schema
-- Run: wrangler d1 execute habash-db --file=src/schema.sql --remote

CREATE TABLE IF NOT EXISTS categories (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  image_url  TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS products (
  id                TEXT PRIMARY KEY,
  model             TEXT NOT NULL,
  brand             TEXT NOT NULL,
  category_id       TEXT NOT NULL,
  short_description TEXT DEFAULT '',
  full_description  TEXT DEFAULT '',
  features          TEXT NOT NULL DEFAULT '[]',
  created_at        TEXT DEFAULT (datetime('now')),
  updated_at        TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS product_images (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id TEXT NOT NULL,
  r2_key     TEXT NOT NULL,
  url        TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Seed initial categories
INSERT OR IGNORE INTO categories (id, name, description) VALUES
  ('iols',       'Intraocular Lenses (IOLs)',                  'Premium intraocular lenses for cataract and refractive surgery.'),
  ('surgical',   'Surgical Supplies',                          'Sterile surgical disposables and ophthalmic supplies.'),
  ('diagnostic', 'Diagnostic & Imaging Equipment',             'Auto ref-keratometers, slit lamps, and fundus cameras.'),
  ('vision',     'Vision Testing & Refraction Equipment',      'Digital refractors, phoropters, and visual charts.'),
  ('clinic',     'Clinic Fixtures & Practice Equipment',       'Electric combined tables and ergonomic units.'),
  ('digital',    'Digital Imaging Accessories',                'Slit lamp and surgical microscope digital systems.');
