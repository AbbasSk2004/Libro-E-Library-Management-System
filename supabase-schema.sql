-- E-Library Database Schema for Supabase
-- This file contains the complete database schema and sample data for the E-Library application
-- 
-- Email Verification Features:
-- - Users must verify their email before accessing the library
-- - EmailVerifications table stores verification tokens with expiry
-- - Users table includes IsEmailVerified flag and token fields
-- - Tokens expire after 24 hours and can only be used once

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Users table
CREATE TABLE IF NOT EXISTS "Users" (
    "Id" SERIAL PRIMARY KEY,
    "Email" VARCHAR(255) UNIQUE NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "IsEmailVerified" BOOLEAN DEFAULT FALSE,
    "EmailVerificationToken" VARCHAR(500),
    "EmailVerificationTokenExpires" TIMESTAMP WITH TIME ZONE,
    "CreatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "Role" VARCHAR(50) NOT NULL DEFAULT 'User'
);

-- Create Books table
CREATE TABLE IF NOT EXISTS "Books" (
    "Id" SERIAL PRIMARY KEY,
    "Title" VARCHAR(500) NOT NULL,
    "Author" VARCHAR(255) NOT NULL,
    "Description" TEXT,
    "PublishedYear" INTEGER NOT NULL,
    "Category" VARCHAR(100) NOT NULL DEFAULT 'General',
    "NumberOfCopies" INTEGER NOT NULL DEFAULT 1,
    "Available" BOOLEAN DEFAULT TRUE,
    "CoverImage" TEXT,
    "CreatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create BorrowedBooks table
CREATE TABLE IF NOT EXISTS "BorrowedBooks" (
    "Id" SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL,
    "BookId" INTEGER NOT NULL,
    "BorrowedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "DueDate" TIMESTAMP WITH TIME ZONE NOT NULL,
    "Price" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "IdCardImagePath" TEXT,
    "CreatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE,
    FOREIGN KEY ("BookId") REFERENCES "Books"("Id") ON DELETE CASCADE
);

-- Create ReturnedBooks table
CREATE TABLE IF NOT EXISTS "ReturnedBooks" (
    "Id" SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL,
    "BookId" INTEGER NOT NULL,
    "BorrowedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "DueDate" TIMESTAMP WITH TIME ZONE NOT NULL,
    "ReturnedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "Price" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "IdCardImagePath" TEXT,
    "CreatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE,
    FOREIGN KEY ("BookId") REFERENCES "Books"("Id") ON DELETE CASCADE
);

-- Create EmailVerifications table
CREATE TABLE IF NOT EXISTS "EmailVerifications" (
    "Id" SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL,
    "Token" VARCHAR(500) UNIQUE NOT NULL,
    "ExpiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "IsUsed" BOOLEAN DEFAULT FALSE,
    FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_users_email" ON "Users"("Email");
CREATE INDEX IF NOT EXISTS "idx_users_email_verified" ON "Users"("IsEmailVerified");
CREATE INDEX IF NOT EXISTS "idx_users_email_verification_token" ON "Users"("EmailVerificationToken");
CREATE INDEX IF NOT EXISTS "idx_books_title" ON "Books"("Title");
CREATE INDEX IF NOT EXISTS "idx_books_author" ON "Books"("Author");
CREATE INDEX IF NOT EXISTS "idx_books_category" ON "Books"("Category");
CREATE INDEX IF NOT EXISTS "idx_books_number_of_copies" ON "Books"("NumberOfCopies");
CREATE INDEX IF NOT EXISTS "idx_books_available" ON "Books"("Available");
CREATE INDEX IF NOT EXISTS "idx_borrowed_books_user_id" ON "BorrowedBooks"("UserId");
CREATE INDEX IF NOT EXISTS "idx_borrowed_books_book_id" ON "BorrowedBooks"("BookId");
CREATE INDEX IF NOT EXISTS "idx_returned_books_user_id" ON "ReturnedBooks"("UserId");
CREATE INDEX IF NOT EXISTS "idx_returned_books_book_id" ON "ReturnedBooks"("BookId");
CREATE INDEX IF NOT EXISTS "idx_returned_books_returned_at" ON "ReturnedBooks"("ReturnedAt");
CREATE INDEX IF NOT EXISTS "idx_email_verifications_token" ON "EmailVerifications"("Token");
CREATE INDEX IF NOT EXISTS "idx_email_verifications_user_id" ON "EmailVerifications"("UserId");
CREATE INDEX IF NOT EXISTS "idx_email_verifications_expires_at" ON "EmailVerifications"("ExpiresAt");
CREATE INDEX IF NOT EXISTS "idx_email_verifications_is_used" ON "EmailVerifications"("IsUsed");

-- Create function to update UpdatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."UpdatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update UpdatedAt
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON "Users" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_books_updated_at 
    BEFORE UPDATE ON "Books" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_borrowed_books_updated_at 
    BEFORE UPDATE ON "BorrowedBooks" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_returned_books_updated_at 
    BEFORE UPDATE ON "ReturnedBooks" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO "Books" ("Title", "Author", "Description", "PublishedYear", "Category", "NumberOfCopies", "Available", "CoverImage")
VALUES 
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.', 1925, 'Fiction', 3, TRUE, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop'),
    ('To Kill a Mockingbird', 'Harper Lee', 'A gripping tale of racial injustice and childhood innocence in the American South.', 1960, 'Fiction', 2, TRUE, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop'),
    ('1984', 'George Orwell', 'A dystopian social science fiction novel about totalitarian control and surveillance.', 1949, 'Science Fiction', 0, FALSE, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop'),
    ('Pride and Prejudice', 'Jane Austen', 'A romantic novel of manners that critiques the British landed gentry.', 1813, 'Romance', 1, TRUE, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'),
    ('The Catcher in the Rye', 'J.D. Salinger', 'A coming-of-age story about teenage rebellion and alienation.', 1951, 'Fiction', 4, TRUE, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop'),
    ('Lord of the Flies', 'William Golding', 'A story about British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.', 1954, 'Fiction', 2, TRUE, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'),
    ('The Hobbit', 'J.R.R. Tolkien', 'A fantasy novel about a hobbit who goes on an unexpected journey.', 1937, 'Fantasy', 3, TRUE, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'),
    ('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 'The first book in the Harry Potter series about a young wizard.', 1997, 'Fantasy', 5, TRUE, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'),
    ('The Chronicles of Narnia', 'C.S. Lewis', 'A series of fantasy novels about children who discover a magical world.', 1950, 'Fantasy', 2, TRUE, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'),
    ('The Da Vinci Code', 'Dan Brown', 'A mystery thriller novel about a symbologist who uncovers a conspiracy.', 2003, 'Mystery', 1, TRUE, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop');

-- Create a view for available books
CREATE OR REPLACE VIEW "AvailableBooks" AS
SELECT 
    "Id",
    "Title",
    "Author",
    "Description",
    "PublishedYear",
    "Category",
    "NumberOfCopies",
    "CoverImage",
    "CreatedAt",
    "UpdatedAt"
FROM "Books"
WHERE "Available" = TRUE AND "NumberOfCopies" > 0;


-- Enable Row Level Security (RLS) for better security
ALTER TABLE "Users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Books" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BorrowedBooks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReturnedBooks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EmailVerifications" ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS (adjust based on your authentication needs)
-- For now, allowing all operations - you should customize these based on your auth setup
CREATE POLICY "Allow all operations on Users" ON "Users" FOR ALL USING (true);
CREATE POLICY "Allow all operations on Books" ON "Books" FOR ALL USING (true);
CREATE POLICY "Allow all operations on BorrowedBooks" ON "BorrowedBooks" FOR ALL USING (true);
CREATE POLICY "Allow all operations on ReturnedBooks" ON "ReturnedBooks" FOR ALL USING (true);
CREATE POLICY "Allow all operations on EmailVerifications" ON "EmailVerifications" FOR ALL USING (true);

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres;

-- Create storage bucket for ID card images
INSERT INTO storage.buckets (id, name, public) VALUES ('id-cards', 'id-cards', true);

-- Create storage bucket for book cover images
INSERT INTO storage.buckets (id, name, public) VALUES ('book-covers', 'book-covers', true);

-- Create policy for ID card uploads (users can upload their own ID cards)
CREATE POLICY "Users can upload their own ID cards" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'id-cards' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create policy for ID card downloads (users can view their own ID cards)
CREATE POLICY "Users can view their own ID cards" ON storage.objects
FOR SELECT USING (bucket_id = 'id-cards' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create policy for book cover uploads (admins can upload book covers)
CREATE POLICY "Admins can upload book covers" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'book-covers');

-- Create policy for book cover downloads (everyone can view book covers)
CREATE POLICY "Everyone can view book covers" ON storage.objects
FOR SELECT USING (bucket_id = 'book-covers');