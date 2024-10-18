import axios from "axios";

const baseaxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,  // Ensure this base URL is correct
  headers: {
    "X-OCR-SECREAT": import.meta.env.VITE_API_OCR_KEY,  // The OCR key goes here
  },
  withCredentials: true,
});

export const postImage = async (imageBlob) => {

  console.log("imageBlob: ", imageBlob);

  const formData = new FormData();
  formData.append(
    "message",
    JSON.stringify({
      images: [{ format: "png", name: "demo" }],
      requestId: "guide-demo",
      version: "V2",
      timestamp: Date.now().toString(),
    })
  );
  formData.append("file", imageBlob);

  try {
    // Send the FormData with Axios
    const response = await baseaxios.post("", formData); 
    return response;
  } catch (error) {
    console.log("Error sending file: ", error);
  }
};


export const base64ToBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: contentType });
  };
  