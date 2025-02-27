import React, {useState, useContext} from "react";
import {AuthContext} from "context/AuthContext";
import {useNavigate} from "react-router-dom";
import "assets/login.css";

export default function Login() {
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignup = () => {
        navigate("/signup");
    }

    return (
        <div className="login-container">
            <h2>로그인 페이지</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">로그인</button>
            </form>
            <button onClick={handleSignup}>회원가입</button>
        </div>
    );
}
