/**
 * @typedef {'open' | 'intern' | 'working' | 'closed'} AvailabilityStatus
 * @typedef {'light' | 'mid' | 'muted'} AvailabilityDot
 */

/** @type {Record<AvailabilityStatus, AvailabilityStatus>} */
export const AVAILABILITY = {
  OPEN: "open",
  INTERN: "intern",
  WORKING: "working",
  CLOSED: "closed",
};

/** @type {Record<AvailabilityStatus, { label: string; dot: AvailabilityDot; fact: string; cta: string }>} */
export const availabilityPresets = {
  open: {
    label: "Open to new opportunities",
    dot: "light",
    fact: "Open to internships, freelance & collaborations",
    cta: "Open to internships, freelance projects, and interesting conversations.",
  },
  intern: {
    label: "Currently doing internship",
    dot: "mid",
    fact: "Internship in progress · Limited availability for new roles",
    cta: "Currently on an internship, but happy to connect and chat about tech.",
  },
  working: {
    label: "Currently working",
    dot: "mid",
    fact: "Employed full-time · Limited availability for new roles",
    cta: "Currently working, but happy to connect and chat about tech.",
  },
  closed: {
    label: "Not available right now",
    dot: "muted",
    fact: "Not actively looking · Happy to stay in touch",
    cta: "Not seeking new roles at the moment, but feel free to reach out.",
  },
};

/**
 * @param {AvailabilityStatus} status
 */
export function getAvailability(status) {
  return availabilityPresets[status] ?? availabilityPresets.open;
}
