import React, { useState } from "react";
import BigButton from "../../../utils/buttons/BigButton";
import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";
import Basicinput from "../../../utils/input/Basicinput";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth, login } from "../../../services/auth";
import { useLogin } from "../../../hooks/authHook";
import FailAlert from "../../../utils/Alert/FailAlert";
import { validateEmail } from "../../../utils/CommonFunction";

export default function Login({ isOpen, setModal }) {
    const [formValues, setFormValues] = useState({
        password: "",
        email: "",
    });
    const { mutate, isPending, isError, error } = useLogin();

    const handleOverlayClick = (event) => {
        // Close modal only if clicking on the overlay, not the modal content
        if (event.target === event.currentTarget) {
            setModal(false);
        }
    };

    function handleClick(e) {
        e.preventDefault();
        mutate({ email: formValues.email, password: formValues.password, onClose: () => setModal(false) });
    }

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
            className="modal-overlay div-center-justify-center"
            onClick={handleOverlayClick}
        >
            <div className="modal-content px-[30px!important]">
                <form onSubmit={handleClick}>
                    {isError && <FailAlert title={error} />}
                    <h2 className="large-text-large-weight mx-[0px!important]" >Log In</h2>
                    <div className="my-2">
                        <a>
                            By continuing, you agree to our{" "}
                            <span className={'accent-text-style cursor-pointer '}>
                                User Agreement
                            </span>{" "}
                            and acknowledge that you understand the{" "}
                            <span className={'accent-text-style cursor-pointer '}>
                                Privacy Policy
                            </span>{" "}
                            .
                        </a>
                    </div>
                    <BigButton
                        Icon={FcGoogle}
                        onClick={googleLogin}
                        title={"Continue With google"}
                        className={'secondary-bg primary-text my-3 rounded-3xl w-full'}
                    />
                    <BigButton
                        Icon={FaMeta}
                        title={"Continue With Meta"}
                        className={'secondary-bg primary-text my-3 rounded-3xl w-full'}
                    />
                    <div
                        className="div-center-justify-center my-3"
                    >
                        <div className="divider-bottom w-[100%]" />
                        <span className="mx-3" >OR</span>
                        <div className="divider-bottom w-[100%]" />
                    </div>
                    <Basicinput
                        placeHolder={"Email"}
                        // className={'my-5'}
                        value={formValues.email}
                        validationFunc={validateEmail}
                        setFormValues={setFormValues}
                        name="email"
                    />
                    <Basicinput
                        placeHolder={"Password"}
                        value={formValues.password}
                        setFormValues={setFormValues}
                        name="password"
                        className={'my-5'}
                        type={'password'}
                    />
                    <div className="my-3" >
                        <span className={'accent-text-style cursor-pointer '}>
                            Forgot password?
                        </span>
                    </div>
                    <div className="mb-7" >
                        <a>New to Reddit? </a>
                        <span className={'accent-text-style cursor-pointer '}>Sign Up</span>
                    </div>
                    {/* Loading Spinner or Text */}
                    <BigButton
                        onClick={handleClick}
                        title={"Log in"}
                        type={"submit"}
                        className={`w-full rounded-[50px!important] ${isLoginDisabled ? 'bg-[var(--divider)]' : 'bg-[var(--teritory)]'}`}
                        disabled={isLoginDisabled}
                        loading={isPending}
                    />
                </form>
            </div>
        </div>
    );
}
