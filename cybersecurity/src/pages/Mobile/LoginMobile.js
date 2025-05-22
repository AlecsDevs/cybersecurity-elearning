import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff, MdError, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import imgform from "../../assets/FormImg.png";
import Logo from "../../assets/Logocyber.png";

export default function LoginMobile() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    
    const [showPassword, setShowPassword] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        general: ''
    });
    const [isLocked, setIsLocked] = useState(false);
    const [lockTime, setLockTime] = useState(null);
    const [isRobotChecked, setIsRobotChecked] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 300);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when typing
        setErrors({
            ...errors,
            [name]: '',
            general: ''
        });
    };

    const handleLogin = async () => {
        // Basic validation
        if (!formData.username) {
            setErrors({
                ...errors,
                username: 'Username is required'
            });
            return;
        }
        
        if (!formData.password) {
            setErrors({
                ...errors,
                password: 'Password is required'
            });
            return;
        }
        
        // Check if "I'm not a robot" is checked
        if (!isRobotChecked) {
            setErrors({
                ...errors,
                general: 'Please verify that you are not a robot'
            });
            return;
        }
        
        setIsLoggingIn(true);
        try {
            const result = await login(formData.username, formData.password);
            
            if (result.success) {
                // Get the intended destination or default to home
                const from = location.state?.from || '/';
                navigate(from);
            } else {
                // Handle account lock
                if (result.status === 403 && result.error.includes('locked')) {
                    const lockUntil = result.error.match(/until (.*)/)?.[1];
                    setIsLocked(true);
                    setLockTime(lockUntil || 'some time');
                }
                
                setErrors({
                    ...errors,
                    general: result.error
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({
                ...errors,
                general: 'An unexpected error occurred'
            });
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleSignUp = () => {
        navigate('/SignUp');
    };

    const toggleRobotCheck = () => {
        setIsRobotChecked(!isRobotChecked);
        // Clear any previous error when toggling
        if (errors.general === 'Please verify that you are not a robot') {
            setErrors({
                ...errors,
                general: ''
            });
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#212121',
            padding: '20px',
            transition: 'background-color 0.5s ease'
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease'
        },
        topPanel: {
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s'
        },
        logo: {
            width: '80px',
            height: '80px',
            marginBottom: '15px',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)',
            transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s'
        },
        heading: {
            fontSize: '22px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333',
            textAlign: 'center',
            transition: 'color 0.3s ease'
        },
        imageContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '200px',
            marginBottom: '15px',
            transition: 'transform 0.3s ease',
            transform: isLoaded ? 'scale(1)' : 'scale(0.95)'
        },
        image: {
            width: '100%',
            height: 'auto',
            transition: 'transform 0.5s ease'
        },
        formPanel: {
            width: '100%',
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s'
        },
        loginHeading: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#3F51B5',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s'
        },
        formContainer: {
            width: '100%',
            maxWidth: '280px'
        },
        inputGroup: {
            marginBottom: '15px',
            width: '100%',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease'
        },
        input: {
            width: '100%',
            padding: '12px 15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
        },
        passwordContainer: {
            position: 'relative',
            width: '100%'
        },
        passwordToggle: {
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#aaa',
            transition: 'color 0.3s ease'
        },
        loginButton: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#3F51B5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            position: 'relative',
            overflow: 'hidden'
        },
        buttonContent: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform 0.3s ease'
        },
        signupText: {
            textAlign: 'center',
            fontSize: '14px',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s',
            color: "black"
        },
        signupLink: {
            color: '#3F51B5',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'color 0.3s ease',
            cursor: 'pointer'
        },
        errorMessage: {
            color: '#f44336',
            fontSize: '12px',
            marginTop: '5px',
            display: 'flex',
            alignItems: 'center'
        },
        errorIcon: {
            marginRight: '5px'
        },
        lockMessage: {
            color: '#f44336',
            fontSize: '14px',
            marginBottom: '15px',
            textAlign: 'center'
        },
        robotCheckContainer: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            cursor: 'pointer',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s'
        },
        robotCheckText: {
            marginLeft: '8px',
            fontSize: '14px',
            color: '#555'
        },
        robotCheckbox: {
            color: '#3F51B5',
            transition: 'transform 0.2s ease'
        },
        tagline: {
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.5',
            textAlign: 'center',
            marginBottom: '15px',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s'
        }
    };

    // Custom styles for interactive elements
    const customStyles = {
        loginButton: {
            ...styles.loginButton,
            backgroundColor: isLoggingIn ? '#283593' : '#3F51B5'
        },
        passwordToggle: {
            ...styles.passwordToggle
        },
        signupLink: {
            ...styles.signupLink
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Top Panel with Logo and Image */}
                <div style={styles.topPanel}>
                    <img
                        src={Logo}
                        alt="App Logo"
                        style={styles.logo}
                    />
                    <h1 style={styles.heading}>
                        Welcome to Cybersecurity! 🛡️
                    </h1>
           
                </div>

                {/* Form Panel */}
                <div style={styles.formPanel}>
                    <h2 style={styles.loginHeading}>Secure Login</h2>

                    <div style={styles.formContainer}>
                        {isLocked && (
                            <div style={styles.lockMessage}>
                                Account locked until {lockTime}
                            </div>
                        )}
                        
                        {errors.general && !isLocked && (
                            <div style={styles.errorMessage}>
                                <MdError style={styles.errorIcon} />
                                {errors.general}
                            </div>
                        )}

                        <div style={{
                            ...styles.inputGroup,
                            transitionDelay: isLoaded ? '0.5s' : '0s'
                        }}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                style={{
                                    ...styles.input,
                                    borderColor: errors.username ? '#f44336' : '#ddd'
                                }}
                                onFocus={(e) => e.target.style.borderColor = errors.username ? '#f44336' : '#3F51B5'}
                                onBlur={(e) => e.target.style.borderColor = errors.username ? '#f44336' : '#ddd'}
                                disabled={isLocked}
                            />
                            {errors.username && (
                                <div style={styles.errorMessage}>
                                    <MdError style={styles.errorIcon} />
                                    {errors.username}
                                </div>
                            )}
                        </div>

                        <div style={{
                            ...styles.inputGroup,
                            transitionDelay: isLoaded ? '0.6s' : '0s'
                        }}>
                            <div style={styles.passwordContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    style={{
                                        ...styles.input,
                                        borderColor: errors.password ? '#f44336' : '#ddd'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = errors.password ? '#f44336' : '#3F51B5'}
                                    onBlur={(e) => e.target.style.borderColor = errors.password ? '#f44336' : '#ddd'}
                                    disabled={isLocked}
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={customStyles.passwordToggle}
                                    aria-label="Toggle password visibility"
                                    onMouseOver={(e) => e.target.style.color = '#3F51B5'}
                                    onMouseOut={(e) => e.target.style.color = '#aaa'}
                                    disabled={isLocked}
                                >
                                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <div style={styles.errorMessage}>
                                    <MdError style={styles.errorIcon} />
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        {/* "I'm not a robot" checkbox */}
                        <div 
                            style={styles.robotCheckContainer}
                            onClick={toggleRobotCheck}
                        >
                            {isRobotChecked ? (
                                <MdCheckBox 
                                    size={24} 
                                    style={styles.robotCheckbox}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            ) : (
                                <MdCheckBoxOutlineBlank 
                                    size={24} 
                                    style={styles.robotCheckbox}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            )}
                            <span style={styles.robotCheckText}>I'm not a robot</span>
                        </div>

                        <button 
                            style={{
                                ...customStyles.loginButton,
                                transitionDelay: isLoaded ? '0.7s' : '0s',
                                opacity: isLocked ? 0.7 : 1,
                                cursor: isLocked ? 'not-allowed' : 'pointer'
                            }}
                            onClick={handleLogin}
                            onMouseOver={(e) => {
                                if (!isLoggingIn && !isLocked) e.target.style.backgroundColor = '#303f9f';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                if (!isLoggingIn && !isLocked) e.target.style.backgroundColor = '#3F51B5';
                                e.target.style.transform = 'translateY(0)';
                            }}
                            onMouseDown={(e) => e.target.style.transform = 'translateY(1px)'}
                            onMouseUp={(e) => e.target.style.transform = 'translateY(-2px)'}
                            disabled={isLoggingIn || isLocked}
                        >
                            <div style={styles.buttonContent}>
                                {isLoggingIn ? (
                                    <div style={{
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        border: '3px solid rgba(255, 255, 255, 0.3)',
                                        borderTopColor: '#fff',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                ) : (
                                    'Login'
                                )}
                            </div>
                        </button>

                        <div style={styles.signupText}>
                            Don't have an account? {' '}
                            <span 
                                onClick={handleSignUp}
                                style={customStyles.signupLink}
                                onMouseOver={(e) => {
                                    e.target.style.color = '#1a237e';
                                    e.target.style.textDecoration = 'underline';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.color = '#3F51B5';
                                    e.target.style.textDecoration = 'none';
                                }}
                            >
                                Sign Up
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    input:focus {
                        border-color: #3F51B5 !important;
                        outline: none;
                        box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
                    }
                `}
            </style>
        </div>
    );
}