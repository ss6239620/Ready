import React, { useState } from "react";
import { darkColorTheme } from "../../../constant";
import BigButton from "../../../utils/buttons/BigButton";
import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";
import Basicinput from "../../../utils/input/Basicinput";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth, login } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../../Context/UserContext'

export default function Login({ isOpen, setModal }) {
    const [formValues, setFormValues] = useState({
        password: "",
        email: "",
    });
    const { setUser } = useUser()
    const [error, setError] = useState('')

    function handleClick(params) {
        login(formValues.email, formValues.password)
            .then((res) => {
                setUser(res.data.data);
                localStorage.setItem("user", JSON.stringify(res.data.data));

                setModal(false)
                window.location.reload()
            }).catch((err) => {
                setError(err.response.data.error)
            })
    }

    const handleOverlayClick = (event) => {
        // Close modal only if clicking on the overlay, not the modal content
        if (event.target === event.currentTarget) {
            setModal(false);
        }
    };

    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                console.log(authResult.code);
                const result = await googleAuth(authResult.code);
                console.log(result.data.data.user);
                alert("successfuly logged in");
            } else {
                console.log(authResult);
                throw new Error(authResult);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    if (!isOpen) return null;

    const isLoginDisabled = !formValues.email || !formValues.password;

    return (
        <div
            className="modal-overlay"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={handleOverlayClick}
        >
            <div className="modal-content" style={{}}>
                <div style={{ paddingInline: 30 }}>
                    <h2 style={{ marginBlock: 10 }}>Log In</h2>
                    <div>
                        <a>
                            By continuing, you agree to our{" "}
                            <span style={{ color: "#648EFC", cursor: "pointer" }}>
                                User Agreement
                            </span>{" "}
                            and acknowledge that you understand the{" "}
                            <span style={{ color: "#648EFC", cursor: "pointer" }}>
                                Privacy Policy
                            </span>{" "}
                            .
                        </a>
                    </div>
                    <BigButton
                        Icon={FcGoogle}
                        onClick={googleLogin}
                        title={"Continue With google"}
                        style={{ background: "#fff", color: "black", marginBlock: 10 }}
                    />
                    <BigButton
                        Icon={FaMeta}
                        title={"Continue With Meta"}
                        style={{ background: "#fff", color: "black", marginBlock: 10 }}
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBlock: 10,
                        }}
                    >
                        <div style={{ border: "1px solid #FFFFFF19", width: "100%" }} />
                        <span style={{ marginInline: 10 }}>OR</span>
                        <div style={{ border: "1px solid #FFFFFF19", width: "100%" }} />
                    </div>
                    <Basicinput
                        placeHolder={"Email"}
                        style={{ marginBlock: 20 }}
                        value={formValues.email}
                        setFormValues={setFormValues}
                        name="email"
                    />
                    <Basicinput
                        placeHolder={"Password"}
                        value={formValues.password}
                        setFormValues={setFormValues}
                        name="password"
                        style={{ marginBlock: 20 }}
                    />
                    {error && <p style={{ margin: 0, padding: 0, textAlign: 'center', color: 'red' }}>{error}</p>}
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                        <span style={{ color: "#648EFC", cursor: "pointer" }}>
                            Forgot password?
                        </span>
                    </div>
                    <div style={{ marginBottom: 30 }}>
                        <a>New to Reddit? </a>
                        <span style={{ color: "#648EFC", cursor: "pointer" }}>Sign Up</span>
                    </div>
                    <BigButton
                        onClick={handleClick}
                        title={"Log in"}
                        style={{ borderRadius: 50, background: isLoginDisabled ? 'grey' : 'red' }}
                        disabled={isLoginDisabled}
                    />
                </div>
            </div>
        </div>
    );
}
