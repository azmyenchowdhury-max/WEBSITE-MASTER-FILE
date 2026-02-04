import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="d-flex align-items-center justify-content-center" 
      style={{ 
        minHeight: '100vh', 
        background: '#000',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <div>
        <h1 style={{ fontSize: '120px', fontWeight: '700', color: '#c59b6d', marginBottom: '0' }}>404</h1>
        <h2 className="text-white mb-4">Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <button 
          className="btn btn-primary py-3 px-5"
          onClick={() => navigate('/')}
        >
          <i className="fas fa-home mr-2"></i>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
