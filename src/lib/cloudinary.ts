export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  if (!cloudName || !uploadPreset || cloudName.trim() === '' || uploadPreset.trim() === '') {
    console.warn('Cloudinary environment variables are missing, falling back to base64 encoding.');
    return getBase64(file);
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error('Cloudinary upload failed with status:', response.status);
      console.warn('Falling back to base64 encoding.');
      return await getBase64(file);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload threw an error:', error);
    console.warn('Falling back to base64 encoding.');
    return await getBase64(file);
  }
}
