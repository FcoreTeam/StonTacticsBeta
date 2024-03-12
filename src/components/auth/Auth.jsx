import clsx from "clsx";

import googleIcon from "../../img/icons/google-icon.svg";
import appleIcon from "../../img/icons/apple-icon.svg";
import vkIcon from "../../img/icons/vk-icon.svg";

import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const { isSignedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/profile");
    }
  }, []);

  return (
    <div className={clsx(styles.auth__wrapper, "flex-column")}>
      <h2>ВЫБЕРЕТЕ СПОСОБ АВТОРИЗАЦИИ</h2>
      <Link
        to="http://localhost:8080/auth/google"
        className={clsx(styles.auth__type, "flex-center")}
        // onClick={() => dispatch(setUserSign(true))}
      >
        <img src={googleIcon} alt="" />
        Google
      </Link>
      <a href="" className={clsx(styles.auth__type, "flex-center")}>
        <img src={appleIcon} alt="" />
        Apple
      </a>
      <a
        href=""
        className={clsx(styles.auth__type, styles.type__vk, "flex-center")}
      >
        <img src={vkIcon} alt="" />
        VKontakte
      </a>
    </div>
  );
};

export default Auth;
