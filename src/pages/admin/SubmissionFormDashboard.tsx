import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  pan: string;
  aadhaar: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  submission_date: string;
  invoice_number: string;
}

interface FormErrors {
  [key: string]: string;
}

const SubmissionForm: React.FC = () => {
  const API_BASE = 'https://speedforceev.in/api';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    pan: '',
    aadhaar: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    submission_date: '',
    invoice_number: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE}/submissions`, formData);

      if (response.data.success) {
        setSuccessMessage('Submission saved successfully!');
        // Reset form
        setFormData({
          name: '',
          pan: '',
          aadhaar: '',
          email: '',
          phone: '',
          state: '',
          city: '',
          submission_date: '',
          invoice_number: '',
        });
        setErrors({});
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error: any) {
      const errorData = error.response?.data;
      if (errorData?.errors) {
        setErrors(errorData.errors);
      } else {
        const errorMessage = errorData?.message || 'Error submitting form';
        alert(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Submission Form</h1>

      {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Name */}
        <div style={styles.formGroup}>
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={styles.input}
          />
          {errors.name && <span style={styles.error}>{errors.name}</span>}
        </div>

        {/* PAN */}
        <div style={styles.formGroup}>
          <label>PAN *</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            placeholder="e.g., AAAAA1234A"
            style={styles.input}
            maxLength={10}
          />
          {errors.pan && <span style={styles.error}>{errors.pan}</span>}
        </div>

        {/* Aadhaar */}
        <div style={styles.formGroup}>
          <label>Aadhaar *</label>
          <input
            type="text"
            name="aadhaar"
            value={formData.aadhaar}
            onChange={handleChange}
            placeholder="12-digit Aadhaar"
            style={styles.input}
            maxLength={12}
          />
          {errors.aadhaar && <span style={styles.error}>{errors.aadhaar}</span>}
        </div>

        {/* Email */}
        <div style={styles.formGroup}>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            style={styles.input}
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        {/* Phone */}
        <div style={styles.formGroup}>
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            style={styles.input}
            maxLength={10}
          />
          {errors.phone && <span style={styles.error}>{errors.phone}</span>}
        </div>

        {/* State */}
        <div style={styles.formGroup}>
          <label>State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="e.g., Gujarat"
            style={styles.input}
          />
          {errors.state && <span style={styles.error}>{errors.state}</span>}
        </div>

        {/* City */}
        <div style={styles.formGroup}>
          <label>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g., Ahmedabad"
            style={styles.input}
          />
          {errors.city && <span style={styles.error}>{errors.city}</span>}
        </div>

        {/* Date */}
        <div style={styles.formGroup}>
          <label>Submission Date *</label>
          <input
            type="date"
            name="submission_date"
            value={formData.submission_date}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.submission_date && <span style={styles.error}>{errors.submission_date}</span>}
        </div>

        {/* Invoice Number */}
        <div style={styles.formGroup}>
          <label>Invoice Number *</label>
          <input
            type="text"
            name="invoice_number"
            value={formData.invoice_number}
            onChange={handleChange}
            placeholder="e.g., INV-2024-001"
            style={styles.input}
          />
          {errors.invoice_number && <span style={styles.error}>{errors.invoice_number}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.submitButton,
            opacity: isSubmitting ? 0.6 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '30px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
  },
  error: {
    color: '#dc3545',
    fontSize: '12px',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    border: '1px solid #c3e6cb',
  },
};

export default SubmissionForm;
