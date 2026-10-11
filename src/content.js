// Every piece of copy on the site lives in src/data/*.json.
// This module is the single place components import it from.
import profile from "./data/profile.json";
import availabilityPresets from "./data/availability.json";
import experience from "./data/experience.json";
import projects from "./data/projects.json";
import about from "./data/about.json";
import contact from "./data/contact.json";
import site from "./data/site.json";

export const availability =
  availabilityPresets[profile.availability] ?? availabilityPresets.open;

export { profile, experience, projects, about, contact, site };
