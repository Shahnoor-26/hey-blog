// Function to convert html into string
export const updateIntoStr = (htmlStr) => {
  try {
    if (!htmlStr) return "";
    const reader = new DOMParser();
    const document = reader.parseFromString(htmlStr, "text/html");
    return (document.body.textContent || "").trim();
  } catch (error) {
    console.error(error);
    return "";
  }
};

// Function to convert file into webp
export const updateIntoWebp = async (file, quality = 0.75) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);

          if (!blob) {
            return reject(new Error("Image WebP conversion failed!"));
          }

          const text = file.name.replace(/\.[^.]+$/, "") + ".webp";
          const webFile = new File([blob], text, {
            type: "image/webp",
          });

          resolve(webFile);
        },
        "image/webp",
        quality
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image Load Failed!"));
    };

    image.src = objectUrl;
  });
};

// Function to capitalize every words
export const capitalize = (str) => {
  if (typeof str !== "string" || !str.trim()) return "";

  return str
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
