// English is first = default. Fill in the other links later; empty urls are hidden.
export const VIDEOS = {
  yusuf: {
    title: "Yusuf's Story",
    items: [
      { lang: "English", url: "https://youtube.com/shorts/bxUOy1jiziA" },
      { lang: "Hindi",   url: "https://youtube.com/shorts/e6pdeUtNxF4" },
      { lang: "Malayalam",   url: "https://youtube.com/shorts/EgCrzur8vys" },
      { lang: "Tamil",  url: "https://youtube.com/shorts/F_L_ak7jhUM" },
    ],
  },
  subscribe: {
    title: "How to subscribe and invest in smallcase",
    items: [
      { lang: "English", url: "https://youtube.com/shorts/F_L_ak7jhUM" },
      { lang: "Hindi",   url: "https://youtube.com/shorts/48rVE2u6JQ0" },
      { lang: "Malyalam",   url: "https://youtube.com/shorts/ocYB-t-Hubc" },
      { lang: "Tamil",  url: "https://youtube.com/shorts/4Jq5xfJioUg" },
    ],
  },
};

export const ytId = (url = "") => {
  const m = url.match(/(?:shorts\/|v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
};
