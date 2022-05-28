import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

export default {
  // https://github.com/sveltejs/svelte-preprocess
  preprocess: sveltePreprocess({
    postcss: {
      plugins: [autoprefixer]
    }
  })
}
