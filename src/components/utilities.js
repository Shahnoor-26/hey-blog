export const converter = (htmlStr) => {
  try {
    if (!htmlStr) return "";
    const reader = new DOMParser();
    const document = reader.parseFromString(htmlStr, "text/html");
    return document.body.textContent || "";
  } catch (error) {
    console.log(error);
  }
};
