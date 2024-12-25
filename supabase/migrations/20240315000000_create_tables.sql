-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT CHECK (image ~ '^https?://'),
    tags TEXT[] NOT NULL DEFAULT '{}',
    github VARCHAR(255) CHECK (github ~ '^https?://'),
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(500) NOT NULL,
    image TEXT CHECK (image ~ '^https?://'),
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    read_time INTEGER NOT NULL CHECK (read_time > 0),
    published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for projects table
CREATE POLICY "Enable read access for all users" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated admin users only" ON projects
    FOR INSERT
    WITH CHECK (
        auth.email() = 'cnyagakan@gmail.com'
    );

CREATE POLICY "Enable update for authenticated admin users only" ON projects
    FOR UPDATE
    USING (auth.email() = 'cnyagakan@gmail.com')
    WITH CHECK (auth.email() = 'cnyagakan@gmail.com');

CREATE POLICY "Enable delete for authenticated admin users only" ON projects
    FOR DELETE
    USING (auth.email() = 'cnyagakan@gmail.com');

-- Create policies for blog_posts table
CREATE POLICY "Enable read access for published posts" ON blog_posts
    FOR SELECT
    USING (published = true OR auth.email() = 'cnyagakan@gmail.com');

CREATE POLICY "Enable insert for authenticated admin users only" ON blog_posts
    FOR INSERT
    WITH CHECK (
        auth.email() = 'cnyagakan@gmail.com'
    );

CREATE POLICY "Enable update for authenticated admin users only" ON blog_posts
    FOR UPDATE
    USING (auth.email() = 'cnyagakan@gmail.com')
    WITH CHECK (auth.email() = 'cnyagakan@gmail.com');

CREATE POLICY "Enable delete for authenticated admin users only" ON blog_posts
    FOR DELETE
    USING (auth.email() = 'cnyagakan@gmail.com');

-- Add comment for documentation
COMMENT ON TABLE projects IS 'Stores portfolio project information with admin-only write access';
COMMENT ON TABLE blog_posts IS 'Stores blog posts with admin-only write access and public read for published posts';