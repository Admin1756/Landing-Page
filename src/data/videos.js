// English is first = default. Fill in the other links later; empty urls are hidden.
export const VIDEOS = {
  yusuf: {
    title: "Yusuf's Story",
    items: [
      { lang: "English", url: "https://youtube.com/shorts/bxUOy1jiziA" },
      { lang: "Hindi",   url: "" },
      { lang: "Tamil",   url: "" },
      { lang: "Telugu",  url: "" },
    ],
  },
  subscribe: {
    title: "How to subscribe and invest in smallcase",
    items: [
      { lang: "English", url: "https://youtube.com/shorts/F_L_ak7jhUM" },
      { lang: "Hindi",   url: "" },
      { lang: "Tamil",   url: "" },
      { lang: "Telugu",  url: "" },
    ],
  },
};

export const ytId = (url = "") => {
  const m = url.match(/(?:shorts\/|v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
};
