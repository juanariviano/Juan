## Portfolio Website

This is a personal portfolio website built with **React.js** and
**Tailwind CSS**.

## Installation

1.  Clone the repository:

    ``` bash
    git clone https://github.com/juanariviano/Juan.git
    ```

2.  Navigate into the project directory:

    ``` bash
    cd Juan
    ```

3.  Install dependencies:

    ``` bash
    npm install
    ```

4.  Start the development server:

    ``` bash
    npm start
    ```

## Build for Production

``` bash
npm run build
```

## Editing content

All text and data on the site lives in JSON files in `src/data/`:

| File | What it controls |
|---|---|
| `profile.json` | Name, role, links, CV path, hero bio and hero social chips |
| `availability.json` | Wording for each availability status (`open`, `intern`, `working`, `closed`) |
| `experience.json` | Experience section heading and entries |
| `projects.json` | Project section heading, filter list and project cards |
| `about.json` | About heading, sticky-note stats, facts and the toolbox labels |
| `contact.json` | Contact heading, stamp text, button labels and social links |
| `site.json` | Navbar links, clock time zone, footer text and the wall doodles/posters |

A few conventions:

- Wrap words in `==double equals==` inside `profile.json` → `hero.bio` to give them a highlighter mark.
- Set `profile.json` → `availability` to one of the keys in `availability.json`.
- Project screenshots go in `public/projects/` and are referenced as `"/projects/name.png"`. Leave `"image"` empty to show a placeholder.
- Project readmes are `public/readmes/<readme>.md`, matched by each project's `"readme"` value.
- Filters in `projects.json` match a project's `tech` list, ignoring case and punctuation (`"Node.js"` matches `"node.js"`).
- `{year}` in `site.json` is replaced with the current year.
- A fact in `about.json` with an empty `"value"` is hidden.
