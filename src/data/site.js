// period is optional: defaults to "12m" unless a smallcase overrides it (e.g. period: "10m")
export const DEFAULT_PERIOD = "12m";
 
export const SMALLCASES = [
  { name: "Zamzam Shariah Leaders Smart Beta", scid: "ZMZMSB_0001", risk: "Medium", ret: 24, link: "https://www.smallcase.com/smallcase/ZMZMSB_0001" },
  { name: "Zamzam Shariah Nifty 50 Smart Beta", scid: "ZMZMSB_0002", risk: "Low", ret: 18, period: "10m", link: "https://www.smallcase.com/smallcase/ZMZMSB_0002" },
  { name: "Zamzam Shariah New India Theme", scid: "ZMZMNM_0001", risk: "High", ret: 30, link: "https://www.smallcase.com/smallcase/ZMZMNM_0001" },
  { name: "Zamzam Shariah Auto & Ancillaries Tracker", scid: "ZMZMTR_0002", risk: "Low", ret: -9.1, link: "https://zamzamcapital.smallcase.com/smallcase/ZMZMTR_0002" },
  { name: "Zamzam Shariah Chemicals & Fertilizers Tracker", scid: "ZMZMTR_0003", risk: "Medium", ret: 22, link: "https://zamzamcapital.smallcase.com/smallcase/ZMZMTR_0003" },
  { name: "Zamzam Shariah Pharma & Healthcare Tracker", scid: "ZMZMTR_0004", risk: "Medium", ret: 26, link: "https://zamzamcapital.smallcase.com/smallcase/ZMZMTR_0004" },
];

export const COMPARISON_COLUMNS = [
  { label: "Zamzam New India Theme (High Growth)", retPerYear: "30.7%", fee: "Flat subscription fee", screen: "3-stage process", isUs: true },
  { label: "Zamzam Leaders Smart Beta (Balanced)", retPerYear: "25.4%", fee: "Flat subscription fee", screen: "3-stage process", isUs: true },
  { label: ["Tata ", <br key="br" />, " Ethical Fund"], retPerYear: "-9.8%", fee: "1-2% of investment + exit load", screen: "2-stage process", isUs: false },
  { label: "Taurus Ethical Fund", retPerYear: "-4.9%", fee: "1-2% of investment + exit load", screen: "2-stage process", isUs: false },
  { label: "Quantum Ethical Fund", retPerYear: "-3.1%", fee: "1-2% of investment + exit load", screen: "2-stage process", isUs: false },
];

export const TESTIMONIALS = [
  
  {
    quote: "I found the Shariah-based smallcase option to be such an easy way to get started in this domain, even for a novice like me. I just need to keep track of the rebalancing dates, which requires only a few minutes of my time. I can definitely see that the stocks have performed well through all the ups and downs of the market. Thank you for providing this platform!",
    name: "Samshed Begum",
    role: "AI Architect",
    city: "Bangalore",
    initials: "SB"
  },
  {
    quote: "Highly recommended. I have not only saved my capital but keep making good profits. Even in the most difficult market situation I am not worried as I know that Zamzam Capital market experts will guide me through this difficult phase and I will not be losing my capital (which is very important). I am with this plan almost a year and I am very much satisfied,and the support is always there from Saif bhai for any queries or doubts. In a nutshell I would say that I have found my path for halal investments in the share market and to earn good profits.  Thank you Zamzam Capital team and a special thanks to Saif bhai to bring this platform for retail investors like me.",
    name: "Mohammed Sami Bhati",
    role: "Structural Engineer",
    city: "Saudi Arabia",
    initials: "MSB"
  },
  {
    quote: "My experience with Zamzam Capital has been excellent. Earlier, I invested through mutual funds, where I could not clearly see the underlying stocks. With Zamzam Capital's smallcase portfolios, I can directly own and track Shariah-compliant stocks, which gives me greater transparency and confidence. Their Shariah Screener is also very useful for monitoring compliance. Overall, they have made Halal investing simple and accessible for me. JazakAllah Khair.",
    name: "Afif Ahmad",
    role: "Software Developer",
    city: "Noida",
    initials: "AA"
  },
  {
    quote: "I am delighted to see the availability in the market of brand new Shariah compliant investment strategies from Zamzam Capital, which have also delivered a positive outcome for me personally. I deeply thank them for this wonderful opportunity to invest in their smallcase portfolios and wish them good luck for their future strategies.",
    name: "Mohammed Muteeb Samad",
    role: "Travel Agent",
    city: "Hyderabad",
    initials: "MMS"
  },
  {
    quote: "I like the research done for the stocks they have chosen for their smallcase portfolios and also the returns we are getting. I am truly satisfied.",
    name: "Zoheb Qamar Ali Khan",
    role: "IT Professional",
    city: "Mumbai",
    initials: "ZQAK"
  },
  {
    quote: "I have been associated with Zamzam Capital for over a year now and have greatly benefited from their stock recommendation services. As a Muslim investor, navigating the stock market requires adhering to specific Shariah compliance criteria, and Zamzam Capital makes this process seamless. Beyond their excellent research, they have always answered all my queries promptly, providing the clarity needed to invest with peace of mind. Their initiative to publish the Shariah-compliant stock list for free on their website is a massive service to the community. I strongly believe that if Halal options are made easily available, people will naturally move away from non-Halal products. Zamzam Capital is empowering the community to come forward, invest in equity, and finally be a part of India’s success story.",
    name: "Mohiuddin Nizami",
    role: "Sr. Software Engineer",
    city: "Hyderabad",
    initials: "MN"
  },
  {
    quote: "I like Zamzam Capital’s smallcases very much. I have trust in them given my long relationship with Zamzam Capital. Since I am getting more than expected returns, I now regret and wish I had invested a larger amount in their smallcases. Thus, now I have decided to disinvest in my mutual fund investments and transfer my funds to their smallcase portfolios.",
    name: "Anwar Momin",
    role: "Businessman",
    city: "Latur (Maharashtra)",
    initials: "AM"
  },
  {
    quote: "I have found Zamzam Capital’s smallcase product to be good and up to the mark. They provide timely updates, for example, the immediate rebalance they issued recently for exiting from Reliance Industries in our smallcase, immediately after it was declared as non-compliant in their latest Halal list was much appreciated. Even though I have only recently subscribed to their smallcases, the results even with all the market fluctuations and negative news have been good. I look forward to a long association with them.",
    name: "Jameeludeen",
    role: "Private Sector",
    city: "Viluppuram (Tamil Nadu)",
    initials: "J"
  },
  
  {
    quote: "My overall experience investing through Zamzam Capital’s smallcase portfolios has been exceptional. What I like most is how simple and accessible they have made ethical investing without compromising on returns. Today, even when the broader market is underperforming, Zamzam’s smallcases have done the exact opposite—surpassing expectations and staying way out front in terms of returns. Given these fantastic results, the peace of mind, and the excellent support, I highly recommend Zamzam Capital to anyone looking for authentic Shariah-compliant and ethical investment options.",
    name: "Ashad Al Haq",
    role: "Public Sector",
    city: "Khairagarh (Chhattisgarh)",
    initials: "AAH"
  },
  {
    quote: "First of all, I thank almighty Allah and Zamzam Capital for their guidance to invest in Halal investment portfolios through smallcase. Zamzam Capital's response towards any queries was quick and they give good guidance. Though I started investing late, I hope in future to invest in their other model portfolios also. I look forward to them releasing single sector smallcase portfolios, e.g. automobile/pharma and also any other future worthy investment plans from Zamzam Capital’s team.",
    name: "Khaleel Ahmed",
    role: "Businessman",
    city: "Mangalore",
    initials: "KA"
  },
    {
    quote: "The Zamzam team is doing great job in research work and is making good moves and only getting better with time. I have noticed how their stock recommendations have performed resiliently even during the tough market conditions and you all are doing an excellent job in suggesting companies. I have benefited a lot following your advice; may Allah SWT grant your team the means to reach and benefit maximum people who are left behind from financial independence, merely because of lack of proper knowledge and unavailability of authentic sources of Islamic investments.",
    name: "Salma Ghouse",
    role: "Housewife",
    city: "UAE",
    initials: "SG"
  },
  {
    quote: "I have been using Zamzam Capital’s services for a while now, and I am extremely impressed with their dedication to Shariah-compliant investing. Their rigorous screening process gives me complete peace of mind, knowing my portfolio aligns strictly with Islamic principles. On top of their ethical framework, their market expertise is outstanding. The trading calls they provide are incredibly timely and precise, complete with clear entry price ranges, realistic targets, and strict stop-loss levels. Highly recommended for any investor looking for ethical, well-researched, and actionable market guidance.",
    name: "Mohammed Ajmal",
    role: "IT Professional",
    city: "Noida",
    initials: "MA"
  }
];

export const NAV_LINKS = [
  { id: "plan", label: "Financial Freedom" },
  { id: "comparison", label: "Comparison" },
  { id: "smallcases", label: "Smallcases" },
  { id: "calc", label: "Calculator" },
  { id: "about", label: "About Saif" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQs" },
  { id: "contact", label: "Contact" },
];

export const CALC_SCENARIOS = [
  [14, "Low risk"],
  [21, "Medium risk"],
  [30, "High risk"],
];
