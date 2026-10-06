import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ConsentBanner from "./components/consent-banner";

const GTM = "GTM-NCSN8BLM";
// Consent defaults are set first, then any saved choice is applied, then GTM loads once.
const head = `window.dataLayer=window.dataLayer||[];function dl(){dataLayer.push(arguments)}
dl("consent","default",{ad_storage:"denied",analytics_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
try{if(localStorage.getItem("atf-consent")==="granted")dl("consent","update",{ad_storage:"granted",analytics_storage:"granted",ad_user_data:"granted",ad_personalization:"granted"})}catch(e){}
(function(w,d,s,l,i){w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i;f.parentNode.insertBefore(j,f)})(window,document,"script","dataLayer","${GTM}");`;

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aftertheform.com"),
  title: "After the Form | Make Google Ads learn from qualified leads",
  description:
    "We fix the connection between HubSpot and Google Ads so Smart Bidding learns from the leads your sales team qualifies. $1,200 fixed, done within 7 business days.",
  alternates: { canonical: "https://www.aftertheform.com" },
  openGraph: {
    title: "After the Form | Make Google Ads learn from qualified leads",
    description:
      "We fix the connection between HubSpot and Google Ads so Smart Bidding learns from the leads your sales team qualifies. $1,200 fixed, done within 7 business days.",
    url: "https://www.aftertheform.com",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <Script id="gtm" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: head }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
