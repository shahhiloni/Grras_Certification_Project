
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/login.css";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Please enter your email address.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password) {
            newErrors.password = "Please enter your password.";
        } else if (formData.password.length < 8) {
            newErrors.password =
                "Your password must contain at least 8 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));

        setServerError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setServerError("");

        if (!validate()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "We couldn't sign you in. Please check your details."
                );
            }

            localStorage.setItem("adminToken", data.token);
            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

            navigate("/admin/dashboard");

        } catch (error) {
            setServerError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="admin-login-page">

            <div className="login-background-shape shape-one"></div>
            <div className="login-background-shape shape-two"></div>

            <section className="login-wrapper">

                {/* Brand / Welcome Section */}
                <div className="login-intro">

                <div className="brand-logo">
    <img
        src="/Assets/Grras-logo-white.png"
        alt="Grras Logo"
    />
</div>

                    <p className="eyebrow">
                        ADMIN PORTAL
                    </p>

                    <h1>
                        Welcome back.
                    </h1>

                    <p className="intro-text">
                        Sign in to securely manage your
                        dashboard, users and platform settings.
                    </p>

                    <div className="security-note">
                        <span className="security-icon">✓</span>

                        <div>
                            <strong>Secure access</strong>
                            <p>
                                Your account and information are
                                protected with secure authentication.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Login Card */}
                <div className="login-card">

                    <div className="login-heading">
                        <h2>Sign in</h2>

                        <p>
                            Enter your admin credentials to continue.
                        </p>
                    </div>

                    {serverError && (
                        <div className="alert-error" role="alert">
                            <span className="alert-icon">!</span>

                            <div>
                                <strong>Unable to sign in</strong>
                                <p>{serverError}</p>
                            </div>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >

                        {/* Email */}
                        <div className="input-group">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <div
                                className={`input-wrapper ${
                                    errors.email ? "input-error" : ""
                                }`}
                            >
                                <span className="input-icon">
                                    ✉
                                </span>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="admin@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    aria-invalid={!!errors.email}
                                />
                            </div>

                            {errors.email && (
                                <span className="field-error">
                                    {errors.email}
                                </span>
                            )}

                        </div>

                        {/* Password */}
                        <div className="input-group">

                            <div className="label-row">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="forgot-password"
                                    onClick={() => {
                                        alert(
                                            "Please contact your system administrator to reset your password."
                                        );
                                    }}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div
                                className={`input-wrapper ${
                                    errors.password
                                        ? "input-error"
                                        : ""
                                }`}
                            >
                                <span className="input-icon">
                                    🔒
                                </span>

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    aria-invalid={!!errors.password}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>

                            {errors.password && (
                                <span className="field-error">
                                    {errors.password}
                                </span>
                            )}

                        </div>

                        {/* Remember */}
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>
                                Keep me signed in
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Signing you in...
                                </>
                            ) : (
                                <>
                                    Sign in to dashboard
                                    <span>→</span>
                                </>
                            )}
                        </button>

                    </form>

                    <p className="login-footer">
                        Authorized administrators only.
                    </p>

                </div>

            </section>

        </main>
    );
};

export default Login;

