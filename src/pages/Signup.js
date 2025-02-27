import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {signupService} from "services/userService";
import "assets/signup.css";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [tel, setTel] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signupService(email, password, username, tel);
            alert("회원가입 되었습니다.");
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    const toLogin = () => {
        navigate("/login");
    }

    return (
        <div className="signup-container">
            <h2>회원가입 페이지</h2>
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
                <input
                    type="text"
                    placeholder="사용자명"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="전화번호"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                />
                <button type="submit">회원가입</button>
            </form>
            <button onClick={toLogin}>로그인 하러가기</button>
        </div>
    );
};