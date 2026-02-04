import React, { useState } from 'react';

interface CaseStudiesPageProps {
  setCurrentPage: (page: string) => void;
}

const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Cases' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'property', name: 'Property' },
    { id: 'family', name: 'Family' },
    { id: 'criminal', name: 'Criminal' },
    { id: 'ip', name: 'Intellectual Property' },
  ];

  const caseStudies = [
    {
      id: 1,
      category: 'corporate',
      title: 'Major Merger & Acquisition',
      client: 'Confidential - Manufacturing Sector',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
      summary: 'Successfully facilitated a $50 million merger between two leading manufacturing companies.',
      challenge: 'Our client, a leading manufacturing company, sought to acquire a competitor to expand market share. The transaction involved complex regulatory approvals, due diligence across multiple jurisdictions, and negotiation of intricate deal terms.',
      solution: 'Our corporate team conducted comprehensive due diligence, identified potential risks, and structured the transaction to minimize tax implications. We negotiated favorable terms and coordinated with regulatory authorities for timely approvals.',
      outcome: 'The merger was completed within 8 months, creating a combined entity with 40% market share. The client achieved significant cost synergies and expanded their product portfolio.',
      year: '2024'
    },
    {
      id: 2,
      category: 'property',
      title: 'Land Dispute Resolution',
      client: 'Confidential - Real Estate Developer',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
      summary: 'Resolved a complex multi-party land dispute involving ancestral property claims.',
      challenge: 'A real estate developer faced claims from multiple parties asserting ancestral rights over a prime commercial plot. The dispute threatened a major development project worth $20 million.',
      solution: 'Our property law team conducted extensive title research, traced ownership history over 100 years, and identified the legitimate heirs. We facilitated negotiations and structured a settlement that satisfied all parties.',
      outcome: 'The dispute was resolved through mediation, avoiding lengthy litigation. The developer proceeded with the project, and all claimants received fair compensation.',
      year: '2023'
    },
    {
      id: 3,
      category: 'family',
      title: 'Complex Custody Case',
      client: 'Confidential - Individual',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600',
      summary: 'Secured custody rights for a parent in a challenging cross-border custody dispute.',
      challenge: 'Our client faced a custody battle with their spouse who had relocated to another country with their children without consent. The case involved international law and multiple jurisdictions.',
      solution: 'We invoked the Hague Convention on International Child Abduction and coordinated with legal counsel in the other jurisdiction. Our team presented compelling evidence of the children\'s best interests.',
      outcome: 'The court ordered the return of the children to Bangladesh, and our client was granted primary custody with structured visitation rights for the other parent.',
      year: '2024'
    },
    {
      id: 4,
      category: 'criminal',
      title: 'White-Collar Crime Defense',
      client: 'Confidential - Corporate Executive',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600',
      summary: 'Successfully defended a corporate executive against fraud allegations.',
      challenge: 'A senior executive was accused of financial fraud involving company funds. The prosecution presented extensive documentary evidence, and the case received significant media attention.',
      solution: 'Our criminal defense team conducted a thorough investigation, engaged forensic accountants, and identified critical flaws in the prosecution\'s evidence. We demonstrated that the transactions were legitimate business decisions.',
      outcome: 'The client was acquitted of all charges. The court found that the prosecution failed to prove criminal intent, and our client\'s reputation was restored.',
      year: '2023'
    },
    {
      id: 5,
      category: 'ip',
      title: 'Trademark Infringement Victory',
      client: 'Confidential - Consumer Goods Company',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600',
      summary: 'Protected a client\'s brand from widespread counterfeiting and trademark infringement.',
      challenge: 'A well-known consumer goods company discovered that counterfeit products bearing their trademark were flooding the market, causing significant revenue loss and brand damage.',
      solution: 'We initiated trademark infringement proceedings, coordinated with customs authorities to seize counterfeit goods, and pursued civil and criminal remedies against the infringers.',
      outcome: 'Obtained injunctions against multiple infringers, recovered damages of $2 million, and established stronger brand protection measures.',
      year: '2024'
    },
    {
      id: 6,
      category: 'corporate',
      title: 'Joint Venture Structuring',
      client: 'Confidential - Technology Sector',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
      summary: 'Structured a successful joint venture between local and international technology companies.',
      challenge: 'A local technology company sought to partner with an international firm to develop innovative solutions. The parties had different expectations regarding control, profit sharing, and exit mechanisms.',
      solution: 'We drafted comprehensive joint venture agreements that balanced the interests of both parties, addressed regulatory requirements, and provided clear dispute resolution mechanisms.',
      outcome: 'The joint venture was successfully established and has been operating profitably for three years, with both parties achieving their strategic objectives.',
      year: '2022'
    },
  ];

  const filteredCases = selectedCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(c => c.category === selectedCategory);

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
              <span className="subheading" style={{ color: '#AFA939' }}>Our Success Stories</span>
              <h1 style={{ fontSize: '48px', marginTop: '15px' }}>Case <span className="text-accent">Studies</span></h1>
              <p className="breadcrumbs mt-3">
                <span>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} style={{ color: '#AFA939' }}>Home</a>
                  <i className="fas fa-chevron-right mx-3" style={{ fontSize: '12px', color: '#9CA3AF' }}></i>
                </span>
                <span style={{ color: '#ECECEC' }}>Case Studies</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5" data-aos="fade-up">
            <div className="col-md-8 text-center">
              <div className="heading-section">
                <span className="subheading">Proven Results</span>
                <h2>Our Track <span className="text-accent">Record</span></h2>
                <p>
                  Explore our anonymized case studies showcasing our expertise and successful outcomes 
                  across various practice areas.
                </p>
              </div>
            </div>
          </div>

          {/* Category Filter - Tabs Style */}
          <div className="row justify-content-center mb-5" data-aos="fade-up">
            <div className="col-auto">
              <ul className="nav nav-tabs-custom">
                {categories.map((cat) => (
                  <li key={cat.id} className="nav-item">
                    <button
                      className={`nav-link ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Case Studies Grid */}
          <div className="row">
            {filteredCases.map((caseStudy, index) => (
              <div key={caseStudy.id} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="case-study-card">
                  <div 
                    className="img" 
                    style={{ backgroundImage: `url(${caseStudy.image})`, cursor: 'pointer' }}
                    onClick={() => setSelectedCase(index)}
                  >
                    <span className="badge-category">
                      {categories.find(c => c.id === caseStudy.category)?.name}
                    </span>
                  </div>
                  <div className="content">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ color: '#9CA3AF', fontSize: '13px' }}>{caseStudy.year}</span>
                    </div>
                    <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>
                      <a 
                        href="#"
                        onClick={(e) => { e.preventDefault(); setSelectedCase(index); }}
                        style={{ color: '#ECECEC' }}
                      >
                        {caseStudy.title}
                      </a>
                    </h3>
                    <p style={{ color: '#9CA3AF', fontSize: '14px' }}>{caseStudy.summary}</p>
                    <a 
                      href="#" 
                      className="result"
                      onClick={(e) => { e.preventDefault(); setSelectedCase(index); }}
                    >
                      <i className="fas fa-arrow-right"></i>
                      Read Full Case Study
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ftco-counter">
        <div className="container">
          <div className="row">
            {[
              { number: '98%', label: 'Success Rate' },
              { number: '1000+', label: 'Cases Won' },
              { number: '$100M+', label: 'Recovered for Clients' },
              { number: '40+', label: 'Years Experience' }
            ].map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="counter-wrap">
                  <div className="number">{stat.number}</div>
                  <div className="caption">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedCase !== null && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.9)', overflowY: 'auto' }}
          onClick={() => setSelectedCase(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered my-5" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{ 
              background: '#161819', 
              border: '1px solid rgba(175, 169, 57, 0.2)',
              borderRadius: '16px'
            }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title text-white">{filteredCases[selectedCase].title}</h5>
                <button 
                  type="button" 
                  className="close text-white" 
                  onClick={() => setSelectedCase(null)}
                  style={{ fontSize: '30px', opacity: 1, textShadow: 'none' }}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body p-4">
                <img 
                  src={filteredCases[selectedCase].image} 
                  alt={filteredCases[selectedCase].title}
                  className="img-fluid mb-4"
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }}
                />
                <div className="mb-3 d-flex align-items-center flex-wrap" style={{ gap: '15px' }}>
                  <span className="badge" style={{ 
                    background: 'linear-gradient(135deg, #AFA939 0%, #B48811 100%)', 
                    color: '#0F1113',
                    padding: '6px 14px',
                    borderRadius: '4px'
                  }}>
                    {categories.find(c => c.id === filteredCases[selectedCase].category)?.name}
                  </span>
                  <span style={{ color: '#9CA3AF' }}><i className="far fa-calendar-alt mr-2"></i>{filteredCases[selectedCase].year}</span>
                </div>
                <p style={{ color: '#9CA3AF', marginBottom: '25px' }}>
                  <strong style={{ color: '#ECECEC' }}>Client:</strong> {filteredCases[selectedCase].client}
                </p>
                
                <div style={{ 
                  background: 'rgba(175, 169, 57, 0.1)', 
                  padding: '20px', 
                  borderRadius: '12px',
                  borderLeft: '4px solid #AFA939',
                  marginBottom: '25px'
                }}>
                  <h5 style={{ color: '#AFA939', marginBottom: '15px' }}>The Challenge</h5>
                  <p style={{ margin: 0, color: '#D1D5DB' }}>{filteredCases[selectedCase].challenge}</p>
                </div>
                
                <div style={{ 
                  background: 'rgba(175, 169, 57, 0.1)', 
                  padding: '20px', 
                  borderRadius: '12px',
                  borderLeft: '4px solid #AFA939',
                  marginBottom: '25px'
                }}>
                  <h5 style={{ color: '#AFA939', marginBottom: '15px' }}>Our Solution</h5>
                  <p style={{ margin: 0, color: '#D1D5DB' }}>{filteredCases[selectedCase].solution}</p>
                </div>
                
                <div style={{ 
                  background: 'rgba(175, 169, 57, 0.1)', 
                  padding: '20px', 
                  borderRadius: '12px',
                  borderLeft: '4px solid #AFA939',
                  marginBottom: '25px'
                }}>
                  <h5 style={{ color: '#AFA939', marginBottom: '15px' }}>The Outcome</h5>
                  <p style={{ margin: 0, color: '#D1D5DB' }}>{filteredCases[selectedCase].outcome}</p>
                </div>
                
                <hr style={{ borderColor: 'rgba(175, 169, 57, 0.15)', margin: '30px 0' }} />
                
                <div className="text-center">
                  <p className="mb-3" style={{ fontSize: '18px' }}>Have a similar case? Let us help you achieve the best outcome.</p>
                  <a 
                    href="#" 
                    className="btn btn-primary"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setSelectedCase(null);
                      setCurrentPage('consultation'); 
                    }}
                  >
                    Schedule Free Consultation
                    <i className="fas fa-arrow-right ml-2"></i>
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
              <h2 className="mb-4">Ready to Discuss Your <span className="text-accent">Case?</span></h2>
              <p className="mb-4" style={{ fontSize: '18px' }}>
                Our experienced attorneys are ready to help you achieve the best possible outcome. 
                Schedule a free consultation today.
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

export default CaseStudiesPage;
