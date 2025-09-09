export default function CardWrapper({ children }) {
  return <div style={styles.card}>{children}</div>;
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
};
