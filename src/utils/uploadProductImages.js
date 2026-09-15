const CLOUD_NAME = 'urzzl9bu';
const UPLOAD_PRESET = 'Happy_Family_Review';

async function uploadOneImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) {
    throw new Error('Image upload failed.');
  }

  const data = await response.json();
  return data.secure_url;
}

export async function uploadProductImages(files) {
  const uploads = Array.from(files).map((file) => uploadOneImage(file));
  return Promise.all(uploads);
}