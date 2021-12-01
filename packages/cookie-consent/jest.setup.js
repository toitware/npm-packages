global.window = Object.create(window);

// This is necessary so we can mock the `window.location.reload()` function
Object.defineProperty(window, "location", {
  value: {
    ...window.location,
  },
  writable: true,
});
