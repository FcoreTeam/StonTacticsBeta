import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import { setUserData, setUserSign } from "../../store/userSlice/userSlice";

import Page from '../page/Page';
import Canvas from '../canvas/Canvas';
import Grenades from '../grenades/Grenades';
import Saves from '../saves/Saves';
import Auth from '../auth/Auth';
import Profile from '../profile/Profile';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();
  const { isSignedIn } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    navigate("/strategy")
    if (isSignedIn) {
      fetchUserData(Cookies.get("accessToken"))
    }
    if (pathname === "/callback" && search !== "") {
      const [accessToken, refreshToken] = search
        .replace("?", "")
        .replace("accessToken=", "")
        .replace("refreshToken=", "")
        .split("&");
      fetchUserData(accessToken)
      if (accessToken !== null && refreshToken !== null) {
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);
        navigate("/profile")
      }
    }
  }, []);

  useEffect(() => {
    if (Cookies.get("accessToken") && Cookies.get("refreshToken")) {
      dispatch(setUserSign(true));
    } else {
      dispatch(setUserSign(false));
    }
  }, [Cookies.get("accessToken")])

  const fetchUserData = (accessToken) => {
    fetch(`${"http://localhost:8080"}/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then(res => res.json()).then((res) => {
      if (!!res) return
      dispatch(setUserData({ name: res.name, email: res.email, avatarUrl: res.avatar_url }))
    });
  }

  return (
    <Routes>
      <Route exact path="/" element={<Page />}>
        <Route path="/strategy" element={<Canvas />} />
        <Route path="/grenades" element={<Grenades />} />
        <Route path="/saves" element={<Saves />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
