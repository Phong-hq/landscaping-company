import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

import image from "@astrojs/image";
console.log(vue());

// https://astro.build/config
export default defineConfig({
  integrations: [
  //   tailwind({
  //   config: {
  //     applyAstroPreset: false,
  //     applyBaseStyles: true
  //   }
  // }), 
  vue(), image()]
});