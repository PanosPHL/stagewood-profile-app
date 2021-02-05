export const toBase64 = (file: File | undefined) => {
  const imgRegex = /\.(jpg|png)/;
  if (!file || !imgRegex.test(file.name)) {
    throw new Error('Please upload an image file');
  } else {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
};
