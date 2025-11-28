// Open DB
const request = indexedDB.open("NewsDB", 1);

request.onupgradeneeded = e => {
  const db = e.target.result;
  db.createObjectStore("images", { keyPath: "id" });
};

// Save image
function saveImage(file, id) {
  const reader = new FileReader();
  reader.onload = e => {
    const db = request.result;
    const tx = db.transaction("images", "readwrite");
    const store = tx.objectStore("images");
    store.put({ id: id, blob: e.target.result });
  };
  reader.readAsArrayBuffer(file);
}

// Upload to Cloudinary
const formData = new FormData();
formData.append("file", file);
formData.append("upload_preset", "your_preset");

const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
  method: "POST",
  body: formData
});
const data = await res.json();
const imageUrl = data.secure_url;
