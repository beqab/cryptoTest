import * as React from "react";
import {Collapse} from "react-collapse";
import {List} from "../list/List";
import {useState} from "react";
// @ts-ignore
import HTMLRenderer from "react-html-renderer";

export interface IPageFaqProps {}

export interface ICollapseListItem {
    body: string;
    header: string;
}

const faqItems: ICollapseListItem[] = [
    {
        header: "How to Register on CryptoIEX",
        body: `
        Please visit <b>CryptoIEX</b> official website and click the <b>Sign Up</b> button on the top right-hand side
On the registration page, please follow the on-screen instructions and insert the email address and password that you’ll use for your account <br>
Please, read the TOU carefully and click Sign Up button
We will now send you a confirmation email to the address you’ve specified. Please check your inbox to confirm your registration <br>
Once you receive the confirmation email, please click on the <b>Verify Email </b>button to confirm your registration <br>
Notice: For your own account security, make sure to enable two-factor authentication (2FA) after your first login
        `,
    },
    {
        header: "How to Complete Identity Verification?",
        body: `
        Visit the CryptoIEX website and LogIn to account, go to the <b>Verification </b> page
For verification, you will need to provide three types of files: your identity document, your picture with ID card, document proving your address of residence <br>
Depending on the country where your ID documents were issued, please choose a valid ID type (passport, ID card, or driver’s license) <br>
- Take a photo of your passport/ID Card information page with your webcam or upload the document picture from your computer  <br>
- Upload a picture of yourself with the identity document <br>
- Upload  document proving your address of residence and click the <b>Send</b> button<br>
After completing the process, please wait with patience. We will do our best to review your data in a timely manner <br>  Once your application has been verified, we will send you an email notification <br>
        `,
    },
    {
        header: "How to deposit funds with credit or debit card?",
        body: `
          
           CryptoIEX provides you with a great opportunity to buy crypto with a payment card <br> You can make a deposit in a few clicks using your Visa or Mastercard debit or credit card and purchase cryptocurrencies whenever you want <br>
Payment can be made in any local currency — just make sure your card allows for international transactions. The amount you pay will be converted to the deposit currency you select on CryptoIEX at your bank’s current exchange rate  <br>
When you make a card deposit for the first time, you need to link your card to your CryptoIEX account. It takes a few minutes on the <b>Verification </b> page
Click the Deposit button on the <b>Wallet</b> page next to the currency you want to deposit or in the top right corner of any page on the CryptoIEX website <br>
- Choose the Payment card method <br>
- Select the currency you want to deposit and enter the amount <br>
- Make sure to check the Total amount to see how much you’ll be charged, including fees <br>
- Click on the card you want to use <br>
- Accept the Terms of Use and Refund Policy <br>
- Double-check the information you’ve entered and click <b> Deposit</b> <br>
In a few minutes, you’ll receive an email from CryptoIEX confirming a successful deposit. Now you can start using your balance to buy crypto

            `,
    },
    {
        header: "How to withdraw funds to your credit or debit card?",
        body: `
          
        With CryptoIEX , you can sell your crypto for fiat currency and withdraw it to your verified bank card in a few clicks. If you haven’t yet used your Visa or Mastercard credit/debit card on CryptoIEX, you’ll need to link it to your CryptoIEX account <br>
Once you’ve connected a card to your CryptoIEX account, you can make fiat withdrawals in a few clicks 
To do so, go to the <b> Wallet </b>page and click on the Withdrawal button next to the currency you want to withdraw. You can also use the Withdraw button in the top right corner of any page on the CryptoIEX website
Then: <br>
- Choose the Payment card method <br>
- Enter the amount you would like to withdraw <br>
- Make sure to check the Total amount to see what funds will be sent to your card after deducting fees <br>
- Click on the card you want to use or choose to Add a new card <br>
- Then, accept the Terms of Use and Refund Policy <br>
- Double-check the information you’ve entered and click Withdrawal <br>
You’ll receive an email to the address connected with your CryptoIEX account confirming your withdrawal request 
When making withdrawals, pay attention to your daily and monthly limits. You can find your account limits on the <b>Balance </b> page in the bottom right corner or by going to the <b>Fees</b> page.


            `,
    },
    {
        header: "How to deposit funds with bank transfer?",
        body: `
          
          Deposits to CryptoIEX via bank transfer are fast and practical<br>
We accept payment via SEPA (EUR only, available in Europe Union) <br>
Click the Deposit button on the <b>Wallet </b> page next to the currency you want to deposit or in the top right corner of any page on the CryptoIEX website  
- Choose bank transfer <br>
- Select the currency to deposit <br>
- Input the amount you’ll send to CryptoIEX <br>
- Select your bank’s country <br>
Click Deposit and you’ll then see payment details for the transfer <br>
We’ll also send this receipt to your email so you can print it and use it to transfer funds<br>
To send funds from your bank account to CryptoIEX , transfer money online using the information in the recipe provided by CryptoIEX or provide this receipt to your banker

            `,
    },
    {
        header: "How to withdraw funds by bank transfer?",
        body: `
          
         Withdrawals from CryptoIEX via bank transfer are fast and practical <br>
We offer withdrawals via SEPA (EUR only, available in Europe Union) <br>
Click the Withdraw button on the <b>Wallet</b> page next to the currency you want to withdraw or in the top right corner of any page on the CryptoIEX website <br>
- Choose bank transfer <br>
- Enter the amount to send to your bank account <br>
- Fill in your Bank’s beneficiary details: Bank name Bank country and address BIC/SWIFT number IBAN or bank account number <br>
- Accept the CryptoIEX Terms of Use, Refund Policy, and Payment Conditions <br>

- Then click the Withdraw button <br>
            `,
    },
    {
        header: "How to deposit and withdraw cryptocurrency?",
        body: `
          
        In order to deposit cryptocurrency to your CryptoIEX account, you need to send your funds from your external wallet to the CryptoIEX wallet of corresponding currency. To check your wallet address please go to the <b>Balance</b> Page. <br>
CryptoIEX offers different payment methods for both deposits and withdrawal, depending on financial possibilities, government regulations and other factors. You can get yourself acquainted with the variety of these methods on the next stage <br>
In order to withdraw your cryptocurrency from CryptoIEX to another wallet, you should proceed to the <b>Balance</b> page and click the Withdrawal button next to the currency you want to withdraw <br>
On the next page, you need to enter your destination address and amount. After filling all fields, please double-check that all information is correct and confirm it by putting a checkmark <br>
After pressing the Withdraw button, you will receive a confirmation email. You need to follow the link in the email to confirm your transaction
            `,
    },
];

const RenderFaqItem = (item: ICollapseListItem, idx: number) => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className="faq_item" key={idx}>
            <div className="faq_title" onClick={() => setIsOpened(!isOpened)}>
                {item.header} <div className="faq_arrow" />
            </div>
            <Collapse isOpened={isOpened}>
                <div className="faq_box">
                    <HTMLRenderer html={item.body} />
                </div>
            </Collapse>
        </div>
    );
};

export const PageFaq: React.FC<IPageFaqProps> = () => {
    return (
        <div className="PageFaq" style={{width: "100%"}}>
            <div className="page_title1">F.A.Q.</div>
            <div className="home_block5 hide_mob background-transparent" />
            <div className="profile_box faq_box1">
                <List items={faqItems} renderItem={RenderFaqItem} />
            </div>
        </div>
    );
};
