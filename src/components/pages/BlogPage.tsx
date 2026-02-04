import React, { useState } from 'react';

interface BlogPageProps {
  setCurrentPage: (page: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'corporate', name: 'Corporate Law' },
    { id: 'property', name: 'Property Law' },
    { id: 'family', name: 'Family Law' },
    { id: 'criminal', name: 'Criminal Law' },
    { id: 'updates', name: 'Legal Updates' },
  ];

  const blogPosts = [
    {
      id: 1,
      category: 'corporate',
      title: 'Understanding Corporate Mergers and Acquisitions in Bangladesh',
      author: 'Advocate Kamal Hossain',
      date: 'January 25, 2026',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
      excerpt: 'A comprehensive guide to navigating the complex landscape of M&A transactions under Bangladeshi corporate law.',
      content: `Mergers and acquisitions (M&A) have become increasingly common in Bangladesh's growing economy. Understanding the legal framework is essential for businesses considering such transactions.

**Key Considerations:**

1. **Regulatory Approvals**: M&A transactions often require approval from multiple regulatory bodies, including the Bangladesh Securities and Exchange Commission (BSEC) for listed companies.

2. **Due Diligence**: Comprehensive due diligence is crucial to identify potential risks, including legal, financial, and operational issues.

3. **Structuring the Deal**: The transaction can be structured as an asset purchase, share purchase, or statutory merger, each with different tax and legal implications.

4. **Employee Matters**: Labor law compliance and employee transfer arrangements must be carefully addressed.

5. **Competition Law**: Large transactions may require clearance from competition authorities.

**Conclusion:**

Successful M&A transactions require careful planning, thorough due diligence, and expert legal guidance. Our corporate team has extensive experience guiding clients through these complex transactions.`,
      tags: ['M&A', 'Corporate Law', 'Business']
    },
    {
      id: 2,
      category: 'property',
      title: 'Property Rights: Essential Guide for Homeowners in Bangladesh',
      author: 'Advocate Mohammad Ali',
      date: 'January 20, 2026',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
      excerpt: 'Everything homeowners need to know about protecting their property rights under Bangladeshi law.',
      content: `Property ownership in Bangladesh comes with both rights and responsibilities. Understanding these is crucial for protecting your investment.

**Key Property Rights:**

1. **Right to Possession**: The owner has the exclusive right to possess and occupy the property.

2. **Right to Transfer**: Property can be sold, gifted, or bequeathed subject to legal requirements.

3. **Right to Mortgage**: Property can be used as security for loans.

**Common Issues:**

- Title disputes and fraudulent transfers
- Encroachment by neighbors
- Inheritance complications
- Boundary disputes

**Protecting Your Rights:**

1. Verify title thoroughly before purchase
2. Register all transactions properly
3. Maintain updated documentation
4. Address disputes promptly

**Conclusion:**

Proactive legal measures can prevent most property disputes. Consult with a property law expert for guidance specific to your situation.`,
      tags: ['Property Law', 'Real Estate', 'Homeowners']
    },
    {
      id: 3,
      category: 'family',
      title: 'Navigating Divorce Proceedings: A Compassionate Legal Guide',
      author: 'Advocate Nusrat Jahan',
      date: 'January 15, 2026',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600',
      excerpt: 'Understanding the divorce process in Bangladesh and how to protect your interests while minimizing conflict.',
      content: `Divorce is never easy, but understanding the legal process can help you navigate this difficult time with greater confidence.

**Types of Divorce in Bangladesh:**

1. **Mutual Divorce**: Both parties agree to end the marriage
2. **Contested Divorce**: One party seeks divorce without the other's consent

**Key Considerations:**

1. **Child Custody**: The welfare of children is the court's primary concern
2. **Maintenance**: Financial support obligations must be addressed
3. **Property Division**: Marital assets need to be fairly distributed
4. **Dower (Mahr)**: Muslim marriages involve specific dower rights

**The Process:**

1. Filing the petition
2. Notice to the other party
3. Mediation attempts
4. Court proceedings
5. Final decree

**Conclusion:**

While divorce is challenging, proper legal guidance can help protect your rights and your children's welfare. Our family law team provides compassionate, effective representation.`,
      tags: ['Family Law', 'Divorce', 'Custody']
    },
    {
      id: 4,
      category: 'criminal',
      title: 'Your Rights When Facing Criminal Charges in Bangladesh',
      author: 'Advocate Rashid Ahmed',
      date: 'January 10, 2026',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600',
      excerpt: 'Understanding your constitutional rights and the criminal justice process is essential when facing charges.',
      content: `If you're facing criminal charges, knowing your rights is crucial for protecting yourself throughout the legal process.

**Your Constitutional Rights:**

1. **Right to Legal Representation**: You have the right to an attorney
2. **Right to Remain Silent**: You cannot be compelled to incriminate yourself
3. **Right to Fair Trial**: You're entitled to a fair and speedy trial
4. **Presumption of Innocence**: You're innocent until proven guilty

**The Criminal Process:**

1. **Arrest**: Police must follow proper procedures
2. **Bail**: You may be entitled to bail depending on the offense
3. **Investigation**: The prosecution must gather evidence
4. **Trial**: Your case will be heard in court
5. **Appeal**: You can appeal an unfavorable verdict

**Important Tips:**

- Contact a lawyer immediately
- Don't make statements without legal advice
- Document everything
- Attend all court dates

**Conclusion:**

A strong defense starts with understanding your rights. Our criminal defense team has extensive experience protecting clients' rights throughout the legal process.`,
      tags: ['Criminal Law', 'Rights', 'Defense']
    },
    {
      id: 5,
      category: 'updates',
      title: 'New Tax Regulations 2026: What Businesses Need to Know',
      author: 'Advocate Tanvir Hassan',
      date: 'January 5, 2026',
      image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600',
      excerpt: 'Recent changes to tax regulations and their implications for businesses operating in Bangladesh.',
      content: `The National Board of Revenue has introduced several significant changes to tax regulations for 2026. Here's what businesses need to know.

**Key Changes:**

1. **Corporate Tax Rates**: Adjustments to rates for different business categories
2. **VAT Compliance**: New electronic filing requirements
3. **Transfer Pricing**: Stricter documentation requirements
4. **Tax Incentives**: New incentives for certain industries

**Compliance Requirements:**

- Updated filing deadlines
- New documentation standards
- Electronic submission mandates
- Audit preparation guidelines

**Planning Opportunities:**

- Review corporate structure
- Optimize tax positions
- Utilize available incentives
- Plan for compliance costs

**Conclusion:**

Staying compliant with new regulations requires proactive planning. Our tax team can help you navigate these changes and optimize your tax position.`,
      tags: ['Tax Law', 'Business', 'Regulations']
    },
    {
      id: 6,
      category: 'corporate',
      title: 'Intellectual Property Protection for Startups',
      author: 'Advocate Sabrina Chowdhury',
      date: 'December 28, 2025',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600',
      excerpt: 'Essential IP protection strategies for startups and emerging businesses in Bangladesh.',
      content: `For startups, intellectual property can be their most valuable asset. Protecting it early is crucial for long-term success.

**Types of IP Protection:**

1. **Trademarks**: Protect your brand name and logo
2. **Copyrights**: Protect creative works and software
3. **Patents**: Protect inventions and innovations
4. **Trade Secrets**: Protect confidential business information

**Key Steps for Startups:**

1. Conduct IP audits early
2. Register trademarks before launch
3. Use proper contracts with employees and contractors
4. Implement confidentiality measures
5. Monitor for infringement

**Common Mistakes:**

- Delaying registration
- Inadequate contracts
- Poor documentation
- Ignoring infringement

**Conclusion:**

Early IP protection can prevent costly disputes later. Our IP team helps startups develop comprehensive protection strategies.`,
      tags: ['IP Law', 'Startups', 'Business']
    },
  ];

  const filteredPosts = blogPosts
    .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
    .filter(post => 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      {/* Page Header */}
      <div 
        className="hero-wrap hero-wrap-2" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920')",
          minHeight: '50vh'
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
            <div className="col-md-8 text-center" data-aos="fade-up">
              <span className="subheading" style={{ color: '#AFA939' }}>Legal Insights</span>
              <h1 style={{ fontSize: '48px', marginTop: '15px' }}>Our <span className="text-accent">Blog</span></h1>
              <p className="breadcrumbs mt-3">
                <span>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} style={{ color: '#AFA939' }}>Home</a>
                  <i className="fas fa-chevron-right mx-3" style={{ fontSize: '12px', color: '#9CA3AF' }}></i>
                </span>
                <span style={{ color: '#ECECEC' }}>Blog</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-lg-8">
              {/* Search Bar */}
              <div className="mb-4" data-aos="fade-up">
                <div className="input-group" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ borderRight: 'none' }}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button" style={{ borderRadius: '0 8px 8px 0' }}>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Blog Posts */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-search mb-3" style={{ fontSize: '48px', color: '#AFA939' }}></i>
                  <h4>No articles found</h4>
                  <p style={{ color: '#9CA3AF' }}>Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                filteredPosts.map((post, index) => (
                  <div key={post.id} className="blog-entry mb-4" data-aos="fade-up" data-aos-delay={index * 100} style={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <div 
                          className="img h-100" 
                          style={{ 
                            backgroundImage: `url(${post.image})`, 
                            minHeight: '200px',
                            cursor: 'pointer' 
                          }}
                          onClick={() => setSelectedPost(index)}
                        ></div>
                      </div>
                      <div className="col-md-8">
                        <div className="text p-4">
                          <div className="meta mb-2">
                            <span className="badge mr-2" style={{ 
                              background: 'linear-gradient(135deg, #AFA939 0%, #B48811 100%)', 
                              color: '#0F1113',
                              padding: '5px 12px',
                              borderRadius: '4px',
                              fontWeight: '600'
                            }}>
                              {categories.find(c => c.id === post.category)?.name}
                            </span>
                            <span style={{ color: '#9CA3AF' }}><i className="far fa-calendar-alt mr-1"></i> {post.date}</span>
                          </div>
                          <h3>
                            <a 
                              href="#"
                              onClick={(e) => { e.preventDefault(); setSelectedPost(index); }}
                            >
                              {post.title}
                            </a>
                          </h3>
                          <p style={{ color: '#9CA3AF' }}>{post.excerpt}</p>
                          <p className="mb-0" style={{ color: '#9CA3AF', fontSize: '14px' }}>
                            <i className="far fa-user mr-1"></i> {post.author}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Categories */}
              <div className="p-4 mb-4" style={{ 
                background: '#1C1E20', 
                borderRadius: '12px',
                border: '1px solid rgba(175, 169, 57, 0.15)' 
              }} data-aos="fade-left">
                <h4 style={{ color: '#AFA939', marginBottom: '20px' }}>Categories</h4>
                <ul className="list-unstyled mb-0">
                  {categories.map((cat) => (
                    <li key={cat.id} className="mb-2">
                      <a 
                        href="#"
                        className="d-flex justify-content-between align-items-center py-2"
                        style={{ 
                          color: selectedCategory === cat.id ? '#AFA939' : '#9CA3AF',
                          borderBottom: '1px solid rgba(175, 169, 57, 0.1)'
                        }}
                        onClick={(e) => { e.preventDefault(); setSelectedCategory(cat.id); }}
                      >
                        {cat.name}
                        <span style={{
                          background: selectedCategory === cat.id ? 'linear-gradient(135deg, #AFA939 0%, #B48811 100%)' : 'rgba(175, 169, 57, 0.1)',
                          color: selectedCategory === cat.id ? '#0F1113' : '#9CA3AF',
                          padding: '2px 10px',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}>
                          {cat.id === 'all' ? blogPosts.length : blogPosts.filter(p => p.category === cat.id).length}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="p-4 mb-4" style={{ 
                background: '#1C1E20', 
                borderRadius: '12px',
                border: '1px solid rgba(175, 169, 57, 0.15)' 
              }} data-aos="fade-left" data-aos-delay="100">
                <h4 style={{ color: '#AFA939', marginBottom: '20px' }}>Recent Posts</h4>
                {blogPosts.slice(0, 3).map((post, index) => (
                  <div key={post.id} className="d-flex mb-3" style={{ paddingBottom: '15px', borderBottom: '1px solid rgba(175, 169, 57, 0.1)' }}>
                    <div 
                      className="mr-3" 
                      style={{ 
                        width: '80px', 
                        height: '60px', 
                        backgroundImage: `url(${post.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        flexShrink: 0,
                        borderRadius: '8px'
                      }}
                    ></div>
                    <div>
                      <h6 className="mb-1" style={{ fontSize: '14px' }}>
                        <a 
                          href="#"
                          onClick={(e) => { e.preventDefault(); setSelectedPost(index); }}
                        >
                          {post.title.substring(0, 40)}...
                        </a>
                      </h6>
                      <small style={{ color: '#9CA3AF' }}>{post.date}</small>
                    </div>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div className="p-4" style={{ 
                background: '#1C1E20', 
                borderRadius: '12px',
                border: '1px solid rgba(175, 169, 57, 0.15)' 
              }} data-aos="fade-left" data-aos-delay="200">
                <h4 style={{ color: '#AFA939', marginBottom: '15px' }}>Newsletter</h4>
                <p style={{ color: '#9CA3AF' }}>Subscribe to receive legal updates and insights.</p>
                <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
                  <div className="form-group">
                    <input type="email" className="form-control" placeholder="Your email" required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Subscribe
                    <i className="fas fa-paper-plane ml-2"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Post Modal */}
      {selectedPost !== null && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.9)', overflowY: 'auto' }}
          onClick={() => setSelectedPost(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered my-5" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{ 
              background: '#161819', 
              border: '1px solid rgba(175, 169, 57, 0.2)',
              borderRadius: '16px'
            }}>
              <div className="modal-header border-0">
                <button 
                  type="button" 
                  className="close text-white" 
                  onClick={() => setSelectedPost(null)}
                  style={{ fontSize: '30px', opacity: 1, textShadow: 'none' }}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body p-4">
                <img 
                  src={filteredPosts[selectedPost].image} 
                  alt={filteredPosts[selectedPost].title}
                  className="img-fluid mb-4"
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }}
                />
                <div className="meta mb-3">
                  <span className="badge mr-2" style={{ 
                    background: 'linear-gradient(135deg, #AFA939 0%, #B48811 100%)', 
                    color: '#0F1113',
                    padding: '5px 12px',
                    borderRadius: '4px'
                  }}>
                    {categories.find(c => c.id === filteredPosts[selectedPost].category)?.name}
                  </span>
                  <span className="mr-3" style={{ color: '#9CA3AF' }}><i className="far fa-calendar-alt mr-1"></i> {filteredPosts[selectedPost].date}</span>
                  <span style={{ color: '#9CA3AF' }}><i className="far fa-user mr-1"></i> {filteredPosts[selectedPost].author}</span>
                </div>
                <h3 className="text-white mb-4">{filteredPosts[selectedPost].title}</h3>
                <div style={{ whiteSpace: 'pre-line', color: '#D1D5DB', lineHeight: '1.8' }}>
                  {filteredPosts[selectedPost].content}
                </div>
                <div className="mt-4">
                  {filteredPosts[selectedPost].tags.map((tag, idx) => (
                    <span key={idx} className="badge mr-2" style={{ 
                      background: 'rgba(175, 169, 57, 0.1)', 
                      color: '#AFA939',
                      padding: '5px 12px',
                      borderRadius: '4px'
                    }}>#{tag}</span>
                  ))}
                </div>
                <hr style={{ borderColor: 'rgba(175, 169, 57, 0.15)', margin: '30px 0' }} />
                <div className="text-center">
                  <p className="mb-3" style={{ fontSize: '18px' }}>Need legal advice on this topic?</p>
                  <a 
                    href="#" 
                    className="btn btn-primary"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setSelectedPost(null);
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
    </>
  );
};

export default BlogPage;
