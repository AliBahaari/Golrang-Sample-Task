import toast from "react-hot-toast";

export const toastFire = (type: "success" | "error", text: string) => {
  if (type === "success") {
    toast.success(text, {
      duration: 4000,
      position: "bottom-right",
      iconTheme: {
        primary: "#FFF",
        secondary: "#4E937A",
      },
      className: "toast",
      style: {
        width: "200px",
        height: "30px",
        background: "#4E937A",
        color: "#FFF",
        fontSize: "14px",
        fontWeight: "bold",
        padding: "24px 10px",
      },
    });
  } else if (type === "error") {
    toast.error(text, {
      duration: 4000,
      position: "bottom-right",
      iconTheme: {
        primary: "#FFF",
        secondary: "#D32F2F",
      },
      className: "toast",
      style: {
        width: "200px",
        height: "30px",
        background: "#D32F2F",
        color: "#FFF",
        fontSize: "14px",
        fontWeight: "bold",
        padding: "24px 10px",
      },
    });
  }
};
