//preview upload-avatar
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const updateImageInput = document.querySelector("[upload-image-input]");
  const updateImagePreview = document.querySelector("[upload-image-preview]");
  updateImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      updateImagePreview.src = URL.createObjectURL(file);
    }
  });
}
//ENd preview upload-avatar
