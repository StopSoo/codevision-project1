# CLAUDE.md

It is a web service that predicts medicine order information for this week based on last week's order information.

# MCP Servers

## Figma Dev Mode MCP Rules

- The Figma Dev Mode MCP Server provides an assets endpoint which can serve image and SVG assets
- IMPORTANT: If the Figma Dev Mode MCP Server returns a localhost source for an image or an SVG, use that image or SVG source directly
- IMPORTANT: DO NOT import/add new icon packages, all the assets should be in the Figma payload
- IMPORTANT: do NOT use or create placeholders if a localhost source is provided

# Tech Spec

Please Check dependencies in ./package.json file.

- **Development**: Next.js, TypeScript, React.js
- **Styling**: tailwindcss@3
- **API Request**: axios
- **Animation** : motion
- **State Manipulatation** : Zustand

# Directory Architecture

figma-mcp/
├── public/ /* statical assets e.g. png, jpg, ... and fonts */
│   ├── assets
│   ├── fonts
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Area.tsx /* a white square area that can add other components on this */
│   │   │   ├── Button.tsx /* a green button that can be used to change other states or move to other page */
│   │   │   ├── Header.tsx /* just header for moving each other pages */
│   │   ├── layout/
│   │   │   ├── Layout.tsx /* a common layout */
│   ├── pages/
│   │   ├── order/
│   │   │   ├── index.tsx /* a page that pharmacy handler can use, primarily to order medicines */
│   │   ├── order-history/
│   │   │   ├── index.tsx /* pharmacy handler can confirm order history */
│   │   ├── order-item/
│   │   │   ├── index.tsx /* merchant can use to confirm product list to be ordered */
│   │   ├── signup/
│   │   │   ├── index.tsx /* member sign up page */
│   │   ├── _app.tsx/ /* basic _app file */
│   │   ├── _document.tsx/ /* basic html file */
│   │   └── index.tsx /* a root page for this platform and login page */

# Implement

- Each page is managed via [pages] directory in `src`.
- If you need implement some page, follow Directory Architecture rules.
- You should declare model and api when you need implement some page. see the figma design and judgment what data is necessary.
- If you think it is a frequently used component, such as a button or input, please implement it flexibly in shared so that the component can be commonly used.

# Avoid Pattern

- Do not use any type. If need some interface or type, you can write [feature page name]/types.ts and export it.
- You can use gap or empty `h-{} div` instead of margin and padding. Please avoid margin/padding styling pattern as you can.
- If a component file has more than 150 lines of code, please separate the hooks or components into modules.
- Do not use `React.[module]` pattern. please just import and use it.
- Do not use inline function. please make a handler function and use it. you can naming function with this rule via `'handle'{target}{eventName}` e.g. handleCTAButtonClick, handleAgeInputChange, etc.
- Do not use inline style css.
- If you need assets, use can copy as SVG code in figma. do not implement yourself asset file, just use svg and convert to svg component.
- Please avoid publish with `relative`, `absolute`. you can use flex and grid tailwindcss keyword.

