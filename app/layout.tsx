import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import ConsentBanner from "./components/consent-banner";
import { site } from "./site.config";
import { sharedOpenGraph } from "./seo";

const GTM = "GTM-NCSN8BLM";
// Consent defaults are set first, then any saved choice is applied. GTM itself loads once, after the load event
// and an idle callback (max 2 s), so it does not compete with the page for LCP and TBT (open item O11).
const head = `window.dataLayer=window.dataLayer||[];function dl(){dataLayer.push(arguments)}
dl("consent","default",{ad_storage:"denied",analytics_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
try{if(localStorage.getItem("atf-consent")==="granted")dl("consent","update",{ad_storage:"granted",analytics_storage:"granted",ad_user_data:"granted",ad_personalization:"granted"})}catch(e){}
dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});
function atfG(){var j=document.createElement("script");j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id=${GTM}";document.head.appendChild(j)}
function atfQ(){window.requestIdleCallback?requestIdleCallback(atfG,{timeout:2000}):setTimeout(atfG,1)}
document.readyState==="complete"?atfQ():addEventListener("load",atfQ,{once:true});`;

// Closes the mobile menu popover when a link inside it is clicked (in-page anchors do not close popovers on their own).
const menu = `document.getElementById("site-menu")?.addEventListener("click",function(e){if(e.target.closest("a"))e.currentTarget.hidePopover()});`;

const archivo = localFont({
  src: "./fonts/archivo-latin-var.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-archivo",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

const azeret = localFont({
  src: "./fonts/azeret-mono-latin-var.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-azeret",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "After the Form | Make Google Ads bid on pipeline", template: "%s | After the Form" },
  applicationName: "After the Form",
  openGraph: { ...sharedOpenGraph },
  twitter: { card: "summary_large_image" },
  // Non-production builds (previews, local) are noindex; next.config.ts adds the matching X-Robots-Tag header.
  ...(site.indexable ? {} : { robots: { index: false, follow: false } }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-ZA" className={`${archivo.variable} ${azeret.variable}`}>
      <body>
        <Script id="gtm" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: head }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        {children}
        <ConsentBanner />
        <Script id="menu" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: menu }} />
      </body>
    </html>
  );
}
