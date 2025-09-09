import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        {/* Left side: App title */}
        <div style={styles.logo}>📝 TODOLIST APP</div>

        {/* Right side: Links */}
        <div style={styles.links}>
          <Link to="/" style={styles.link}>🏠 Home</Link>
          <Link to="/edit/1" style={styles.link}>✏️ Edit</Link>
        </div>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    background: "#2c3e50",
    padding: "10px 20px",
    width: "100vw",        // full screen width
    boxSizing: "border-box",
    position: "fixed",     // stick to top
    top: 0,                // align at very top
    left: 0,
  },
  nav: {
    display: "flex",
    justifyContent: "space-between", // logo left, links right
    alignItems: "center",
    maxWidth: "1400px",
    margin: "10px auto",
    flexWrap: "wrap",
  },
  logo: {
    flex: 2,
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "55px",
    flexWrap: "wrap",
    marginLeft: "auto",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
  },
};
