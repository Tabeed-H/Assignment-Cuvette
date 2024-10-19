module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/shadcn/**/*.{js,jsx}", // Include Shadcn components
  ],
  theme: {
    extend: {},
  },

  // plugins: [require("shadcn")], // Add Shadcn components as a plugin
};
