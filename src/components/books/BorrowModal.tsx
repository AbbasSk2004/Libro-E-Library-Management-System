import React, { useState, useRef } from 'react';
import type { Book } from '../../api/books';
import '../../assets/books/BorrowModal.css';

interface BorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onConfirmBorrow: (bookId: number, startDate: string, endDate: string, idCardImage: File) => void;
}

const BorrowModal: React.FC<BorrowModalProps> = ({ isOpen, onClose, book, onConfirmBorrow }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [idCardImage, setIdCardImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculatePrice = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Library pricing: $2 per day
    return Math.max(0, daysDiff * 2);
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIdCardImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (book && startDate && endDate && idCardImage) {
      onConfirmBorrow(book.id, startDate, endDate, idCardImage);
      handleClose();
    }
  };

  const handleClose = () => {
    setStartDate('');
    setEndDate('');
    setIdCardImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30); // Maximum 30 days from today
  const maxDateString = maxDate.toISOString().split('T')[0];

  if (!isOpen || !book) return null;

  return (
    <div className="borrow-modal-overlay">
      <div className="borrow-modal-container">
        <div className="borrow-modal-header">
          <h2 className="borrow-modal-title">Borrow Book</h2>
          <button
            onClick={handleClose}
            className="borrow-modal-close-btn"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="borrow-modal-content">
          {/* Book Information */}
          <div className="book-info-section">
            <div className="book-info-header">
              <h3 className="book-info-title">Book Details</h3>
            </div>
            <div className="book-info-content">
              <div className="book-cover-container">
                {book.coverImage && (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="book-cover-image"
                  />
                )}
              </div>
              <div className="book-details">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">by {book.author}</p>
                <p className="book-year">Published: {book.publishedYear}</p>
              </div>
            </div>
          </div>

          {/* Borrow Form */}
          <form onSubmit={handleSubmit} className="borrow-form">
            <div className="form-section">
              <h3 className="form-section-title">Borrowing Period</h3>
              
              <div className="date-inputs">
                <div className="date-input-group">
                  <label htmlFor="startDate" className="date-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                    max={maxDateString}
                    className="date-input"
                    required
                  />
                </div>
                
                <div className="date-input-group">
                  <label htmlFor="endDate" className="date-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || today}
                    max={maxDateString}
                    className="date-input"
                    required
                  />
                </div>
              </div>

              {/* Price Calculation */}
              {(startDate && endDate) && (
                <div className="price-calculation">
                  <div className="price-breakdown">
                    <div className="price-item">
                      <span className="price-label">Duration:</span>
                      <span className="price-value">{calculateDays()} day(s)</span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">Rate:</span>
                      <span className="price-value">$2.00 per day</span>
                    </div>
                    <div className="price-total">
                      <span className="total-label">Total Cost:</span>
                      <span className="total-value">${calculatePrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="form-section">
              <h3 className="form-section-title">ID Verification</h3>
              <p className="form-description">
                Please upload a clear photo of your ID card for verification purposes.
              </p>
              
              <div className="id-upload-section">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                  id="idCardUpload"
                  required
                />
                <label htmlFor="idCardUpload" className="file-upload-label">
                  <div className="upload-content">
                    <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="upload-text">
                      {idCardImage ? 'Change ID Card Image' : 'Upload ID Card Image'}
                    </span>
                    <span className="upload-hint">Click to select image</span>
                  </div>
                </label>
                
                {imagePreview && (
                  <div className="image-preview">
                    <img
                      src={imagePreview}
                      alt="ID Card Preview"
                      className="preview-image"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIdCardImage(null);
                        setImagePreview(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="remove-image-btn"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Important Notice */}
            <div className="notice-section">
              <div className="notice-content">
                <div className="notice-icon">📚</div>
                <div className="notice-text">
                  <strong>Important:</strong> After confirming your borrowal, please come to the library to collect your book. You will receive immediate confirmation upon successful booking.
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="terms-section">
              <div className="terms-content">
                <h4 className="terms-title">Terms & Conditions</h4>
                <ul className="terms-list">
                  <li>Books must be returned by the due date</li>
                  <li>Late returns will incur additional charges ($1 per day)</li>
                  <li>Books must be returned in the same condition</li>
                  <li>Lost or damaged books will require replacement cost</li>
                  <li>ID verification is required for all borrowings</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button
                type="button"
                onClick={handleClose}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!startDate || !endDate || !idCardImage}
                className="confirm-btn"
              >
                Borrow Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BorrowModal;
