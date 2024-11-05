import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, Calendar, AlertCircle, Home, Gauge, Briefcase, Users, ArrowLeft, Star, X, Search, Menu } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ReviewsModal = ({ isOpen, onClose }) => {
  const reviews = [
    { id: 1, author: "John Doe", rating: 4, comment: "Great service, always on time!" },
    { id: 2, author: "Jane Smith", rating: 5, comment: "Excellent communication and reliability." },
    { id: 3, author: "Bob Johnson", rating: 3, comment: "Good overall, but had some delays." },
    { id: 4, author: "Alice Brown", rating: 5, comment: "Best broker I've worked with. Highly recommended!" },
    { id: 5, author: "Charlie Wilson", rating: 4, comment: "Very professional and efficient." },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Reviews</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {reviews.map((review) => (
          <div key={review.id} className="border-b py-4">
            <div className="flex items-center mb-2">
              <span className="font-bold mr-2">{review.author}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? "#FFD700" : "none"}
                    stroke={i < review.rating ? "#FFD700" : "#000"}
                  />
                ))}
              </div>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      let sessiontoken = Cookies.get('sessiontoken');
      let dot = Cookies.get('dot');
      
      if (sessiontoken != null && dot != null) {
        try {
          const response = await axios.post('https://www.brokerwatch.co/crud/checksess.php', {
            session: sessiontoken,
            dot: dot
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
    
          if (response.data.includes("success")) {
            setIsAuthenticated(true);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error:', error);
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      } else {
        console.log('Required cookies are missing.');
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const chartData = [
    { name: 'Apr', value1: 4, value2: 6, value3: 8 },
    { name: 'May', value1: 4, value2: 8, value3: 12 },
    { name: 'Jun', value1: 8, value2: 12, value3: 14 },
    { name: 'Jul', value1: 4, value2: 6, value3: 8 },
    { name: 'Aug', value1: 4, value2: 8, value3: 12 },
  ];

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setIsDataVisible(true);
    }
  };

  const openReviewsModal = () => {
    setIsReviewsModalOpen(true);
  };

  const closeReviewsModal = () => {
    setIsReviewsModalOpen(false);
  };
  if (!isAuthenticated) {
    navigate("/")
    return null; // This will prevent any flicker before redirect
    
  }
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center">
        <div className="bg-blue-600 text-white font-bold text-2xl w-10 h-10 flex items-center justify-center rounded">B</div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-blue-600">
          <Menu size={24} color='white' />
        </button>
      </div>

      {/* Side Navbar */}
      <div className={`bg-white md:w-16 md:min-h-screen flex flex-col items-center py-4 shadow-lg ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="hidden md:flex bg-blue-600 text-white font-bold text-2xl w-12 h-12 items-center justify-center rounded mb-8">B</div>
        <nav className="flex flex-row md:flex-col items-center justify-around md:justify-start md:space-y-6 w-full md:w-auto">
          <Home className="text-blue-600" size={24} />
          <Gauge className="text-blue-600" size={24} />
          <Briefcase className="text-blue-600" size={24} />
          <Users className="text-blue-600" size={24} />
        </nav>
        <div className="mt-auto hidden md:block">
          <ArrowLeft className="text-blue-600" size={24} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <div className={`transition-all duration-300 ease-in-out ${isDataVisible ? 'mb-6' : 'h-full flex items-center justify-center'}`}>
          <div className={`${isDataVisible ? 'w-full' : 'w-full md:w-2/3'} mx-auto`}>
            <h1 className={`text-xl font-semibold mb-4 ${isDataVisible ? '' : 'text-center'}`}>
              {isDataVisible ? 'Hello Trucking Company' : 'Search for a Broker'}
            </h1>
            <div className={`flex items-center ${isDataVisible ? 'justify-end' : 'justify-center'}`}>
              {isDataVisible && <span className="mr-2 hidden md:inline">Search Another Broker</span>}
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Enter MC or USDOT#"
                  className="border p-2 pr-10 rounded w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                >
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isDataVisible && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-500 text-white p-4 rounded-lg">
                <h2 className="text-sm mb-2">Days to Pay</h2>
                <div className="flex items-center">
                  <span className="text-3xl md:text-4xl font-bold mr-2">21</span>
                  <Calendar size={20} />
                </div>
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-lg">
                <h2 className="text-sm mb-2">Credit Score</h2>
                <div className="flex items-center">
                  <span className="text-3xl md:text-4xl font-bold">A</span>
                </div>
              </div>
              <div className="bg-blue-400 text-white p-4 rounded-lg">
                <h2 className="text-sm mb-2">Cancellation Ranking</h2>
                <div className="flex items-center">
                  <span className="text-3xl md:text-4xl font-bold mr-2">C</span>
                  <AlertCircle size={20} />
                </div>
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-lg">
                <h2 className="text-sm mb-2">Legitimacy Ranking</h2>
                <div className="flex items-center">
                  <span className="text-3xl md:text-4xl font-bold mr-2">B</span>
                  <Shield size={20} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Main Problems Reported:</h2>
                <div className="flex flex-col md:flex-row items-center mb-2">
                  <div className="w-32 h-32 relative mb-4 md:mb-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">133</span>
                    </div>
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                  </div>
                  <ul className="md:ml-4">
                    <li className="flex items-center mb-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span>50% Not Paying Detention</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                      <span>37.5% Cancellation</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-blue-700 rounded-full mr-2"></span>
                      <span>12.5% Human Error</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Monthly Data</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value1" fill="#3B82F6" />
                    <Bar dataKey="value2" fill="#60A5FA" />
                    <Bar dataKey="value3" fill="#93C5FD" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg flex flex-col justify-between">
                <div>
                  <h2 className="text-sm mb-2">Booking Recommendation</h2>
                  <div className="flex items-center">
                    <span className="text-4xl font-bold">B</span>
                  </div>
                </div>
                <div className="text-right">
                  <button onClick={openReviewsModal} className="text-white text-sm hover:underline">View All Reviews</button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="font-semibold mb-2">Annual Volume:</h2>
                <p className="text-2xl font-bold text-blue-600">$ 1.7M</p>
                <h2 className="font-semibold mt-4 mb-2">Average RPM:</h2>
                <p className="text-2xl font-bold text-blue-600">$ 2.70</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="font-semibold mb-2">Bond Expiration:</h2>
                <p className="text-2xl font-bold text-blue-600">Mar 22 2024</p>
                <h2 className="font-semibold mt-4 mb-2">Bond Amount:</h2>
                <p className="text-2xl font-bold text-blue-600">$75k</p>
              </div>
            </div>
          </>
        )}
      </div>

      <ReviewsModal isOpen={isReviewsModalOpen} onClose={closeReviewsModal} />
    </div>
  );
};

export default Dashboard;