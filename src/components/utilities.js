// Function to return blob promise
const toBlobAsync = (canvas, type, quality) =>
  new Promise((resolve) => canvas.toBlob(resolve, type, quality));

// Function to convert html into string
export const updateIntoStr = (htmlStr) => {
  try {
    if (!htmlStr) return "";
    const reader = new DOMParser();
    const document = reader.parseFromString(htmlStr, "text/html");
    return (document.body.textContent || "").trim();
  } catch (error) {
    console.log(`website service error: ${error.message}`);
    return "";
  }
};

// Function to capitalize every words
export const capitalize = (str) => {
  try {
    if (typeof str !== "string" || !str.trim()) return "";

    return str
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } catch (error) {
    console.log(`website service error: ${error.message}`);
    return "";
  }
};

// Function to convert iso into string
export const updateISO = (iso) => {
  try {
    if (typeof iso !== "string" || !iso.trim()) return "";

    return new Date(iso).toLocaleDateString("en-GB");
  } catch (error) {
    console.log(`website service error: ${error.message}`);
    return "";
  }
};

// Function to convert other image into web image
export const updateIntoWebp = async (file, quality = 0.75) => {
  const image = new Image();
  const objectUrl = URL.createObjectURL(file);

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = objectUrl;
  });

  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);

  const blob = await toBlobAsync(canvas, "image/webp", quality);
  URL.revokeObjectURL(objectUrl);

  if (!blob) {
    throw new Error("Image WebP conversion failed!");
  }

  const webFile = new File(
    [blob],
    file.name.replace(/\.[^.]+$/, "") + ".webp",
    {
      type: "image/webp",
    }
  );

  return webFile;
};
