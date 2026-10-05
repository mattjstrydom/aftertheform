import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ConsentBanner from "./components/consent-banner";

const GTM = "GTM-NCSN8BLM";
// Consent defaults are set first, then any saved choice is applied, then GTM loads once.
const head = `window.dataLayer=window.dataLayer||[];function dl(){dataLayer.push(arguments)}
dl("consent","default",{ad_storage:"denied",analytics_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
try{if(localStorage.getItem("atf-consent")==="granted")dl("consent","update",{ad_storage:"granted",analytics_storage:"granted",ad_user_data:"granted",ad_personalization:"granted"})}catch(e){}
(function(w,d,s,l,i){w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i;f.parentNode.insertBefore(j,f)})(window,document,"script","dataLayer","${GTM}");`;

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aftertheform.com"),
  title: "After the Form | Google Ads that learn from qualified leads",
  description:
    "A fixed-price check and fix of the connection between HubSpot and Google Ads, so Google Ads learns from the leads your sales team qualifies.",
  alternates: { canonical: "https://aftertheform.com" },
  openGraph: {
    title: "After the Form | Google Ads that learn from qualified leads",
    description:
      "A fixed-price check and fix of the connection between HubSpot and Google Ads, so Google Ads learns from the leads your sales team qualifies.",
    url: "https://aftertheform.com",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <Script id="gtm" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: head }} />
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
