import { useState, useEffect } from 'react';
import { MdVisibility, MdVisibilityOff, MdError, MdCheckCircleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import imgform from "../../assets/FormImg.png";
import Logo from "../../assets/Logocyber.png";

export default function SecureSignUpDesktop() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showCaptchaModal, setShowCaptchaModal] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [captchaValue, setCaptchaValue] = useState('');
    const [generatedCaptcha, setGeneratedCaptcha] = useState('');
    
    // Form states
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    
    // Error states
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        captcha: ''
    });
    
    // Password strength indicators
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        hasMinLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecial: false
    });
    
    // Set loaded state after component mounts for entrance animations
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 300);
        
        // Generate a random CAPTCHA on component mount
        generateCaptcha();
    }, []);
    
    // Generate a random CAPTCHA
    const generateCaptcha = () => {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setGeneratedCaptcha(captcha);
        setCaptchaValue('');
    };
    
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Reset specific error when typing
        setErrors({
            ...errors,
            [name]: ''
        });
        
        // Check password strength when password field changes
        if (name === 'password') {
            checkPasswordStrength(value);
        }
        
        // Check if passwords match when confirm password field changes
        if (name === 'confirmPassword' && formData.password && value) {
            if (formData.password !== value) {
                setErrors({
                    ...errors,
                    confirmPassword: 'Passwords do not match'
                });
            } else {
                setErrors({
                    ...errors,
                    confirmPassword: ''
                });
            }
        }
    };
    
    // Handle CAPTCHA input changes
    const handleCaptchaChange = (e) => {
        const { value } = e.target;
        setCaptchaValue(value);
        setErrors({
            ...errors,
            captcha: ''
        });
    };
    
    // Verify CAPTCHA
    const verifyCaptcha = () => {
        if (captchaValue === generatedCaptcha) {
            setCaptchaVerified(true);
            setErrors({
                ...errors,
                captcha: ''
            });
            return true;
        } else {
            setCaptchaVerified(false);
            setErrors({
                ...errors,
                captcha: 'Invalid CAPTCHA'
            });
            // Generate a new CAPTCHA
            generateCaptcha();
            return false;
        }
    };
    
    // Check password strength
    const checkPasswordStrength = (password) => {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        let score = 0;
        if (hasMinLength) score++;
        if (hasUpperCase) score++;
        if (hasLowerCase) score++;
        if (hasNumber) score++;
        if (hasSpecial) score++;
        
        setPasswordStrength({
            score,
            hasMinLength,
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecial
        });
    };
    
    // Validate form
    const validateForm = () => {
        let isValid = true;
        const newErrors = { username: '', password: '', confirmPassword: '', captcha: '' };
        
        // Validate username (alphanumeric and minimum 4 characters)
        if (!formData.username) {
            newErrors.username = 'Username is required';
            isValid = false;
        } else if (formData.username.length < 4) {
            newErrors.username = 'Username must be at least 4 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'Username can only contain letters, numbers, and underscores';
            isValid = false;
        }
        
        // Validate password (using strength criteria)
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (passwordStrength.score < 4) {
            newErrors.password = 'Password is not strong enough';
            isValid = false;
        }
        
        // Validate confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };

    const handleSignUp = async () => {
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show CAPTCHA modal instead of verifying immediately
        setShowCaptchaModal(true);
    };

    const handleCaptchaSubmit = async () => {
        // Verify CAPTCHA
        if (!verifyCaptcha()) {
            return;
        }
        
        // Close CAPTCHA modal if verification is successful
        setShowCaptchaModal(false);
        
        // Proceed with sign up
        setIsSigningUp(true);
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }
            
            // Show success modal
            setShowSuccessModal(true);
            
            // Redirect to login after 3 seconds
            setTimeout(() => {
                setShowSuccessModal(false);
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('Registration error:', error);
            
            // Handle specific errors from backend
            if (error.message.includes('already exists')) {
                setErrors({
                    ...errors,
                    username: 'Username already exists'
                });
            } else {
                alert(error.message);
            }
        } finally {
            setIsSigningUp(false);
        }
    };
    
    const handleLoginClick = () => {
        navigate('/login');
    };
    
    // Calculate password strength color
    const getPasswordStrengthColor = () => {
        const { score } = passwordStrength;
        if (score === 0) return '#ccc';
        if (score < 2) return '#f44336'; // Red
        if (score < 4) return '#ff9800'; // Orange
        return '#4caf50'; // Green
    };
    
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#212121',
            padding: '20px',
            transition: 'background-color 0.5s ease'
        },
        card: {
            display: 'flex',
            width: '100%',
            maxWidth: '900px',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '0',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease'
        },
        leftPanel: {
            width: '50%',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s'
        },
        heading: {
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#333',
            transition: 'color 0.3s ease'
        },
        imageContainer: {
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
            transition: 'transform 0.3s ease',
            transform: isLoaded ? 'scale(1)' : 'scale(0.95)'
        },
        image: {
            maxWidth: '100%',
            height: 'auto',
            transition: 'transform 0.5s ease'
        },
        tagline: {
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.5',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s'
        },
        rightPanel: {
            width: '50%',
            padding: '40px',
            borderLeft: '1px solid #eee',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateX(0)' : 'translateX(20px)',
            transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s, background-color 0.3s ease'
        },
        logo: {
            width: '80px',
            height: '80px',
            marginBottom: '20px',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)',
            transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s'
        },
        signupHeading: {
            fontSize: '26px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#3F51B5',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s, color 0.3s ease'
        },
        formContainer: {
            width: '100%',
            maxWidth: '280px',
        },
        inputGroup: {
            marginBottom: '15px',
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
            position: 'relative'
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
        signupButton: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#3F51B5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px',
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
        spinner: {
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: '#fff',
            animation: 'spin 1s linear infinite'
        },
        loginText: {
            textAlign: 'center',
            fontSize: '14px',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s',
            color:"black"
        },
        loginLink: {
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
            alignItems: 'center',
        },
        errorIcon: {
            marginRight: '5px',
        },
        passwordStrengthBar: {
            height: '5px',
            backgroundColor: '#e0e0e0',
            borderRadius: '3px',
            overflow: 'hidden',
            marginTop: '5px',
        },
        passwordStrengthIndicator: {
            height: '100%',
            backgroundColor: getPasswordStrengthColor(),
            width: `${(passwordStrength.score / 5) * 100}%`,
            transition: 'width 0.3s ease, background-color 0.3s ease',
        },
        passwordCriteria: {
            fontSize: '12px',
            color: '#666',
            marginTop: '5px',
        },
        criteriaItem: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '2px',
        },
        criteriaIcon: {
            marginRight: '5px',
            color: '#4caf50',
        },
        criteriaIconInvalid: {
            marginRight: '5px',
            color: '#ccc',
        },
        modalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            opacity: showSuccessModal || showCaptchaModal ? 1 : 0,
            visibility: showSuccessModal || showCaptchaModal ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease'
        },
        modalContent: {
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            transform: showSuccessModal || showCaptchaModal ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
            transition: 'transform 0.4s ease',
            textAlign: 'center'
        },
        successIcon: {
            fontSize: '60px',
            color: '#4CAF50',
            marginBottom: '20px'
        },
        modalTitle: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px'
        },
        modalText: {
            fontSize: '16px',
            color: '#666',
            marginBottom: '20px',
            lineHeight: '1.5'
        },
        captchaModalContent: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        captchaDisplay: {
            backgroundColor: '#f0f0f0',
            padding: '15px',
            borderRadius: '6px',
            textAlign: 'center',
            letterSpacing: '5px',
            fontFamily: 'monospace',
            fontSize: '24px',
            fontWeight: 'bold',
            userSelect: 'none',
            marginBottom: '20px',
            color: '#555',
            position: 'relative',
            overflow: 'hidden',
            width: '100%'
        },
        captchaRefresh: {
            position: 'absolute',
            top: '5px',
            right: '5px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
        },
        captchaInput: {
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '16px',
            marginBottom: '15px'
        },
        modalButton: {
            padding: '12px 24px',
            backgroundColor: '#3F51B5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            marginTop: '10px'
        }
    };

    // Inline styles for elements with pseudo-class transitions
    const inputStyle = {
        ...styles.input
    };

    const customStyles = {
        container: styles.container,
        card: {
            ...styles.card
        },
        signupButton: {
            ...styles.signupButton,
            backgroundColor: isSigningUp ? '#283593' : '#3F51B5'
        },
        passwordToggle: {
            ...styles.passwordToggle
        },
        loginLink: {
            ...styles.loginLink
        }
    };

    return (
        <div style={customStyles.container}>
            <div style={customStyles.card}>
                {/* Left Panel */}
                <div style={styles.leftPanel}>
                    <h1 style={styles.heading}>
                        Join Our
                        <br />
                        Cybersecurity
                        <br />
                        Community! 🛡️
                    </h1>

                    <div style={styles.imageContainer}>
                        <img
                            src={imgform}
                            alt="Cybersecurity illustration"
                            style={styles.image}
                        />
                    </div>

                    <p style={styles.tagline}>
                        Create your account today and start your journey into
                        cybersecurity. Learn from experts, build practical skills,
                        and stay ahead of threats. 🚀
                    </p>
                </div>

                {/* Right Panel */}
                <div style={styles.rightPanel}>
                    <img
                        src={Logo}
                        alt="App Logo"
                        style={styles.logo}
                    />

                    <h2 style={styles.signupHeading}>Create Secure Account</h2>

                    <div style={styles.formContainer}>
                        {/* Username field */}
                        <div style={{
                            ...styles.inputGroup,
                            transitionDelay: isLoaded ? '0.7s' : '0s'
                        }}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                style={{
                                    ...inputStyle,
                                    borderColor: errors.username ? '#f44336' : '#ddd'
                                }}
                                onFocus={(e) => e.target.style.borderColor = errors.username ? '#f44336' : '#3F51B5'}
                                onBlur={(e) => e.target.style.borderColor = errors.username ? '#f44336' : '#ddd'}
                            />
                            {errors.username && (
                                <div style={styles.errorMessage}>
                                    <MdError style={styles.errorIcon} />
                                    {errors.username}
                                </div>
                            )}
                        </div>

                        {/* Password field */}
                        <div style={{
                            ...styles.inputGroup,
                            transitionDelay: isLoaded ? '0.8s' : '0s'
                        }}>
                            <div style={styles.passwordContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    style={{
                                        ...inputStyle,
                                        borderColor: errors.password ? '#f44336' : '#ddd'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = errors.password ? '#f44336' : '#3F51B5'}
                                    onBlur={(e) => e.target.style.borderColor = errors.password ? '#f44336' : '#ddd'}
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={customStyles.passwordToggle}
                                    aria-label="Toggle password visibility"
                                    onMouseOver={(e) => e.target.style.color = '#3F51B5'}
                                    onMouseOut={(e) => e.target.style.color = '#aaa'}
                                >
                                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                </button>
                            </div>
                            
                            {formData.password && (
                                <>
                                    <div style={styles.passwordStrengthBar}>
                                        <div style={styles.passwordStrengthIndicator}></div>
                                    </div>
                                    <div style={styles.passwordCriteria}>
                                        <div style={styles.criteriaItem}>
                                            {passwordStrength.hasMinLength ? 
                                                <MdCheckCircleOutline style={styles.criteriaIcon} /> : 
                                                <MdCheckCircleOutline style={styles.criteriaIconInvalid} />}
                                            At least 8 characters
                                        </div>
                                        <div style={styles.criteriaItem}>
                                            {passwordStrength.hasUpperCase ? 
                                                <MdCheckCircleOutline style={styles.criteriaIcon} /> : 
                                                <MdCheckCircleOutline style={styles.criteriaIconInvalid} />}
                                            Uppercase letter
                                        </div>
                                        <div style={styles.criteriaItem}>
                                            {passwordStrength.hasLowerCase ? 
                                                <MdCheckCircleOutline style={styles.criteriaIcon} /> : 
                                                <MdCheckCircleOutline style={styles.criteriaIconInvalid} />}
                                            Lowercase letter
                                        </div>
                                        <div style={styles.criteriaItem}>
                                            {passwordStrength.hasNumber ? 
                                                <MdCheckCircleOutline style={styles.criteriaIcon} /> : 
                                                <MdCheckCircleOutline style={styles.criteriaIconInvalid} />}
                                            Number
                                        </div>
                                        <div style={styles.criteriaItem}>
                                            {passwordStrength.hasSpecial ? 
                                                <MdCheckCircleOutline style={styles.criteriaIcon} /> : 
                                                <MdCheckCircleOutline style={styles.criteriaIconInvalid} />}
                                            Special character
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            {errors.password && (
                                <div style={styles.errorMessage}>
                                    <MdError style={styles.errorIcon} />
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password field */}
                        <div style={{
                            ...styles.inputGroup,
                            transitionDelay: isLoaded ? '0.9s' : '0s'
                        }}>
                            <div style={styles.passwordContainer}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    style={{
                                        ...inputStyle,
                                        borderColor: errors.confirmPassword ? '#f44336' : '#ddd'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = errors.confirmPassword ? '#f44336' : '#3F51B5'}
                                    onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? '#f44336' : '#ddd'}
                                />
                                <button
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={customStyles.passwordToggle}
                                    aria-label="Toggle confirm password visibility"
                                    onMouseOver={(e) => e.target.style.color = '#3F51B5'}
                                    onMouseOut={(e) => e.target.style.color = '#aaa'}
                                >
                                    {showConfirmPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <div style={styles.errorMessage}>
                                    <MdError style={styles.errorIcon} />
                                    {errors.confirmPassword}
                                </div>
                            )}
                        </div>

                        {/* Sign Up Button */}
                        <button 
                            style={{
                                ...customStyles.signupButton,
                                transitionDelay: isLoaded ? '1.1s' : '0s'
                            }}
                            onClick={handleSignUp}
                            onMouseOver={(e) => {
                                if (!isSigningUp) e.target.style.backgroundColor = '#303f9f';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                if (!isSigningUp) e.target.style.backgroundColor = '#3F51B5';
                                e.target.style.transform = 'translateY(0)';
                            }}
                            onMouseDown={(e) => e.target.style.transform = 'translateY(1px)'}
                            onMouseUp={(e) => e.target.style.transform = 'translateY(-2px)'}
                            disabled={isSigningUp}
                        >
                            <div style={styles.buttonContent}>
                                {isSigningUp ? (
                                    <div style={{
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        border: '3px solid rgba(255, 255, 255, 0.3)',
                                        borderTopColor: '#fff',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                ) : (
                                    'Sign Up'
                                )}
                            </div>
                        </button>

                        <div style={styles.loginText}>
                            Already have an account? {' '}
                            <span 
                                onClick={handleLoginClick}
                                style={customStyles.loginLink}
                                onMouseOver={(e) => {
                                    e.target.style.color = '#1a237e';
                                    e.target.style.textDecoration = 'underline';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.color = '#3F51B5';
                                    e.target.style.textDecoration = 'none';
                                }}
                            >
                                Login
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <div style={styles.modalOverlay} onClick={() => setShowSuccessModal(false)}>
                <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <div style={styles.successIcon}>✅</div>
                    <h3 style={styles.modalTitle}>Registration Successful!</h3>
                    <p style={styles.modalText}>
                        Your account has been created successfully. You'll be redirected to login in a moment...
                    </p>
                </div>
            </div>

            {/* CAPTCHA Verification Modal */}
            <div style={styles.modalOverlay} onClick={() => setShowCaptchaModal(false)}>
                <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <div style={styles.captchaModalContent}>
                        <h3 style={styles.modalTitle}>Verify You're Human</h3>
                        <p style={styles.modalText}>
                            Please enter the CAPTCHA below to complete your registration
                        </p>
                        
                        <div style={styles.captchaDisplay}>
                            {generatedCaptcha}
                            <button 
                                onClick={generateCaptcha}
                                style={styles.captchaRefresh}
                                aria-label="Refresh CAPTCHA"
                            >
                                🔄
                            </button>
                        </div>
                        
                        <input
                            type="text"
                            placeholder="Enter CAPTCHA"
                            value={captchaValue}
                            onChange={handleCaptchaChange}
                            style={{
                                ...styles.captchaInput,
                                borderColor: errors.captcha ? '#f44336' : '#ddd'
                            }}
                            onFocus={(e) => e.target.style.borderColor = errors.captcha ? '#f44336' : '#3F51B5'}
                            onBlur={(e) => e.target.style.borderColor = errors.captcha ? '#f44336' : '#ddd'}
                        />
                        
                        {errors.captcha && (
                            <div style={styles.errorMessage}>
                                <MdError style={styles.errorIcon} />
                                {errors.captcha}
                            </div>
                        )}
                        
                        <button 
                            style={{
                                ...styles.modalButton,
                                backgroundColor: '#3F51B5'
                            }}
                            onClick={handleCaptchaSubmit}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#303f9f'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#3F51B5'}
                        >
                            Verify & Sign Up
                        </button>
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