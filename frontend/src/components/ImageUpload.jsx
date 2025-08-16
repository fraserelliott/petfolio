import { useState, useRef } from "react";
import api from "../api";
import { useToast } from "../contexts/ToastContext";
import { extractErrorMessage } from "../utils/errorUtils";

// Expected props: onUpload, onDelete, width, height
export function ImageUpload(props) {
  const [src, setSrc] = useState("");
  const { addToastMessage } = useToast();
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    api
      .post("/api/upload", formData)
      .then((res) => res.data)
      .then((data) => {
        setSrc(data.url);
        if (props.onUpload)
          props.onUpload(data.url);
      })
      .catch((error) => addToastMessage(extractErrorMessage(error), "error"));
  };

  const handleDelete = (e) => {
    setSrc("");
    if (props.onDelete)
      props.onDelete();
    if (inputRef.current)
      inputRef.current.value = "";
  };

  return (
    <div
      style={{
        ...styles.uploadContainer,
        backgroundImage: src ? `url(${src})` : "none",
        width: props.width || "200px",
        height: props.height || "200px",
      }}
    >
      {src && (
        <span style={styles.deleteBtn} onClick={handleDelete}>
          🗑️
        </span>
      )}
      {!src && <span style={styles.uploadText}>+</span>}
      <input
        ref={inputRef}
        style={styles.uploadInput}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}

const styles = {
  uploadContainer: {
    position: "relative",
    backgroundColor: "rgba(200, 200, 200, 0.2)",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    border: "2px dashed #ccc",
    borderRadius: "1em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadInput: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    cursor: "pointer",
    zIndex: 1,
  },
  deleteBtn: {
    position: "absolute",
    top: "0.5em",
    right: "0.5em",
    cursor: "pointer",
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 240, 0.7)",
    border: "var(--glass-border)",
    borderRadius: "3px",
  },
  uploadText: {
    zIndex: 2,
    fontSize: "2em",
  },
};
