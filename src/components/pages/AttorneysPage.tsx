import React, { useState } from 'react';

interface AttorneysPageProps {
  setCurrentPage: (page: string) => void;
}

const AttorneysPage: React.FC<AttorneysPageProps> = ({ setCurrentPage }) => {
  const [selectedAttorney, setSelectedAttorney] = useState<number | null>(null);

  const attorneys = [
    {
      name: 'Advocate Kamal Hossain',
      position: 'Senior Partner & Founder',
      image: 'https://images.unsplash.com/photo-1556157382-97edd2d9e772?w=400',
      specialization: 'Corporate Law, Constitutional Law',
      experience: '35+ Years',
      education: 'LLB, University of Dhaka; LLM, Harvard Law School',
      bio: 'Senior Advocate Kamal Hossain founded the firm in 1985 and has been instrumental in shaping corporate law in Bangladesh. His expertise in constitutional matters has made him a sought-after counsel for landmark cases.',
      email: 'kamal@kamalassociates.com.bd',
      phone: '+880 2-9821234'
    },
    {
      name: 'Advocate Fatima Rahman',
      position: 'Managing Partner',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      specialization: 'Banking & Finance, Corporate Law',
      experience: '25+ Years',
      education: 'LLB, University of Dhaka; MBA, IBA',
      bio: 'Advocate Fatima Rahman leads our banking and finance practice, advising major financial institutions and corporations on complex transactions and regulatory compliance.',
      email: 'fatima@kamalassociates.com.bd',
      phone: '+880 2-9821235'
    },
    {
      name: 'Advocate Rashid Ahmed',
      position: 'Partner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      specialization: 'Criminal Defense, Litigation',
      experience: '20+ Years',
      education: 'LLB, University of Dhaka; LLM, University of London',
      bio: 'Advocate Rashid Ahmed is a renowned criminal defense attorney with an impressive track record of successful defenses in high-profile cases across Bangladesh.',
      email: 'rashid@kamalassociates.com.bd',
      phone: '+880 2-9821236'
    },
    {
      name: 'Advocate Nusrat Jahan',
      position: 'Associate Partner',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      specialization: 'Family Law, Civil Litigation',
      experience: '15+ Years',
      education: 'LLB, North South University; LLM, BRAC University',
      bio: 'Advocate Nusrat Jahan specializes in family law matters, providing compassionate yet effective representation in divorce, custody, and inheritance cases.',
      email: 'nusrat@kamalassociates.com.bd',
      phone: '+880 2-9821237'
    },
    {
      name: 'Advocate Mohammad Ali',
      position: 'Senior Associate',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      specialization: 'Real Estate, Property Law',
      experience: '12+ Years',
      education: 'LLB, University of Chittagong; LLM, University of Dhaka',
      bio: 'Advocate Mohammad Ali heads our real estate practice, handling complex property transactions, land disputes, and development projects.',
      email: 'ali@kamalassociates.com.bd',
      phone: '+880 2-9821238'
    },
    {
      name: 'Advocate Sabrina Chowdhury',
      position: 'Senior Associate',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
      specialization: 'Intellectual Property, Technology Law',
      experience: '10+ Years',
      education: 'LLB, BRAC University; LLM, National University of Singapore',
      bio: 'Advocate Sabrina Chowdhury leads our IP practice, advising tech companies and creative industries on trademark, copyright, and patent matters.',
      email: 'sabrina@kamalassociates.com.bd',
      phone: '+880 2-9821239'
    },
    {
      name: 'Advocate Tanvir Hassan',
      position: 'Associate',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      specialization: 'Tax Law, Corporate Advisory',
      experience: '8+ Years',
      education: 'LLB, University of Dhaka; CA, ICAB',
      bio: 'Advocate Tanvir Hassan combines legal expertise with accounting knowledge to provide comprehensive tax planning and dispute resolution services.',
      email: 'tanvir@kamalassociates.com.bd',
      phone: '+880 2-9821240'
    },
    {
      name: 'Advocate Ayesha Siddiqua',
      position: 'Associate',
      image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400',
      specialization: 'Immigration Law, International Trade',
      experience: '6+ Years',
      education: 'LLB, North South University; LLM, University of Melbourne',
      bio: 'Advocate Ayesha Siddiqua assists clients with immigration matters, work permits, and international trade compliance, leveraging her international education.',
      email: 'ayesha@kamalassociates.com.bd',
      phone: '+880 2-9821241'
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div 
        className="hero-wrap hero-wrap-2" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920')",
          minHeight: '50vh'
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
            <div className="col-md-8 text-center" data-aos="fade-up">
              <span className="subheading" style={{ color: '#AFA939' }}>Our Legal Team</span>
              <h1 style={{ fontSize: '48px', marginTop: '15px' }}>Meet Our <span className="text-accent">Attorneys</span></h1>
              <p className="breadcrumbs mt-3">
                <span>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} style={{ color: '#AFA939' }}>Home</a>
                  <i className="fas fa-chevron-right mx-3" style={{ fontSize: '12px', color: '#9CA3AF' }}></i>
                </span>
                <span style={{ color: '#ECECEC' }}>Attorneys</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attorneys Grid */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5" data-aos="fade-up">
            <div className="col-md-8 text-center">
              <div className="heading-section">
                <span className="subheading">Expert Legal Counsel</span>
                <h2>Our Experienced <span className="text-accent">Attorneys</span></h2>
                <p>
                  Our team of dedicated attorneys brings decades of combined experience across 
                  all major practice areas. Each member is committed to delivering exceptional 
                  legal representation.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {attorneys.map((attorney, index) => (
              <div key={index} className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay={index * 50}>
                <div className="attorney">
                  <div 
                    className="img" 
                    style={{ backgroundImage: `url(${attorney.image})`, cursor: 'pointer' }}
                    onClick={() => setSelectedAttorney(index)}
                  >
                    <div className="social">
                      <a href={`mailto:${attorney.email}`}><i className="fas fa-envelope"></i></a>
                      <a href={`tel:${attorney.phone}`}><i className="fas fa-phone"></i></a>
                      <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                  </div>
                  <div className="text">
                    <h3 
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedAttorney(index)}
                    >
                      {attorney.name}
                    </h3>
                    <span className="position">{attorney.position}</span>
                    <p className="mt-2 mb-0" style={{ fontSize: '13px', color: '#9CA3AF' }}>
                      {attorney.specialization}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attorney Modal */}
      {selectedAttorney !== null && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={() => setSelectedAttorney(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{ background: '#161819', border: '1px solid rgba(175, 169, 57, 0.2)', borderRadius: '16px' }}>
              <div className="modal-header border-0">
                <button 
                  type="button" 
                  className="close text-white" 
                  onClick={() => setSelectedAttorney(null)}
                  style={{ fontSize: '30px', opacity: 1, textShadow: 'none' }}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body p-4">
                <div className="row">
                  <div className="col-md-4 mb-4 mb-md-0">
                    <img 
                      src={attorneys[selectedAttorney].image} 
                      alt={attorneys[selectedAttorney].name}
                      className="img-fluid"
                      style={{ borderRadius: '12px' }}
                    />
                    <div className="d-flex justify-content-center mt-4" style={{ gap: '10px' }}>
                      <a 
                        href={`mailto:${attorneys[selectedAttorney].email}`} 
                        className="btn btn-outline-primary"
                        style={{ padding: '10px 15px' }}
                      >
                        <i className="fas fa-envelope"></i>
                      </a>
                      <a 
                        href={`tel:${attorneys[selectedAttorney].phone}`} 
                        className="btn btn-outline-primary"
                        style={{ padding: '10px 15px' }}
                      >
                        <i className="fas fa-phone"></i>
                      </a>
                      <a 
                        href="#" 
                        className="btn btn-outline-primary"
                        style={{ padding: '10px 15px' }}
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h3 className="text-white mb-1">{attorneys[selectedAttorney].name}</h3>
                    <p style={{ color: '#AFA939', marginBottom: '20px' }}>{attorneys[selectedAttorney].position}</p>
                    <p style={{ lineHeight: '1.8' }}>{attorneys[selectedAttorney].bio}</p>
                    <hr style={{ borderColor: 'rgba(175, 169, 57, 0.15)', margin: '25px 0' }} />
                    <div className="row">
                      <div className="col-6 mb-3">
                        <p className="mb-1" style={{ color: '#AFA939', fontWeight: '600', fontSize: '14px' }}>Specialization</p>
                        <p style={{ margin: 0 }}>{attorneys[selectedAttorney].specialization}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <p className="mb-1" style={{ color: '#AFA939', fontWeight: '600', fontSize: '14px' }}>Experience</p>
                        <p style={{ margin: 0 }}>{attorneys[selectedAttorney].experience}</p>
                      </div>
                    </div>
                    <p className="mb-1" style={{ color: '#AFA939', fontWeight: '600', fontSize: '14px' }}>Education</p>
                    <p>{attorneys[selectedAttorney].education}</p>
                    <a 
                      href="#" 
                      className="btn btn-primary mt-3"
                      onClick={(e) => { 
                        e.preventDefault(); 
                        setSelectedAttorney(null);
                        setCurrentPage('consultation'); 
                      }}
                    >
                      Schedule Consultation
                      <i className="fas fa-calendar-alt ml-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Our Team Section */}
      <section className="ftco-section bg-dark-custom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800" 
                alt="Join Our Team" 
                className="img-fluid"
                style={{ borderRadius: '12px' }}
              />
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="heading-section">
                <span className="subheading">Careers</span>
                <h2>Join Our <span className="text-accent">Team</span></h2>
              </div>
              <p>
                We're always looking for talented legal professionals who share our commitment 
                to excellence and client service. Join a firm that values professional growth, 
                work-life balance, and making a difference.
              </p>
              <div className="mt-4">
                {[
                  'Competitive compensation packages',
                  'Professional development opportunities',
                  'Collaborative work environment',
                  'Mentorship programs'
                ].map((item, idx) => (
                  <div key={idx} className="d-flex align-items-center mb-3">
                    <i className="fas fa-check-circle mr-3" style={{ color: '#AFA939', fontSize: '18px' }}></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a 
                href="#" 
                className="btn btn-primary mt-4"
                onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}
              >
                View Open Positions
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ftco-section" style={{ 
        background: 'linear-gradient(135deg, rgba(175, 169, 57, 0.1) 0%, rgba(180, 136, 17, 0.1) 100%)',
        borderTop: '1px solid rgba(175, 169, 57, 0.2)',
        borderBottom: '1px solid rgba(175, 169, 57, 0.2)'
      }}>
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-8 text-center">
              <h2 className="mb-4">Need Legal <span className="text-accent">Assistance?</span></h2>
              <p className="mb-4" style={{ fontSize: '18px' }}>
                Our team of experienced attorneys is ready to help you with your legal matters. 
                Schedule a free consultation today.
              </p>
              <a 
                href="#" 
                className="btn btn-primary"
                onClick={(e) => { e.preventDefault(); setCurrentPage('consultation'); }}
              >
                Schedule Free Consultation
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AttorneysPage;
