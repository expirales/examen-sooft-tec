# Challenge of phrases.

## 1. Project Installation

### Step 1: install dependencies

First, you need to have **Node.js** installed on your machine. If you haven't installed it yet, you can download it from [here](https://nodejs.org/).

Then, run the following command in your terminal to create a new Vite project with React:

```bash
git clone https://github.com/expirales/examen-sooft-tec.git
```

Then to install dependencies execute the following lines:

```bash
cd mi-proyecto
npm install
```

To run de project in `dev` mode:

```bash
npm run dev

the app is gonna run on http://localhost:5173/
```

### Project Objective

The goal of this project is to create a "Challenge" that allows users to visualize, add, and delete phrases. The phrases will be displayed in a matrix of cards, and users will be able to interact with them easily.

#### Main Features:

- Add Phrases: Users can add new phrases.
- Remove Phrases: Users can remove existing phrases.
- Visualization in a Grid: The phrases are displayed in a card format in the interface.
- Search: Users can search for specific phrases using a search bar.

#### Third-Party Libraries Used:

- [Fuse.js](https://fusejs.io/): A library used to perform fuzzy searches within the added phrases. It allows users to search for phrases even if they don't remember the exact spelling.
- [React Router](https://reactrouter.com/): A user‑obsessed, standards‑focused, multi‑strategy router you can deploy anywhere.

#### Technologies and Versions

`Technologies Used:`

- [Vite](https://vite.dev/guide/): Used as a fast development bundler.
- [React](https://es.react.dev/): A library for building the user interface.
- [Sass](https://sass-lang.com/): Used for styling the application.
- [Fuse.js](https://fusejs.io/): For fuzzy search functionality.

##### Versions:

```bash
"fuse.js": "^7.1.0",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-router-dom": "^7.1.5",
"sass": "^1.84.0"
```
