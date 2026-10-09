import React, { useState } from 'react';
import { Mail, Linkedin, Github, Copy, Check, Send, MapPin, Clock, Sparkles } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const emailAddress = 'kashafsayyed2008@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Simulate submission / mailto preparation
    setFormSubmitted(true);
    setTimeout(() => {
      // Optional: reset form or open mail client
    }, 1000);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header" data-reveal>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtitle">
            Whether you have an internship opportunity, a project to collaborate on, or want to talk
            about data science and AI — feel free to reach out!
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Contact Info */}
          <div className="contact-info-column">
            <div className="contact-card-box glass-card" data-reveal>
              <h3 className="contact-box-title">Get in Touch Directly</h3>
              <p className="contact-box-subtitle">
                I'm actively seeking{' '}
                <strong>data science internships, student research, and tech collaborations</strong>
                . I respond promptly to inquiries.
              </p>

              {/* Email direct copy */}
              <div className="contact-method-card">
                <div className="method-icon-box">
                  <Mail size={20} />
                </div>
                <div className="method-details">
                  <span className="method-label">Direct Email</span>
                  <a href={`mailto:${emailAddress}`} className="method-value">
                    {emailAddress}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="copy-btn"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} className="text-teal" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/kashaf-sayyed-712635379"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method-card link-hover"
              >
                <div className="method-icon-box linkedin-box">
                  <Linkedin size={20} />
                </div>
                <div className="method-details">
                  <span className="method-label">Professional Network</span>
                  <span className="method-value">linkedin.com/in/kashaf-sayyed</span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/sayyedkashaf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method-card link-hover"
              >
                <div className="method-icon-box github-box">
                  <Github size={20} />
                </div>
                <div className="method-details">
                  <span className="method-label">Source Code &amp; Repositories</span>
                  <span className="method-value">github.com/sayyedkashaf</span>
                </div>
              </a>

              {/* Location & Timezone */}
              <div className="contact-meta-footer">
                <div className="meta-pill">
                  <MapPin size={14} />
                  <span>Mumbai, India</span>
                </div>
                <div className="meta-pill">
                  <Clock size={14} />
                  <span>IST (UTC +5:30)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-column">
            <div className="contact-form-card glass-card" data-reveal style={{ '--rd': '140ms' }}>
              <h3 className="form-card-title">Send a Direct Message</h3>
              <p className="form-card-desc">Fill out this quick form to drop a note or inquiry.</p>

              {formSubmitted ? (
                <div className="form-success-alert">
                  <div className="success-icon-box">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="success-title">Message Received!</h4>
                  <p className="success-desc">
                    Thank you for reaching out, <strong>{formData.name || 'there'}</strong>. I will
                    get back to you shortly at <strong>{formData.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Your Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Alex Morgan"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Your Email <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="alex@example.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject / Topic <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Internship opportunity / Project collaboration"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hi Kashaf, I came across your portfolio and wanted to discuss..."
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <div className="form-submit-row">
                    <button type="submit" className="btn btn-primary submit-btn">
                      <Send size={16} />
                      <span>Send Message</span>
                    </button>
                    <span className="privacy-note">Your information is used only to reply.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
