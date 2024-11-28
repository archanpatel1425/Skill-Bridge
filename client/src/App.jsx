import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/ResetPassword';
import { AuthUserProvider } from './contexts/AuthUserContexts';
import About from './pages/About';
import AdminDashboard from './pages/AdminPage';
import Certificate from './pages/Certificate';
import CertificatePreview from './pages/CertificatePreview';
import ContactSection from './pages/ContactSection';
import Course from './pages/Course';
import CourseDetails from './pages/CourseDetails';
import CourseDisplay from './pages/CourseDisplay';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import LeaderBoard from './pages/LeaderBoard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Signup from './pages/SignUp';
import Skills from './pages/Skills';
import UserCoursesPage from './pages/UserCourse';
import VideoPage from './pages/VideoPage';

const App = () => {
        const location = useLocation();

        // Define paths where the NavBar should be hidden
        const hideNavBarPaths = [
                '/login',
                '/signup',
                '/forgot-password',
                '/reset-password'
        ];

        // Check if current path should hide navbar/footer
        const shouldHideNavBar = () => {
                // Check if it matches any of the specific paths
                const isHiddenPath = hideNavBarPaths.some(path =>
                        location.pathname.startsWith(path)
                );

                // Check if it's a valid route by matching against all defined routes
                const validRoutes = [
                        '/',
                        '/contact',
                        '/chatbot',
                        '/home',
                        '/Home1',
                        '/course',
                        '/skill',
                        '/aboutpage',
                        '/certificate',
                        '/admin',
                        '/courseDetails',
                        '/profile',
                        '/leaderBoard',
                        '/video',
                        '/my-courses'
                ];

                const isValidRoute = validRoutes.some(route =>
                        location.pathname == route
                );

                // Hide navbar if it's either a hidden path OR not a valid route (404)
                return isHiddenPath || !isValidRoute;
        };

        const hideNavBar = shouldHideNavBar();

        return (
                <AuthUserProvider>
                        <div className="relative">
                                {!hideNavBar && <NavBar />}
                                <Routes>
                                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                                        <Route path="/contact" element={<ContactSection />} />
                                        <Route path='/forgot-password' element={<ForgotPassword />} />
                                        <Route path="/" element={<Home />} />
                                        <Route path="/Home1" element={<Course />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path='/signup' element={<Signup />} />
                                        <Route path='/home' element={<Home />} />
                                        <Route path="/course" element={<CourseDisplay />} />
                                        <Route path="/skill" element={<Skills />} />
                                        <Route path='/aboutpage' element={<About />} />

                                        <Route path="/certificate/:courseId" element={
                                                <ProtectedRoute>
                                                        <Certificate />
                                                </ProtectedRoute>
                                        } />
                                        <Route path="/certificatepreview/:courseId" element={
                                                <ProtectedRoute>
                                                        <CertificatePreview />
                                                </ProtectedRoute>
                                        } />
                                        <Route path="/admin/*" element={<AdminDashboard />} />

                                        {/* Protected Routes */}
                                        <Route
                                                path="/courseDetails/"
                                                element={
                                                        <ProtectedRoute>
                                                                <CourseDetails />
                                                        </ProtectedRoute>
                                                }
                                        />
                                        <Route
                                                path="/profile"
                                                element={
                                                        <ProtectedRoute>
                                                                <Profile />
                                                        </ProtectedRoute>
                                                }
                                        />
                                        <Route
                                                path="/leaderBoard"
                                                element={
                                                        <ProtectedRoute>
                                                                <LeaderBoard />
                                                        </ProtectedRoute>
                                                }
                                        />
                                        <Route path="/video" element={
                                                <ProtectedRoute>
                                                        <VideoPage />
                                                </ProtectedRoute>
                                        } />
                                        <Route path="/my-courses" element={
                                                <ProtectedRoute>
                                                        <UserCoursesPage />
                                                </ProtectedRoute>
                                        } />
                                        {/* 404 Not Found Route - Keep this last */}
                                        <Route path="*" element={<NotFound />} />
                                </Routes>
                                {!hideNavBar && <Footer />}

                        </div>
                </AuthUserProvider >
        );
};

export default App;


/* 
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const courseData = [
    { id: 1, course_pic: 'link_to_image_1.jpg', course_name: 'Course 1', read_more: '/course-1' },
    { id: 2, course_pic: 'link_to_image_2.jpg', course_name: 'Course 2', read_more: '/course-2' },
    { id: 3, course_pic: 'link_to_image_3.jpg', course_name: 'Course 3', read_more: '/course-3' },
    { id: 4, course_pic: 'link_to_image_4.jpg', course_name: 'Course 4', read_more: '/course-4' },
    { id: 5, course_pic: 'link_to_image_5.jpg', course_name: 'Course 5', read_more: '/course-5' },
    { id: 6, course_pic: 'link_to_image_6.jpg', course_name: 'Course 6', read_more: '/course-6' },
    { id: 7, course_pic: 'link_to_image_7.jpg', course_name: 'Course 7', read_more: '/course-7' },
    { id: 8, course_pic: 'link_to_image_8.jpg', course_name: 'Course 8', read_more: '/course-8' },
    { id: 9, course_pic: 'link_to_image_9.jpg', course_name: 'Course 9', read_more: '/course-9' },
    { id: 10, course_pic: 'link_to_image_10.jpg', course_name: 'Course 10', read_more: '/course-10' },
];

// Custom Next Arrow Button
const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
            &#10095;
        </button>
    );
};

// Custom Previous Arrow Button
const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
            &#10094;
        </button>
    );
};

const App = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(courseData);
    }, []);

    const settings = {
        dots: false, // Remove navigation dots
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        swipeToSlide: true, // Allows smooth drag
        touchMove: true,    // Enables touch movements
        nextArrow: <NextArrow />,  // Custom Next Arrow
        prevArrow: <PrevArrow />,  // Custom Previous Arrow
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 576,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <div className="w-11/12 mx-auto relative">
            <Slider {...settings}>
                {courses.map(course => (
                    <div key={course.id} className="p-4">
                        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-lg bg-white">
                            <img src={course.course_pic} alt={course.course_name} className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-lg font-semibold mb-2">{course.course_name}</h3>
                            <button 
                                onClick={() => window.location.href = course.read_more} 
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default App;
 */