import React, { useState, useEffect } from 'react';
import type { Book } from '../../api/admin';

const CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Mystery',
  'Thriller',
  'Biography',
  'History',
  'Science',
  'Technology',
  'Philosophy',
  'Religion',
  'Art',
  'Music',
  'Poetry',
  'Drama',
  'Comedy',
  'Horror',
  'Adventure',
  'Children',
  'Young Adult',
  'Reference',
  'Textbook',
  'General'
];

// Generate years from 1800 to current year + 1
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear + 1; year >= 1800; year--) {
    years.push(year);
  }
  return years;
};

const PUBLICATION_YEARS = generateYears();

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onSave: (bookData: Partial<Book>) => void;
}

const BookModal: React.FC<BookModalProps> = ({ isOpen, onClose, book, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'General',
    publicationYear: new Date().getFullYear(),
    description: '',
    numberOfCopies: 1
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        publicationYear: book.publishedYear,
        description: book.description || '',
        numberOfCopies: book.numberOfCopies
      });
      setImagePreview(book.coverImage || null);
    } else {
      setFormData({
        title: '',
        author: '',
        category: 'General',
        publicationYear: new Date().getFullYear(),
        description: '',
        numberOfCopies: 1
      });
      setImagePreview(null);
    }
    setCoverImage(null);
    setErrors({});
  }, [book, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (formData.publicationYear < 1000 || formData.publicationYear > new Date().getFullYear() + 1) {
      newErrors.publicationYear = 'Please enter a valid publication year';
    }

    if (formData.numberOfCopies < 0) {
      newErrors.numberOfCopies = 'Number of copies cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const bookData: any = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category.trim(),
        publishedYear: formData.publicationYear,
        description: formData.description.trim(),
        numberOfCopies: formData.numberOfCopies,
        coverImage: coverImage || undefined
      };

      onSave(bookData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) || 0 : value)
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          coverImage: 'Please select a valid image file'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          coverImage: 'Image size must be less than 5MB'
        }));
        return;
      }

      setCoverImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.coverImage) {
        setErrors(prev => ({
          ...prev,
          coverImage: ''
        }));
      }
    }
  };

  const removeImage = () => {
    setCoverImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {book ? 'Edit Book' : 'Add New Book'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter book title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.author ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700">
                  Publication Year *
                </label>
                <select
                  name="publicationYear"
                  id="publicationYear"
                  value={formData.publicationYear}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.publicationYear ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  {PUBLICATION_YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.publicationYear && (
                  <p className="mt-1 text-sm text-red-600">{errors.publicationYear}</p>
                )}
              </div>

              <div>
                <label htmlFor="numberOfCopies" className="block text-sm font-medium text-gray-700">
                  Number of Copies *
                </label>
                <input
                  type="text"
                  name="numberOfCopies"
                  id="numberOfCopies"
                  value={formData.numberOfCopies}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow numbers
                    if (value === '' || /^\d+$/.test(value)) {
                      setFormData(prev => ({
                        ...prev,
                        numberOfCopies: value === '' ? 0 : parseInt(value, 10)
                      }));
                    }
                  }}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.numberOfCopies ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter number of copies"
                />
                {errors.numberOfCopies && (
                  <p className="mt-1 text-sm text-red-600">{errors.numberOfCopies}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter book description"
              />
            </div>

            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <div className="mt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {errors.coverImage && (
                  <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>
                )}
                
                {imagePreview && (
                  <div className="mt-4">
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Cover preview"
                        className="h-32 w-24 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {book ? 'Update Book' : 'Create Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
