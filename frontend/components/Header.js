import styles from "./Header.module.css";
import Navbar from "@/components/Navbar";

export default function Header() {
  return (
    <header className={styles.mainHeader}>
      <Navbar />
    </header>
  );
}
