import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientForm.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
  User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  Phone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
  Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
  HeartPulse: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" /></svg>),
  Shield: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
  FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
  ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
  Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
  RotateCcw: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>),
  Lock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
  Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
  EyeOff: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>),
};

const initialFormData = {
  // Personal Details
  fullName: '',
  dob: '',
  gender: 'Female',
  phone: '',
  email: '',
  address: '',

  // Medical Information
  medicalHistory: '',
  allergies: '',
  currentMedications: '',
  emergencyName: '',
  emergencyPhone: '',

  // Portal Access
  enablePortal: false,
  password: '',
  confirmPassword: '',

  // Additional
  referralSource: 'Walk-in',
  notes: '',
};

const PatientForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear specific field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact Number is required';
    } else {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,14}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number (e.g. +94 71 234 5678)';
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Home Address
    if (!formData.address.trim()) {
      newErrors.address = 'Home Address is required';
    }

    // Portal Access validation
    if (formData.enablePortal) {
      if (!formData.password) {
        newErrors.password = 'Portal password is required when portal access is enabled';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      // Scroll to top of form if errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSuccessMessage('Patient registered successfully! Redirecting to Patient List...');
      
      setTimeout(() => {
        navigate('/admin/patients');
      }, 1200);
    } catch (err) {
      setErrors({ form: 'Failed to save patient. Please try again.' });
      setIsSubmitting(false);
    }
  };

  // Handle Clear Form
  const handleClear = () => {
    setFormData(initialFormData);
    setErrors({});
    setSuccessMessage('');
  };

  // Handle Cancel
  const handleCancel = () => {
    navigate('/admin/patients');
  };

  return (
    <div className="pf-page">
      <div className="pf-blob pf-blob-1" />
      <div className="pf-blob pf-blob-2" />

      <div className="pf-inner">
        {/* Top Navigation & Header */}
        <div className="pf-header">
          <button className="pf-back-btn" onClick={handleCancel} type="button">
            <Icon.ArrowLeft /> Back to Patients
          </button>
          <div className="pf-title-area">
            <h1 className="pf-title">Add new patient</h1>
            <p className="pf-subtitle">Register a new patient with complete personal, medical, and portal access details</p>
          </div>
        </div>

        {/* Success Banner */}
        {successMessage && (
          <div className="pf-banner success">
            <Icon.Check />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Global Error Banner */}
        {errors.form && (
          <div className="pf-banner error">
            <span>{errors.form}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="pf-form" noValidate>
          
          {/* Section 1: Personal Details */}
          <div className="glass-card pf-section">
            <div className="pf-section-header">
              <div className="pf-section-icon"><Icon.User /></div>
              <div>
                <h2 className="pf-section-title">Personal Details</h2>
                <p className="pf-section-desc">Primary contact and identification information</p>
              </div>
            </div>

            <div className="pf-grid">
              {/* Full Name */}
              <div className="pf-field span-2">
                <label className="pf-label">
                  Full Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Amara Perera"
                  className={`pf-input ${errors.fullName ? 'has-error' : ''}`}
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="pf-error-text">{errors.fullName}</span>}
              </div>

              {/* Date of Birth */}
              <div className="pf-field">
                <label className="pf-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="pf-input"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              {/* Gender */}
              <div className="pf-field">
                <label className="pf-label">Gender</label>
                <select
                  name="gender"
                  className="pf-select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Contact Number */}
              <div className="pf-field">
                <label className="pf-label">
                  Contact Number <span className="req">*</span>
                </label>
                <div className="pf-input-wrap">
                  <Icon.Phone className="pf-field-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+94 71 234 5678"
                    className={`pf-input with-icon ${errors.phone ? 'has-error' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && <span className="pf-error-text">{errors.phone}</span>}
              </div>

              {/* Email Address */}
              <div className="pf-field">
                <label className="pf-label">
                  Email Address <span className="req">*</span>
                </label>
                <div className="pf-input-wrap">
                  <Icon.Mail className="pf-field-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="patient@example.com"
                    className={`pf-input with-icon ${errors.email ? 'has-error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <span className="pf-error-text">{errors.email}</span>}
              </div>

              {/* Home Address */}
              <div className="pf-field span-2">
                <label className="pf-label">
                  Home Address <span className="req">*</span>
                </label>
                <textarea
                  name="address"
                  rows="3"
                  placeholder="Enter complete residential address"
                  className={`pf-textarea ${errors.address ? 'has-error' : ''}`}
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="pf-error-text">{errors.address}</span>}
              </div>
            </div>
          </div>

          {/* Section 2: Medical Information */}
          <div className="glass-card pf-section">
            <div className="pf-section-header">
              <div className="pf-section-icon"><Icon.HeartPulse /></div>
              <div>
                <h2 className="pf-section-title">Medical Information</h2>
                <p className="pf-section-desc">Health background and emergency contact information</p>
              </div>
            </div>

            <div className="pf-grid">
              {/* Medical History */}
              <div className="pf-field span-2">
                <label className="pf-label">Medical History</label>
                <textarea
                  name="medicalHistory"
                  rows="3"
                  placeholder="Previous surgeries, chronic conditions, dental treatments..."
                  className="pf-textarea"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                />
              </div>

              {/* Allergies */}
              <div className="pf-field">
                <label className="pf-label">Allergies</label>
                <textarea
                  name="allergies"
                  rows="3"
                  placeholder="Penicillin, Latex, Local Anesthetics..."
                  className="pf-textarea"
                  value={formData.allergies}
                  onChange={handleChange}
                />
              </div>

              {/* Current Medications */}
              <div className="pf-field">
                <label className="pf-label">Current Medications</label>
                <textarea
                  name="currentMedications"
                  rows="3"
                  placeholder="Antibiotics, Antihypertensives, Painkillers..."
                  className="pf-textarea"
                  value={formData.currentMedications}
                  onChange={handleChange}
                />
              </div>

              {/* Emergency Contact Name */}
              <div className="pf-field">
                <label className="pf-label">Emergency Contact Name</label>
                <input
                  type="text"
                  name="emergencyName"
                  placeholder="e.g. Nimal Perera (Spouse)"
                  className="pf-input"
                  value={formData.emergencyName}
                  onChange={handleChange}
                />
              </div>

              {/* Emergency Contact Number */}
              <div className="pf-field">
                <label className="pf-label">Emergency Contact Number</label>
                <div className="pf-input-wrap">
                  <Icon.Phone className="pf-field-icon" />
                  <input
                    type="tel"
                    name="emergencyPhone"
                    placeholder="+94 77 987 6543"
                    className="pf-input with-icon"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Patient Portal Access */}
          <div className="glass-card pf-section">
            <div className="pf-section-header justify-between">
              <div className="flex-header">
                <div className="pf-section-icon"><Icon.Shield /></div>
                <div>
                  <h2 className="pf-section-title">Patient Portal Access</h2>
                  <p className="pf-section-desc">Allow patient to view bills and appointments online</p>
                </div>
              </div>
              <label className="pf-toggle-wrap">
                <input
                  type="checkbox"
                  name="enablePortal"
                  checked={formData.enablePortal}
                  onChange={handleChange}
                />
                <span className="pf-toggle-slider" />
                <span className="pf-toggle-label">
                  {formData.enablePortal ? 'Portal Enabled' : 'Portal Disabled'}
                </span>
              </label>
            </div>

            {formData.enablePortal && (
              <div className="pf-grid pf-portal-box">
                {/* Portal Password */}
                <div className="pf-field">
                  <label className="pf-label">
                    Portal Password <span className="req">*</span>
                  </label>
                  <div className="pf-input-wrap">
                    <Icon.Lock className="pf-field-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Minimum 6 characters"
                      className={`pf-input with-icon with-action ${errors.password ? 'has-error' : ''}`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="pf-pass-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <Icon.EyeOff /> : <Icon.Eye />}
                    </button>
                  </div>
                  {errors.password && <span className="pf-error-text">{errors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div className="pf-field">
                  <label className="pf-label">
                    Confirm Password <span className="req">*</span>
                  </label>
                  <div className="pf-input-wrap">
                    <Icon.Lock className="pf-field-icon" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Re-enter portal password"
                      className={`pf-input with-icon with-action ${errors.confirmPassword ? 'has-error' : ''}`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="pf-pass-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <Icon.EyeOff /> : <Icon.Eye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="pf-error-text">{errors.confirmPassword}</span>}
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Additional Information */}
          <div className="glass-card pf-section">
            <div className="pf-section-header">
              <div className="pf-section-icon"><Icon.FileText /></div>
              <div>
                <h2 className="pf-section-title">Additional Details</h2>
                <p className="pf-section-desc">Referral source and internal clinic notes</p>
              </div>
            </div>

            <div className="pf-grid">
              {/* Referral Source */}
              <div className="pf-field">
                <label className="pf-label">Referral Source</label>
                <select
                  name="referralSource"
                  className="pf-select"
                  value={formData.referralSource}
                  onChange={handleChange}
                >
                  <option value="Walk-in">Walk-in</option>
                  <option value="Friend/Family">Friend / Family</option>
                  <option value="Doctor Referral">Doctor Referral</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Notes */}
              <div className="pf-field span-2">
                <label className="pf-label">Notes & Remarks</label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Special requests, preferred appointment times, family member links..."
                  className="pf-textarea"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pf-actions-bar">
            <button
              type="button"
              className="pf-btn ghost"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <div className="pf-actions-right">
              <button
                type="button"
                className="pf-btn secondary"
                onClick={handleClear}
                disabled={isSubmitting}
              >
                <Icon.RotateCcw /> Clear Form
              </button>
              <button
                type="submit"
                className="pf-btn primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="pf-spinner" />
                ) : (
                  <>
                    <Icon.Check /> Save Patient
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
