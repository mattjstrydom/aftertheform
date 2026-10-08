import { getImageProps } from "next/image";
import { Accent, Chip } from "./ui";

// C1 white-label report: live heading plus the pages-only image (desktop three pages, mobile two stacked).
const alt =
  "Three pages of a sample report as an agency would send it: a cover page with a \"Your agency logo\" placeholder, a finding page about qualified stages not used for bidding, and the change log with how to reverse each change. Sample report, fictional account.";

export default function C1Report() {
  const {
    props: { srcSet: desktop, sizes: desktopSizes, ...rest },
  } = getImageProps({
    alt,
    src: "/images/c1-pages@2x.png",
    width: 1504,
    height: 805,
    sizes: "(min-width: 1440px) 1232px, (min-width: 1024px) calc(100vw - 208px), calc(100vw - 168px)",
  });
  const {
    props: { srcSet: mobile, sizes: mobileSizes },
  } = getImageProps({
    alt,
    src: "/images/c1-pages-mobile@2x.png",
    width: 358,
    height: 1049,
    sizes: "calc(100vw - 80px)",
  });

  return (
    <figure aria-labelledby="c1-title" className="bento-dark on-dark mt-5 overflow-hidden px-5 py-8 sm:px-16 sm:py-16">
      <Chip>White-label report</Chip>
      <h3 id="c1-title" className="mt-4 max-w-[900px] text-title-l">
        Shown as your agency would send it: <Accent dark>your logo, our name nowhere.</Accent>
      </h3>
      <picture>
        <source media="(max-width: 767px)" srcSet={mobile} sizes={mobileSizes} width={358} height={1049} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is in rest */}
        <img {...rest} srcSet={desktop} sizes={desktopSizes} decoding="async" className="mt-10 h-auto w-full md:mt-14" />
      </picture>
      <figcaption className="img-label-dark mt-8">Sample report, fictional account</figcaption>
    </figure>
  );
}
