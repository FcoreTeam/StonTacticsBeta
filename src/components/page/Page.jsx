import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";

import styles from './page.module.scss'

const Page = () => {
  return (
    <div className="page">
      <Header />
      <Outlet />
      {/* 10ая строка это внутренный роут в App.js */}
      <Footer />
    </div>
  );
};

export default Page;
