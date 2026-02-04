import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AttorneysPage from './pages/AttorneysPage';
import PracticeAreasPage from './pages/PracticeAreasPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import ConsultationPage from './pages/ConsultationPage';

const AppLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Update document title based on current page
  useEffect(() => {
    const pageTitles: { [key: string]: string } = {
      home: 'Kamal & Associates | Defender Of Justice',
      about: 'About Us | Kamal & Associates',
      attorneys: 'Our Attorneys | Kamal & Associates',
      practice: 'Practice Areas | Kamal & Associates',
      cases: 'Case Studies | Kamal & Associates',
      blog: 'Legal Blog | Kamal & Associates',
      contact: 'Contact Us | Kamal & Associates',
      consultation: 'Free Consultation | Kamal & Associates'
    };
    document.title = pageTitles[currentPage] || 'Kamal & Associates';
  }, [currentPage]);

  // Initialize AOS on mount
  useEffect(() => {
    // @ts-ignore
    if (typeof AOS !== 'undefined') {
      // @ts-ignore
      AOS.init({
        duration: 800,
        easing: 'slide',
        once: true
      });
    }
  }, []);

  // Refresh AOS on page change
  useEffect(() => {
    // @ts-ignore
    if (typeof AOS !== 'undefined') {
      // @ts-ignore
      AOS.refresh();
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'attorneys':
        return <AttorneysPage setCurrentPage={setCurrentPage} />;
      case 'practice':
        return <PracticeAreasPage setCurrentPage={setCurrentPage} />;
      case 'cases':
        return <CaseStudiesPage setCurrentPage={setCurrentPage} />;
      case 'blog':
        return <BlogPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage setCurrentPage={setCurrentPage} />;
      case 'consultation':
        return <ConsultationPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div>
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
      />
      
      <main>
        {renderPage()}
      </main>
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default AppLayout;
