
import React, { useState, useEffect } from 'react';

export type FormTypeKey = 'HighSchool' | 'University' | 'Thesis' | 'General';

interface ContactBookingSectionProps {
  initialService?: FormTypeKey | null;
  onServiceConsumed: () => void;
}

interface FormData {
  name: string;
  email: string;
  // High School specific
  gradeLevel?: string;
  // University specific
  courseName?: string;
  // Thesis specific
  degreeLevel?: string; 
  researchArea?: string;
  // General specific
  subject?: string;
  // Common / Adapted
  details?: string; // For topics, message, etc.
  contactTimes?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  gradeLevel?: string;
  courseName?: string;
  degreeLevel?: string;
  researchArea?: string;
  subject?: string;
  details?: string;
}

const formTypeOptions: { key: FormTypeKey; label: string; description: string; }[] = [
  { key: 'HighSchool', label: 'High School Tutoring Inquiry', description: 'For students in grades 9-12 or equivalent.' },
  { key: 'University', label: 'University Tutoring Inquiry', description: 'For undergraduate or postgraduate coursework assistance.' },
  { key: 'Thesis', label: 'Thesis Support Inquiry', description: 'For guidance on mathematical theses or research projects.' },
  { key: 'General', label: 'General Inquiry', description: 'For any other questions or information.' },
];

const initialFormData: FormData = {
  name: '',
  email: '',
  gradeLevel: '',
  courseName: '',
  degreeLevel: '',
  researchArea: '',
  subject: '',
  details: '',
  contactTimes: '',
};

export const ContactBookingSection: React.FC<ContactBookingSectionProps> = ({ initialService, onServiceConsumed }) => {
  const [activeFormType, setActiveFormType] = useState<FormTypeKey | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedDataCache, setSubmittedDataCache] = useState<{name: string, email: string} | null>(null);

  useEffect(() => {
    if (initialService && ['HighSchool', 'University', 'Thesis'].includes(initialService)) {
      setActiveFormType(initialService as FormTypeKey);
      setIsSubmitted(false); // Ensure form is shown if navigating with an initial service
      setFormData(initialFormData); // Reset form data when type changes
      setErrors({});
      onServiceConsumed();
    } else if (initialService === null && !activeFormType) { 
        // If initialService is null (e.g. direct nav) and no form is active, stay in selection mode.
        // This condition might be redundant if activeFormType is managed well.
    }
  }, [initialService, onServiceConsumed]);


  const handleFormTypeSelect = (type: FormTypeKey) => {
    setActiveFormType(type);
    setIsSubmitted(false);
    setFormData(initialFormData);
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }

    switch (activeFormType) {
      case 'HighSchool':
        if (!formData.gradeLevel?.trim()) newErrors.gradeLevel = 'Grade Level is required.';
        break;
      case 'University':
        if (!formData.courseName?.trim()) newErrors.courseName = 'Course Name/Code is required.';
        break;
      case 'Thesis':
        if (!formData.degreeLevel?.trim()) newErrors.degreeLevel = 'Degree Level is required.';
        if (!formData.researchArea?.trim()) newErrors.researchArea = 'Research Area is required.';
        break;
      case 'General':
        if (!formData.subject?.trim()) newErrors.subject = 'Subject is required.';
        if (!formData.details?.trim()) newErrors.details = 'Message is required.';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, type: activeFormType })
        });
        if (!response.ok) {
          throw new Error('Failed to submit');
        }
        setSubmittedDataCache({ name: formData.name, email: formData.email });
        setIsSubmitted(true);
      } catch (err) {
        setErrors(prev => ({...prev, email: 'Submission failed. Please try again.'}));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetToSelection = () => {
    setIsSubmitted(false);
    setActiveFormType(null);
    setFormData(initialFormData);
    setErrors({});
  }

  const renderFormFields = () => {
    if (!activeFormType) return null;

    const currentFormInfo = formTypeOptions.find(f => f.key === activeFormType);

    return (
      <>
        <h3 style={{textAlign: 'center', color: 'var(--retain-green-accent)', marginBottom: '25px'}}>
            {currentFormInfo?.label || "Inquiry Form"}
        </h3>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <p id="name-error" className="form-error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <p id="email-error" className="form-error-message">{errors.email}</p>}
        </div>

        {activeFormType === 'HighSchool' && (
          <div className="form-group">
            <label htmlFor="gradeLevel">Grade Level</label>
            <input type="text" id="gradeLevel" name="gradeLevel" value={formData.gradeLevel} onChange={handleChange} placeholder="e.g., Grade 10, AP Calculus" aria-required="true" aria-invalid={!!errors.gradeLevel} aria-describedby={errors.gradeLevel ? "gradeLevel-error" : undefined} />
            {errors.gradeLevel && <p id="gradeLevel-error" className="form-error-message">{errors.gradeLevel}</p>}
          </div>
        )}

        {activeFormType === 'University' && (
          <div className="form-group">
            <label htmlFor="courseName">Course Name/Code</label>
            <input type="text" id="courseName" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="e.g., MATH 201, Linear Algebra" aria-required="true" aria-invalid={!!errors.courseName} aria-describedby={errors.courseName ? "courseName-error" : undefined} />
            {errors.courseName && <p id="courseName-error" className="form-error-message">{errors.courseName}</p>}
          </div>
        )}

        {activeFormType === 'Thesis' && (
          <>
            <div className="form-group">
              <label htmlFor="degreeLevel">Degree Level</label>
              <input type="text" id="degreeLevel" name="degreeLevel" value={formData.degreeLevel} onChange={handleChange} placeholder="e.g., Master's, PhD" aria-required="true" aria-invalid={!!errors.degreeLevel} aria-describedby={errors.degreeLevel ? "degreeLevel-error" : undefined}/>
              {errors.degreeLevel && <p id="degreeLevel-error" className="form-error-message">{errors.degreeLevel}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="researchArea">Research Area</label>
              <input type="text" id="researchArea" name="researchArea" value={formData.researchArea} onChange={handleChange} placeholder="e.g., Number Theory, Applied Statistics" aria-required="true" aria-invalid={!!errors.researchArea} aria-describedby={errors.researchArea ? "researchArea-error" : undefined} />
              {errors.researchArea && <p id="researchArea-error" className="form-error-message">{errors.researchArea}</p>}
            </div>
          </>
        )}
        
        {activeFormType === 'General' && (
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g., Question about services, Partnership" aria-required="true" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined}/>
              {errors.subject && <p id="subject-error" className="form-error-message">{errors.subject}</p>}
            </div>
        )}

        <div className="form-group">
          <label htmlFor="details">
            {activeFormType === 'HighSchool' || activeFormType === 'University' ? 'Specific Math Topics (Optional)' : 
             activeFormType === 'Thesis' ? 'Specific Questions/Needs (Optional)' :
             activeFormType === 'General' ? 'Your Message' : 'Details'}
          </label>
          <textarea id="details" name="details" value={formData.details} onChange={handleChange} rows={4} 
            placeholder={
                activeFormType === 'HighSchool' ? "e.g., Factoring polynomials, Trigonometric identities" :
                activeFormType === 'University' ? "e.g., Limits, Vector calculus problems" :
                activeFormType === 'Thesis' ? "e.g., Help with literature review, LaTeX formatting" :
                "Please provide details here..."
            }
            aria-required={activeFormType === 'General'}
            aria-invalid={!!errors.details}
            aria-describedby={errors.details ? "details-error" : undefined}
           />
           {errors.details && <p id="details-error" className="form-error-message">{errors.details}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="contactTimes">Preferred Contact Times (Optional)</label>
          <input type="text" id="contactTimes" name="contactTimes" value={formData.contactTimes} onChange={handleChange} placeholder="e.g., Weekday evenings, Weekend mornings" />
        </div>
        
        <div style={{display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap'}}>
            <button type="submit" className="cta-button" disabled={isLoading} style={{flexGrow: 1}}>
                {isLoading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
            <button type="button" className="cta-button other-payment-button" onClick={resetToSelection} style={{flexGrow: 1, minWidth: '200px'}}>
                Change Inquiry Type
            </button>
        </div>
      </>
    );
  };

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact Us &amp; Book Your Session</h2>
      
      {isSubmitted && submittedDataCache ? (
        <div className="section-message success" role="status">
          <h3>Thank You, {submittedDataCache.name}!</h3>
          <p>
            Your inquiry has been successfully submitted. We've received your details
            and will contact you at <strong>{submittedDataCache.email}</strong> within 24-48 hours.
          </p>
          <button className="cta-button" onClick={resetToSelection} style={{marginTop: '20px', width: 'auto', minWidth: '200px', alignSelf: 'center'}}>
            Make Another Inquiry
          </button>
        </div>
      ) : !activeFormType ? (
        <>
          <p style={{textAlign: 'center', marginBottom: '30px'}}>Please select the type of inquiry you'd like to make:</p>
          <div className="service-options" style={{gap: '20px', marginBottom: '20px'}}>
            {formTypeOptions.map(opt => (
              <div key={opt.key} className="service-card" style={{textAlign:'center'}}>
                <h3>{opt.label}</h3>
                <p>{opt.description}</p>
                <button className="cta-button" style={{alignSelf:'center'}} onClick={() => handleFormTypeSelect(opt.key)}>
                  Select
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="form-layout" aria-live="polite">
          {renderFormFields()}
        </form>
      )}
    </section>
  );
};
