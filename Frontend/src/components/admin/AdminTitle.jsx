const AdminTitle = ({ text1, text2 }) => {
  return (
    <h1 className="font-semibold text-xl" style={{ color: "#ffffff" }}>
      {text1}{" "}
      <span
        style={{
          color: "#a855f7",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        }}
      >
        {text2}
      </span>
    </h1>
  );
};

export default AdminTitle;
