// localStorage key for the cookie choice, shared by the consent defaults in app/layout.tsx, the banner and the privacy
// policy. Renamed from the old brand's key with the move to closedlogic.com: localStorage is per origin, so no stored
// choice carries over to the new domain anyway and every visitor is asked once on closedlogic.com.
export const CONSENT_KEY = "cl-consent";
export const OPEN_CONSENT_EVENT = "cl:open-consent";
