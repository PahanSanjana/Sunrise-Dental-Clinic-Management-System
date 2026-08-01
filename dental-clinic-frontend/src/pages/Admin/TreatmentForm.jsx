import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Css/TreatmentForm.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    Stethoscope: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM19.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM14 12a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0v-3z" /></svg>),
    DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    RotateCcw: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>),
    Tag: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>),
};

// ---------------------------------------------------------------
// Initial Form Data
// ---------------------------------------------------------------
const initialFormData = {
    name: '',
    description: '',
    baseCost: '',
    consultationFee: '',
    duration: '',
    category: 'Restorative',
    status: 'Active',
};

const CATEGORIES = [
    'Preventive',
    'Restorative',
    'Surgical',
    'Cosmetic',
    'Diagnostic',
    'Orthodontic',
    'Periodontic',
];

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const TreatmentForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Treatment name is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        if (!formData.baseCost) {
            newErrors.baseCost = 'Base cost is required';
        } else if (parseFloat(formData.baseCost) < 0) {
            newErrors.baseCost = 'Base cost cannot be negative';
        }

        if (!formData.consultationFee) {
            newErrors.consultationFee = 'Consultation fee is required';
        } else if (parseFloat(formData.consultationFee) < 0) {
            newErrors.consultationFee = 'Consultation fee cannot be negative';
        }

        if (formData.duration && parseInt(formData.duration) <= 0) {
            newErrors.duration = 'Duration must be greater than 0';
        }

        if (!formData.category) {
            newErrors.category = 'Please select a category';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200));

            const treatmentData = {
                ...formData,
                baseCost: parseFloat(formData.baseCost),
                consultationFee: parseFloat(formData.consultationFee),
                duration: formData.duration ? parseInt(formData.duration) : null,
            };

            console.log(isEditing ? 'Treatment updated:' : 'Treatment created:', treatmentData);

            setSuccessMessage(
                isEditing
                    ? 'Treatment updated successfully!'
                    : 'Treatment added successfully!'
            );

            setTimeout(() => {
                navigate('/admin/treatments');
            }, 1500);
        } catch (err) {
            setErrors({ form: 'Failed to save treatment. Please try again.' });
            setIsSubmitting(false);
        }
    };

    // Handle clear form
    const handleClear = () => {
        setFormData(initialFormData);
        setErrors({});
        setSuccessMessage('');
    };

    // Handle cancel
    const handleCancel = () => {
        navigate('/admin/treatments');
    };

    // Get category icon color
    const getCategoryColor = (category) => {
        const colors = {
            'Preventive': '#4A7A64',
            'Restorative': '#3A7A8A',
            'Surgical': '#C4954C',
            'Cosmetic': '#D4A345',
            'Diagnostic': '#7A8A8A',
            'Orthodontic': '#5A7A9A',
            'Periodontic': '#8A7A5A',
        };
        return colors[category] || '#2F3E3C';
    };

    return (
        <div className="tf-page">
            <div className="tf-blob tf-blob-1" />
            <div className="tf-blob tf-blob-2" />

            <div className="tf-inner">
                {/* Header */}
                <div className="tf-header">
                    <button className="tf-back-btn" onClick={handleCancel}>
                        <Icon.ArrowLeft /> Back to Treatments
                    </button>
                    <div className="tf-title-area">
                        <h1 className="tf-title">{isEditing ? 'Edit Treatment' : 'Add New Treatment'}</h1>
                        <p className="tf-subtitle">
                            {isEditing
                                ? 'Update treatment details and pricing'
                                : 'Create a new treatment type with pricing and category'}
                        </p>
                    </div>
                </div>

                {/* Success Banner */}
                {successMessage && (
                    <div className="tf-banner success">
                        <Icon.Check />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Global Error */}
                {errors.form && (
                    <div className="tf-banner error">
                        <span>{errors.form}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass-card tf-form">
                    {/* Treatment Details */}
                    <div className="tf-section">
                        <div className="tf-section-header">
                            <div className="tf-section-icon"><Icon.Stethoscope /></div>
                            <div>
                                <h3 className="tf-section-title">Treatment Details</h3>
                                <p className="tf-section-desc">Basic information about the treatment</p>
                            </div>
                        </div>

                        <div className="tf-grid">
                            {/* Name */}
                            <div className="tf-field span-2">
                                <label className="tf-label">
                                    Treatment Name <span className="req">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Root Canal Treatment"
                                    className={`tf-input ${errors.name ? 'has-error' : ''}`}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <span className="tf-error-text">{errors.name}</span>}
                            </div>

                            {/* Description */}
                            <div className="tf-field span-2">
                                <label className="tf-label">
                                    Description <span className="req">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    placeholder="Describe the treatment procedure and what it involves..."
                                    className={`tf-textarea ${errors.description ? 'has-error' : ''}`}
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                {errors.description && <span className="tf-error-text">{errors.description}</span>}
                                <span className="tf-character-count">
                                    {formData.description.length} characters
                                </span>
                            </div>

                            {/* Category */}
                            <div className="tf-field">
                                <label className="tf-label">
                                    Category <span className="req">*</span>
                                </label>
                                <div className="tf-category-select">
                                    <select
                                        name="category"
                                        className={`tf-select ${errors.category ? 'has-error' : ''}`}
                                        value={formData.category}
                                        onChange={handleChange}
                                        style={{ borderColor: getCategoryColor(formData.category) }}
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <div
                                        className="tf-category-indicator"
                                        style={{ background: getCategoryColor(formData.category) }}
                                    />
                                </div>
                                {errors.category && <span className="tf-error-text">{errors.category}</span>}
                            </div>

                            {/* Duration */}
                            <div className="tf-field">
                                <label className="tf-label">Duration (minutes)</label>
                                <div className="tf-input-wrap">
                                    <Icon.Clock className="tf-field-icon" />
                                    <input
                                        type="number"
                                        name="duration"
                                        placeholder="e.g. 60"
                                        className={`tf-input with-icon ${errors.duration ? 'has-error' : ''}`}
                                        value={formData.duration}
                                        onChange={handleChange}
                                        min="1"
                                        step="5"
                                    />
                                </div>
                                {errors.duration && <span className="tf-error-text">{errors.duration}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="tf-section">
                        <div className="tf-section-header">
                            <div className="tf-section-icon"><Icon.DollarSign /></div>
                            <div>
                                <h3 className="tf-section-title">Pricing</h3>
                                <p className="tf-section-desc">Set the cost structure for this treatment</p>
                            </div>
                        </div>

                        <div className="tf-grid">
                            {/* Base Cost */}
                            <div className="tf-field">
                                <label className="tf-label">
                                    Base Cost (Rs.) <span className="req">*</span>
                                </label>
                                <div className="tf-input-wrap">
                                    <Icon.DollarSign className="tf-field-icon" />
                                    <input
                                        type="number"
                                        name="baseCost"
                                        placeholder="0.00"
                                        className={`tf-input with-icon ${errors.baseCost ? 'has-error' : ''}`}
                                        value={formData.baseCost}
                                        onChange={handleChange}
                                        min="0"
                                        step="100"
                                    />
                                </div>
                                {errors.baseCost && <span className="tf-error-text">{errors.baseCost}</span>}
                                <span className="tf-hint">The main treatment cost before any fees</span>
                            </div>

                            {/* Consultation Fee */}
                            <div className="tf-field">
                                <label className="tf-label">
                                    Consultation Fee (Rs.) <span className="req">*</span>
                                </label>
                                <div className="tf-input-wrap">
                                    <Icon.Tag className="tf-field-icon" />
                                    <input
                                        type="number"
                                        name="consultationFee"
                                        placeholder="0.00"
                                        className={`tf-input with-icon ${errors.consultationFee ? 'has-error' : ''}`}
                                        value={formData.consultationFee}
                                        onChange={handleChange}
                                        min="0"
                                        step="100"
                                    />
                                </div>
                                {errors.consultationFee && <span className="tf-error-text">{errors.consultationFee}</span>}
                                <span className="tf-hint">The consultation fee charged for this treatment</span>
                            </div>

                            {/* Total Cost Preview */}
                            {(formData.baseCost || formData.consultationFee) && (
                                <div className="tf-field span-2">
                                    <div className="tf-total-preview">
                                        <span className="tf-preview-label">Total Treatment Cost</span>
                                        <span className="tf-preview-value">
                                            Rs. {(parseFloat(formData.baseCost || 0) + parseFloat(formData.consultationFee || 0)).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className="tf-section">
                        <div className="tf-section-header">
                            <div className="tf-section-icon"><Icon.FileText /></div>
                            <div>
                                <h3 className="tf-section-title">Status</h3>
                                <p className="tf-section-desc">Set the availability status of this treatment</p>
                            </div>
                        </div>

                        <div className="tf-grid">
                            <div className="tf-field">
                                <label className="tf-label">Status</label>
                                <select
                                    name="status"
                                    className="tf-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                <span className="tf-hint">
                                    {formData.status === 'Active'
                                        ? 'This treatment will be available for appointments'
                                        : 'This treatment will be hidden from appointment booking'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="tf-actions">
                        <button
                            type="button"
                            className="tf-btn secondary"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <div className="tf-actions-right">
                            <button
                                type="button"
                                className="tf-btn secondary"
                                onClick={handleClear}
                                disabled={isSubmitting}
                            >
                                <Icon.RotateCcw /> Clear Form
                            </button>
                            <button
                                type="submit"
                                className="tf-btn primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="tf-spinner" />
                                ) : (
                                    <>
                                        <Icon.Check /> {isEditing ? 'Update Treatment' : 'Save Treatment'}
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

export default TreatmentForm;