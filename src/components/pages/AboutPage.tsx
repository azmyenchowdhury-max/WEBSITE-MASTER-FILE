import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const values = [
    { icon: 'fa-balance-scale', title: 'Integrity', desc: 'We uphold the highest ethical standards in all our dealings, ensuring transparency and honesty.' },
    { icon: 'fa-handshake', title: 'Client Focus', desc: 'Our clients are at the heart of everything we do. We listen, understand, and deliver.' },
    { icon: 'fa-award', title: 'Excellence', desc: 'We strive for excellence in every case, combining expertise with dedication.' },
    { icon: 'fa-users', title: 'Teamwork', desc: 'Our collaborative approach ensures comprehensive solutions for complex legal challenges.' },
  ];

  const milestones = [
    { year: '2008', title: 'Foundation', desc: 'Kamal & Associates was established with a vision to provide exceptional legal services.' },
    { year: '2012', title: 'Expansion', desc: 'Opened our second office and expanded into corporate and commercial law.' },
    { year: '2018', title: 'Recognition', desc: 'Received our first national award for excellence in legal practice.' },
    { year: '2015', title: 'Innovation', desc: 'Launched digital legal services and expanded our practice areas.' },
    { year: '2025', title: 'Leadership', desc: 'Recognized as one of the top law firms in Bangladesh.' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-wrap hero-wrap-2" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920')" }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-end">
            <div className="col-md-9 pb-5" data-aos="fade-up">
              <p className="breadcrumbs mt-3">
                <span>
                  <Link to="/" style={{ color: '#AFA939' }}>Home</Link>
                  <i className="fas fa-chevron-right mx-3" style={{ fontSize: '12px', color: '#9CA3AF' }}></i>
                </span>
                <span>About Us</span>
              </p>
              <h1 className="mb-3">About Our Firm</h1>
              <p style={{ maxWidth: '600px' }}>
                Learn about our history, values, and commitment to delivering exceptional legal services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="about-img" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800')",
                height: '500px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '16px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '30px',
                  background: 'var(--primary-color)',
                  padding: '25px 35px',
                  borderRadius: '12px'
                }}>
                  <h3 style={{ margin: 0, fontSize: '48px', fontWeight: 700, color: '#1a1a1a' }}>18+</h3>
                  <p style={{ margin: 0, color: '#1a1a1a', fontWeight: 600 }}>Years of Excellence</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 pl-lg-5" data-aos="fade-left">
              <div className="heading-section">
                <span className="subheading">About Us</span>
                <h2 className="mb-4">Kamal & Associates: <span className="text-accent">Defender of Justice</span></h2>
              </div>
              <p>
                Founded in 2008, Kamal & Associates has grown to become one of Bangladesh's most respected
                law firms. Our journey began with a simple mission: to provide accessible, high-quality legal
                services to those who need them most.
              </p>
              <p>
                Since 2008, we have built a reputation for excellence, integrity, and unwavering
                commitment to our clients. Our team of experienced attorneys brings together diverse
                expertise across multiple practice areas, ensuring comprehensive legal solutions.
              </p>
              <p>
                Today, we continue to uphold the values that have defined us from the beginning: a
                dedication to justice, a commitment to ethical practice, and a passion for helping
                our clients achieve their goals.
              </p>
              <Link to="/consultation" className="btn btn-primary mt-4">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="ftco-section bg-dark-custom">
        <div className="container">
          <div className="row justify-content-center mb-5" data-aos="fade-up">
            <div className="col-md-8 text-center">
              <div className="heading-section">
                <span className="subheading">Our Foundation</span>
                <h2>Core <span className="text-accent">Values</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            {values.map((value, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="value-card text-center" style={{
                  background: 'rgba(175, 169, 57, 0.05)',
                  border: '1px solid rgba(175, 169, 57, 0.1)',
                  borderRadius: '16px',
                  padding: '40px 30px',
                  height: '100%',
                  transition: 'all 0.3s ease'
                }}>
                  <div className="icon mb-4" style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(175, 169, 57, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <i className={`fas ${value.icon}`} style={{ fontSize: '32px', color: '#AFA939' }}></i>
                  </div>
                  <h4 style={{ color: '#ECECEC', marginBottom: '15px' }}>{value.title}</h4>
                  <p style={{ color: '#9CA3AF', margin: 0 }}>{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4" data-aos="fade-right">
              <div style={{
                background: 'linear-gradient(135deg, rgba(175, 169, 57, 0.1) 0%, rgba(180, 136, 17, 0.05) 100%)',
                border: '1px solid rgba(175, 169, 57, 0.2)',
                borderRadius: '16px',
                padding: '40px',
                height: '100%'
              }}>
                <div className="icon mb-4" style={{
                  width: '60px',
                  height: '60px',
                  background: 'var(--primary-color)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-bullseye" style={{ fontSize: '28px', color: '#1a1a1a' }}></i>
                </div>
                <h3 style={{ color: '#ECECEC', marginBottom: '20px' }}>Our Mission</h3>
                <p style={{ color: '#9CA3AF', lineHeight: 1.8 }}>
                  To provide exceptional legal services that empower our clients to navigate complex
                  legal challenges with confidence. We are committed to upholding justice, protecting
                  rights, and delivering results that make a meaningful difference in people's lives.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-4" data-aos="fade-left">
              <div style={{
                background: 'linear-gradient(135deg, rgba(175, 169, 57, 0.1) 0%, rgba(180, 136, 17, 0.05) 100%)',
                border: '1px solid rgba(175, 169, 57, 0.2)',
                borderRadius: '16px',
                padding: '40px',
                height: '100%'
              }}>
                <div className="icon mb-4" style={{
                  width: '60px',
                  height: '60px',
                  background: 'var(--primary-color)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-eye" style={{ fontSize: '28px', color: '#1a1a1a' }}></i>
                </div>
                <h3 style={{ color: '#ECECEC', marginBottom: '20px' }}>Our Vision</h3>
                <p style={{ color: '#9CA3AF', lineHeight: 1.8 }}>
                  To be recognized as Bangladesh's most trusted and innovative law firm, setting the
                  standard for legal excellence and client service. We envision a future where access
                  to quality legal representation is available to all who seek justice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="ftco-section bg-dark-custom">
        <div className="container">
          <div className="row justify-content-center mb-5" data-aos="fade-up">
            <div className="col-md-8 text-center">
              <div className="heading-section">
                <span className="subheading">Our Journey</span>
                <h2>Key <span className="text-accent">Milestones</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="timeline">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="timeline-content" style={{
                      background: 'rgba(175, 169, 57, 0.05)',
                      border: '1px solid rgba(175, 169, 57, 0.1)',
                      borderRadius: '12px',
                      padding: '25px',
                      position: 'relative'
                    }}>
                      <span className="year" style={{
                        display: 'inline-block',
                        background: 'var(--primary-color)',
                        color: '#1a1a1a',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontWeight: 700,
                        marginBottom: '15px'
                      }}>{milestone.year}</span>
                      <h4 style={{ color: '#ECECEC', marginBottom: '10px' }}>{milestone.title}</h4>
                      <p style={{ color: '#9CA3AF', margin: 0 }}>{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ftco-section" style={{
        background: 'linear-gradient(135deg, rgba(175, 169, 57, 0.1) 0%, rgba(180, 136, 17, 0.1) 100%)',
        borderTop: '1px solid rgba(175, 169, 57, 0.2)'
      }}>
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-8 text-center">
              <h2 className="mb-4">Ready to Work With <span className="text-accent">Us?</span></h2>
              <p className="mb-4" style={{ fontSize: '18px' }}>
                Join thousands of satisfied clients who have trusted Kamal & Associates with their legal needs.
              </p>
              <div className="d-flex justify-content-center flex-wrap" style={{ gap: '15px' }}>
                <Link to="/consultation" className="btn btn-primary">
                  Get Started Today
                </Link>
                <Link to="/attorneys" className="btn btn-outline-primary">
                  Meet Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
