import Image from "next/image";
import styles from "./page.module.css";
import Nav from "@/components/nav/Nav";
import NavLogin from "@/components/nav-login/Nav-login";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <main className={styles.main}>
        <NavLogin/>
        <Hero/>
    </main>
  );
}
