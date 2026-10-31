import React, { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What does Zamzam Capital do?',
      a: 'Zamzam Capital is a SEBI Registered Research Analyst Firm, founded by Mr. Saif Ahmed. Considered to be the No. 1 Shariah-compliant Research Analyst Firm in the Indian market today, Zamzam Capital specializes in providing ethical investors with Shariah-compliant stocks and portfolios curated from our own proprietary "Halal Stocks List" while being compliant with SEBI regulations. Our approach combines both fundamental & technical analysis, guided by best practices from leading experts in India and worldwide, helping investors build wealth without compromising on values. With Zamzam Capital, you can invest with confidence, knowing your portfolio is both ethically sound and financially robust.'
    },
    {
      q: 'Are we SEBI registered?',
      a: 'Yes, we are SEBI registered.'
    },
    {
      q: 'What are the services offered by Zamzam Capital?',
      a: 'We offer two types of services – Model Portfolios through smallcase and Swing Trading recommendation services called Stock Plans.'
    },
    {
      q: 'How many stocks are there in our smallcase portfolio basket?',
      a: 'Our smallcase portfolio basket consists of an average of 20 to 25 stocks. However, depending on market factors and valuation comfortability, the number of holdings in any of our smallcases may vary. \n\nFor example, our Zamzam Shariah New India Theme portfolio is a thematic portfolio that consists of 18 mid & small-cap companies that are based in new age industries such as EV, solar, aerospace, biotechnology, semiconductors, etc. and are potential multi-baggers.'
    },
    {
      q: 'What is a smallcase?',
      a: 'A smallcase is a curated basket of stocks/ETFs* that reflects a certain objective (ideas, themes, strategies), backed by the research of the smallcase manager. You can invest in a smallcase in 2 clicks.\n\n*ETFs (Exchange Traded Funds) are baskets of securities that track an underlying index (Nifty, Gold, etc) and can be bought and sold on the exchange.'
    },
    {
      q: 'How do I track my smallcases?',
      a: 'When you buy a smallcase, the index value is set to 100 on the buy day - this helps you track the total returns without having to monitor each stock. You can also use the performance metrics to get a more detailed understanding of your smallcase.'
    },
    {
      q: 'Are there lock-in periods?',
      a: 'There are no lock-in periods, so you may sell your smallcases anytime. As a concept however, smallcases work best when used for long-term investing.'
    },
    {
      q: 'How often we do the rebalance?',
      a: 'The rebalance is done on a monthly basis except for the Zamzam Shariah Nifty 50 Smart Beta smallcase, which is done on a quarterly basis. The client gets a email 7-10 days prior to the date of rebalancing. In some cases, if any stock’s fundamentals change rapidly, or if the Shariah-compliance changes suddenly in between our Shariah screening intervals, we will have to push the rebalance overnight.'
    },
    {
      q: 'What is the fee structure?',
      a: 'Currently, we are offering 3 months, 6 months and 12 months plans for our smallcases. The relevant weblink for our fee structure is as below: \n\nhttps://zamzamcapital.smallcase.com/'
    },
    {
      q: 'What is the process for subscription?',
      a: 'The client needs to follow the following process:\n1. Visit the relevant smallcase page or our smallcase microsite https://zamzamcapital.smallcase.com/\n2. Reach out to us directly on call or email if you have any questions before proceeding\n3. Fill in your personal details\n4. Select your broker\n5. Make the payment'
    },
    {
      q: 'Will shares of the portfolio be linked to the client’s Demat account?',
      a: 'Once the client has subscribed to the smallcase and has made the minimum investment into the portfolio. The relevant stocks will be reflected on your Demat account that very second. The timing and buying is 100% at the discretion of the investor.'
    },
    {
      q: 'I have used a promo code, however, the smallcase’s final cost is still showing the full amount.',
      a: 'At the time of making the payment, the screen will show the full amount. However, post-payment only the net amount will be deducted from the bank account. The client can also refer to the invoice which will be sent to their registered email.'
    },
    {
      q: 'Is it mandatory to invest the minimum amount every month?',
      a: 'We preach beginning the investment with a minimum amount and then eventually increasing the portfolio size through SIPs that can be made on any frequency at no further cost to the investor. However, it is not mandatory to invest any amount a month.'
    },
    {
      q: 'Is the subscription amount a part of the minimum investment value?',
      a: 'Subscription fee is an advisory fee that we charge from the client. To make the investment, the client separately needs to add the funds for the minimum investment.'
    },
    {
      q: 'What will happen to the client’s account in case there is no renewal after the expiry of the product?',
      a: 'The client will get an email/phone notification from smallcase for the renewal. In case the client don’t intend to renew the product, he/ she will not receive the rebalance update and other notifications from smallcase. However, the client will have full control on their portfolio.'
    },
    {
      q: 'Are there any hidden cost/ extra charge by Zamzam Capital?',
      a: 'Zamzam Capital only charges the subscription fees as an advisory fees from the clients. There are no hidden cost/ extra charge to be paid nor deducted. The other charges are related to depository charges and capital gains tax which is not in our purview.'
    },
    {
      q: 'Can a client exit the portfolio anytime? Does Zamzam Capital charge anything at the time of exit?',
      a: 'Yes, the client can exit the portfolio anytime. There will not be any charge at the time of exit.'
    },
    {
      q: 'How is the renewal process?',
      a: 'At the time of initial subscription, the client can opt for auto renewal or manual renewal option. Under the auto renewal, the amount for subscription will automatically get deducted from the bank account. In case of manual renewal, the client had to pay a requisite amount for the renewal and to continue the service.'
    },
    {
      q: 'Can the client change/ shift the broker?',
      a: 'Unfortunately, the client would not be able to change the broker ID in case the client has already invested. However, the client can subscribe using the new broker ID and make a fresh investment.'
    }
  ];
  
  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <>
      <style>{`
        .zz-faq-section {
          background-color: #ffffff;
          text-align: center;
        }

        .faq-section-title {
          font-size: 2.5rem;
          color: #111827;
          letter-spacing: -0.5px;
          text-align: center;
        }

        .faq-accordion {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }

        .faq-item {
          border: 1px solid #e5e7eb;
          background: #ffffff;
          border-radius: 12px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
        }

        .faq-item-open {
          border-color: #0fa978;
          box-shadow: 0 4px 16px rgba(15, 169, 120, 0.08);
        }

        .faq-question {
          width: 100%;
          padding: 18px 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 16px;
          text-align: left;
        }

        .faq-question-text {
          color: #0fa978;
          font-size: 16px;
          font-weight: 600;
        }

        .faq-toggle-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #0fa978;
          color: #0fa978;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          line-height: 1;
          flex-shrink: 0;
          justify-self: end;
        }

        .faq-answer {
          font-size: 15px;
          line-height: 1.7;
          padding: 0 24px 20px 24px;
          color: #6b7280;
          text-align: left;
          white-space: pre-line; /* <--- THIS FIXES THE \n AND \n\n NEWLINE RENDERING */
        }

        @media (max-width: 576px) {
          .faq-section-title {
            font-size: 2rem;
          }
          .faq-question {
            padding: 14px 16px;
          }
          .faq-answer {
            padding: 0 16px 16px 16px;
          }
        }
      `}</style>

      <section className="zz-faq-section py-5" id="faq">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="faq-section-title fw-extrabold mb-4">
            FAQs
          </h2>
          <div className="faq-accordion">
            {faqs.map((f, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx} 
                  id={`faq-item-${idx}`}
                  className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">
                      {idx + 1}. {f.q}
                    </span>
                    <span className="faq-toggle-icon">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="faq-answer">
                      <p className="mb-0">
                        {f.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}