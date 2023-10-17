import Swal from "sweetalert2";

const handleShareClick = (videoId) => {
  navigator.clipboard
    .writeText("http://localhost:3000/watching/" + videoId)
    .then(() =>
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Video URL copied to clipboard",
        showConfirmButton: false,
        timer: 1500,
      })
    )
    .catch(() =>
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to copy video URL",
        showConfirmButton: false,
        timer: 2000,
      })
    );
};

export default handleShareClick;