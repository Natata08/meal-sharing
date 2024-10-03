import styles from "./Header.module.css";
import Navbar from "@/components/ui/Navbar";

export default function Header() {
  return (
    <header className={styles.mainHeader}>
      <Navbar />
    </header>
  );
}
