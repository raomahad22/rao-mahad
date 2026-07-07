-- Execute this SQL in your Supabase SQL Editor

-- 1. Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Services Table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tools Table
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  percent TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Testimonials Table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  rating INTEGER NOT NULL,
  avatar TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Contacts Table (For the Contact Form)
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interest TEXT,
  budget TEXT,
  country TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Site Content Table (For Hero, About, etc.)
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- INITIAL DATA SEEDING
-- Run the following to populate your website
-- ==========================================

-- Seed Services
INSERT INTO services (title, description, icon) VALUES
('Guest Posting', 'High-quality contextual backlinks from authoritative websites to boost your domain authority.', 'FileText'),
('Local SEO', 'Optimize your Google Business Profile and local citations to dominate local search results.', 'MapPin'),
('Content Writing', 'SEO-optimized, engaging content that ranks well and converts visitors into customers.', 'PenTool'),
('Link Building', 'Strategic link building campaigns to improve your websites backlink profile and trust flow.', 'Link'),
('Technical SEO', 'Comprehensive technical audits and fixes to ensure your website is perfectly optimized for search engines.', 'Smartphone'),
('E-commerce SEO', 'Specialized optimization for online stores to increase product visibility and sales.', 'Store')
ON CONFLICT DO NOTHING;

-- Seed Testimonials
INSERT INTO testimonials (text, name, role, rating, avatar) VALUES
('Mahad completely transformed our organic presence. Within 6 months, our non-branded traffic tripled, and we secured top rankings. Highly recommend his services.', 'Sarah Jenkins', 'CMO at TechFlow', 5, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'),
('The technical SEO audit was incredibly thorough. He found issues we had no idea existed. Fixing them led to an immediate 40% bump in search visibility.', 'David Chen', 'Founder, GrowthWorks', 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'),
('Our sales from organic search doubled after Mahad revamped our product page SEO and implemented a targeted link-building strategy.', 'Elena Rodriguez', 'E-commerce Director', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80')
ON CONFLICT DO NOTHING;

-- Seed Projects
INSERT INTO projects (title, image, tags) VALUES
('E-commerce SEO Growth', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', ARRAY['SEO', 'E-commerce', 'Link Building']),
('Local Business Ranking', 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80', ARRAY['Local SEO', 'Google My Business']),
('Technical Audit & Fixes', 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80', ARRAY['Technical SEO', 'Site Speed'])
ON CONFLICT DO NOTHING;

-- Seed Site Content
INSERT INTO site_content (section, content) VALUES
('hero', '{"title": "Scale Your Business With Proven SEO Strategies", "subtitle": "I help businesses increase their organic traffic, rank higher on Google, and generate more revenue through data-driven SEO.", "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"}')
ON CONFLICT (section) DO UPDATE SET content = EXCLUDED.content;
