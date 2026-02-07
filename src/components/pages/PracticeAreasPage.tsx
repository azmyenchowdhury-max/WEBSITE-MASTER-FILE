import React, { useState } from 'react';

interface PracticeAreasPageProps {
  setCurrentPage: (page: string) => void;
}

const PracticeAreasPage: React.FC<PracticeAreasPageProps> = ({ setCurrentPage }) => {
  const [selectedArea, setSelectedArea] = useState<number | null>(null);

  const practiceAreas = [
    {
      icon: 'fa-briefcase',
      title: 'Corporate & Commercial',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
      shortDesc: 'Comprehensive legal solutions for businesses of all sizes.',
      fullDesc: 'Our corporate and commercial practice provides comprehensive legal solutions for businesses at every stage of their lifecycle. From company formation and governance to mergers and acquisitions, we guide our clients through complex business transactions.',
      services: [
        'Company Formation & Registration',
        'Mergers & Acquisitions',
        'Corporate Governance',
        'Joint Ventures & Partnerships',
        'Commercial Contracts',
        'Due Diligence'
      ]
    },
    {
      icon: 'fa-university',
      title: 'Banking & Finance',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600',
      shortDesc: 'Expert counsel for financial institutions and transactions.',
      fullDesc: 'We advise banks, financial institutions, and corporations on all aspects of banking and finance law. Our team has extensive experience in loan documentation, project finance, and regulatory compliance.',
      services: [
        'Loan Documentation',
        'Project Finance',
        'Regulatory Compliance',
        'Banking Disputes',
        'Securities & Capital Markets',
        'Islamic Finance'
      ]
    },
    {
      icon: 'fa-home',
      title: 'Real Estate & Property',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
      shortDesc: 'Complete property law services from acquisition to dispute resolution.',
      fullDesc: 'Our real estate practice handles all aspects of property law, from land acquisition and development to property disputes. We represent developers, investors, and individuals in complex real estate transactions.',
      services: [
        'Land Acquisition',
        'Property Development',
        'Title Verification',
        'Property Disputes',
        'Lease Agreements',
        'Construction Contracts'
      ]
    },
    {
      icon: 'fa-heart',
      title: 'Family Law',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600',
      shortDesc: 'Compassionate representation in family matters.',
      fullDesc: 'We provide sensitive and effective representation in all family law matters. Our attorneys understand the emotional challenges involved and work to achieve the best outcomes while minimizing conflict.',
      services: [
        'Divorce & Separation',
        'Child Custody',
        'Inheritance & Succession',
        'Marriage Registration',
        'Domestic Violence',
        'Adoption'
      ]
    },
    {
      icon: 'fa-shield-alt',
      title: 'Criminal Defense',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600',
      shortDesc: 'Vigorous defense of your rights in criminal matters.',
      fullDesc: 'Our criminal defense team provides aggressive representation for individuals facing criminal charges. We have a proven track record of successful defenses in cases ranging from white-collar crimes to serious offenses.',
      services: [
        'White-Collar Crimes',
        'Bail Applications',
        'Trial Representation',
        'Appeals',
        'Cyber Crimes',
        'Financial Crimes'
      ]
    },
    {
      icon: 'fa-lightbulb',
      title: 'Intellectual Property',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600',
      shortDesc: 'Protecting your innovations and creative works.',
      fullDesc: 'We help clients protect and monetize their intellectual property assets. Our IP practice covers trademarks, copyrights, patents, and trade secrets, providing comprehensive protection strategies.',
      services: [
        'Trademark Registration',
        'Copyright Protection',
        'Patent Applications',
        'IP Litigation',
        'Licensing Agreements',
        'Trade Secrets'
      ]
    },
    {
      icon: 'fa-calculator',
      title: 'Tax & Revenue',
      image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600',
      shortDesc: 'Strategic tax planning and dispute resolution.',
      fullDesc: 'Our tax practice provides strategic advice on tax planning, compliance, and dispute resolution. We represent clients before tax authorities and help minimize tax liabilities while ensuring compliance.',
      services: [
        'Tax Planning',
        'Tax Compliance',
        'Tax Disputes',
        'VAT Advisory',
        'Transfer Pricing',
        'Tax Litigation'
      ]
    },
    {
      icon: 'fa-globe',
      title: 'Immigration Law',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600',
      shortDesc: 'Navigating immigration processes with expertise.',
      fullDesc: 'We assist individuals and businesses with all immigration matters, from visa applications to work permits and citizenship. Our team has extensive experience with Bangladesh immigration law and international mobility.',
      services: [
        'Visa Applications',
        'Work Permits',
        'Citizenship Matters',
        'Business Immigration',
        'Family Immigration',
        'Immigration Appeals'
      ]
    },
    {
      icon: 'fa-users',
      title: 'Labor & Employment',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600',
      shortDesc: 'Protecting employer and employee rights.',
      fullDesc: 'Our labor and employment practice advises both employers and employees on workplace matters. We handle employment contracts, disputes, and compliance with labor laws.',
      services: [
        'Employment Contracts',
        'Workplace Disputes',
        'Labor Compliance',
        'Termination Matters',
        'Employee Benefits',
        'Workplace Safety'
      ]
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div
        className="hero-wrap hero-wrap-2"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920')",
          minHeight: '50vh'
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
            <div className="col-md-8 text-center" data-aos="fade-up">
              <span className="subheading" style={{ color: '#AFA939' }}>Our Expertise</span>
              <h1 style={{ fontSize: '48px', marginTop: '15px' }}>Practice <span className="text-accent">Areas</span></h1>
              <p className="breadcrumbs mt-3">
                <span>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} style={{ color: '#AFA939' }}>Home</a>
                  <i className="fas fa-chevron-right mx-3" style={{ fontSize: '12px', color: '#9CA3AF' }}></i>
                </span>
                <span style={{ color: '#ECECEC' }}>Practice Areas</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Areas Grid with Flip Cards */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5" data-aos="fade-up">
            <div className="col-md-8 text-center">
              <div className="heading-section">
                <span className="subheading">Comprehensive Legal Services</span>
                <h2>Areas of <span className="text-accent">Practice</span></h2>
                <p>
                  We offer comprehensive legal services across all major practice areas,
                  providing expert counsel tailored to your specific needs.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {practiceAreas.map((area, index) => (
              <div key={index} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={index * 50}>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front" style={{ backgroundImage: `url(${area.image})` }}>
                      <div className="content">
                        <div className="icon-box">
                          <i className={`fas ${area.icon}`}></i>
                        </div>
                        <h3>{area.title}</h3>
                      </div>
                    </div>
                    <div className="flip-card-back">
                      <h3>{area.title}</h3>
                      <p>{area.shortDesc}</p>
                      <button
                        className="btn-flip"
                        onClick={() => setSelectedArea(index)}
                      >
                        Learn More
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Practice */}
      <section className="ftco-section bg-dark-custom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
              <div className="heading-section">
                <span className="subheading">Why Choose Us</span>
                <h2>Expert Legal <span className="text-accent">Representation</span></h2>
              </div>
              <p>
                Our attorneys bring over 18 years of experience across all practice areas.
                We take a client-centered approach, ensuring personalized attention and
                strategic solutions for every case.
              </p>
              <div className="row mt-4">
                {[
                  { icon: 'fa-user-tie', title: '50+ Expert Attorneys' },
                  { icon: 'fa-trophy', title: '98% Success Rate' },
                  { icon: 'fa-clock', title: '24/7 Availability' },
                  { icon: 'fa-handshake', title: 'Client-Focused Approach' }
                ].map((item, idx) => (
                  <div key={idx} className="col-6 mb-4">
                    <div className="d-flex align-items-center">
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'rgba(175, 169, 57, 0.1)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px'
                      }}>
                        <i className={`fas ${item.icon}`} style={{ color: '#AFA939', fontSize: '20px' }}></i>
                      </div>
                      <span style={{ fontWeight: '500' }}>{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#"
                className="btn btn-primary mt-3"
                onClick={(e) => { e.preventDefault(); setCurrentPage('consultation'); }}
              >
                Schedule Consultation
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800"
                alt="Legal Team"
                className="img-fluid"
                style={{ borderRadius: '12px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Practice Area Modal */}
      {selectedArea !== null && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={() => setSelectedArea(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{ background: '#161819', border: '1px solid rgba(175, 169, 57, 0.2)', borderRadius: '16px' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title text-white d-flex align-items-center">
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #AFA939 0%, #B48811 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px'
                  }}>
                    <i className={`fas ${practiceAreas[selectedArea].icon}`} style={{ color: '#0F1113', fontSize: '20px' }}></i>
                  </div>
                  {practiceAreas[selectedArea].title}
                </h5>
                <button
                  type="button"
                  className="close text-white"
                  onClick={() => setSelectedArea(null)}
                  style={{ fontSize: '30px', opacity: 1, textShadow: 'none' }}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body p-4">
                <img
                  src={practiceAreas[selectedArea].image}
                  alt={practiceAreas[selectedArea].title}
                  className="img-fluid mb-4"
                  style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px' }}
                />
                <p style={{ fontSize: '16px', lineHeight: '1.8' }}>{practiceAreas[selectedArea].fullDesc}</p>
                <h5 style={{ color: '#AFA939', marginTop: '25px', marginBottom: '20px' }}>Our Services Include:</h5>
                <div className="row">
                  {practiceAreas[selectedArea].services.map((service, idx) => (
                    <div key={idx} className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-check-circle mr-3" style={{ color: '#AFA939' }}></i>
                        <span>{service}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 d-flex flex-wrap" style={{ gap: '10px' }}>
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedArea(null);
                      setCurrentPage('consultation');
                    }}
                  >
                    Schedule Consultation
                    <i className="fas fa-calendar-alt ml-2"></i>
                  </a>
                  <a
                    href="#"
                    className="btn btn-outline-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedArea(null);
                      setCurrentPage('contact');
                    }}
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="ftco-section" style={{
        background: 'linear-gradient(135deg, rgba(175, 169, 57, 0.1) 0%, rgba(180, 136, 17, 0.1) 100%)',
        borderTop: '1px solid rgba(175, 169, 57, 0.2)',
        borderBottom: '1px solid rgba(175, 169, 57, 0.2)'
      }}>
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-8 text-center">
              <h2 className="mb-4">Need Expert Legal <span className="text-accent">Advice?</span></h2>
              <p className="mb-4" style={{ fontSize: '18px' }}>
                Our experienced attorneys are ready to assist you with any legal matter.
                Schedule a free consultation to discuss your needs.
              </p>
              <a
                href="#"
                className="btn btn-primary"
                onClick={(e) => { e.preventDefault(); setCurrentPage('consultation'); }}
              >
                Get Free Consultation
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PracticeAreasPage;
