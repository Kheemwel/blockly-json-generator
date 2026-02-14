# Blockly JSON Generator

A visual drag-and-drop JSON builder that makes creating JSON super easy! 🧩 No more typing brackets and worrying about commas – just snap blocks together like LEGO. ✨

## Features

⭐ **Visual building** – drag blocks instead of typing code  
🔗 **Smart connections** – blocks only snap where they make sense  
👀 **Live preview** – see your JSON update in real-time  
📱 **Mobile friendly** – works on phones and tablets  
🎨 **Color coded** – different colors for objects, arrays, and values  
🚀 **One-click copy** – grab your JSON when you're done

## Tech Stack

- SolidJS
- Blockly
- Tailwind CSS v4
- TypeScript
- Vinxi

## Project Structure

```
blockly-json-generator/
├── src/
│   ├── blocks/
│   │   └── json_blocks.ts          # defines all the block types (object, array, key, etc.)
│   ├── generators/
│   │   └── json_generator.ts       # converts blocks into actual JSON
│   ├── components/
│   │   ├── BlocklyWorkspace.tsx    # the main drag-and-drop area
│   │   ├── JsonPreview.tsx         # shows the live JSON output
│   │   └── Navbar.tsx              # top navigation bar
│   ├── routes/
│   │   └── index.tsx               # main page
│   └── app.tsx                     # app entry point
├── package.json
└── README.md
```

## Usage

1. **Start with a container** – drag either an Object `{}` or Array `[]` block to the workspace
2. **Add items:**
   - For objects: add Key blocks (like `"name": "value"`)
   - For arrays: add Element blocks
3. **Attach values** – snap String, Number, Boolean, or Null blocks to your keys/elements
4. **Watch the magic** – the JSON preview updates live on the right side
5. **Copy it** – click the copy button when you're done!

**Example:** To make `{"name": "Alice", "age": 25}`:
- Drag an Object block
- Add a Key block, type "name"
- Snap a String block to it, type "Alice"
- Add another Key, type "age"
- Snap a Number block, type 25

Done! 🎉

**Mobile tip:** On small screens, tap the `</>` icon in the navbar to show/hide the JSON preview.

## How to Install

**Requirements:** Node.js >= 22

**Step 1:** Clone or download this project

```bash
git clone <your-repo-url>
cd blockly-json-generator
```

**Step 2:** Install dependencies

```bash
npm install
```

**Step 3:** Start the dev server

```bash
npm run dev
```

**Step 4:** Open your browser and go to `http://localhost:3000`

**Step 5:** Start dragging blocks and building JSON! 🚀

---

**To build for production:**

```bash
npm run build
npm start
```
