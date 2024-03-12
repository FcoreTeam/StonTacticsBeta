import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./profile.module.scss";

import userDefault from "../../img/icons/persona.svg";

const Profile = () => {
  const { isSignedIn, name, email, avatarUrl } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/auth");
    }
  }, []);

  return (
    <div className={styles.profile__wrapper}>
      <section className={styles.profile}>
        <div className={styles.profile__header}>
          <div className={styles.pro__status}>
            <p className={styles.pro__text}>
              Аккаунт <span className={styles.pro}>PRO</span>
            </p>
          </div>
        </div>

        <img
          src={avatarUrl ? avatarUrl : userDefault}
          alt=""
          className={styles.user__image}
        />
        <p className={styles.username}>{name}</p>
      </section>
    </div>
  );
};
export default Profile;
