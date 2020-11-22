<template>
  <div
    class="content-wrapper bg-background-primary font-sans text-copy-primary leading-normal flex flex-col min-h-screen"
    :class="theme"
  >
    <header class="border-t-14 border-teal-700">
      <nav
        class="container mx-auto flex flex-wrap justify-between items-center py-8"
      >
        <div>
          <g-link
            v-if="theme === 'theme-light'"
            class="uppercase tracking-wide font-bold text-copy-primary hover:text-gray-600"
            to="/"
          >
            <g-image src="../../static/logo.png" width="200"
          /></g-link>
          <g-link
            v-else
            class="uppercase tracking-wide font-bold text-copy-primary hover:text-gray-600"
            to="/"
            ><g-image src="../../static/logo_dark.png" width="200"
          /></g-link>
        </div>
        <div class="block lg:hidden">
          <button
            @click="toggle"
            class="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600"
            data-cypress="hamburger"
          >
            <svg
              class="current-color h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                fill="gray"
              />
            </svg>
          </button>
        </div>
        <ul
          class="uppercase tracking-wide font-bold w-full block flex-grow lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0"
          :class="isOpen ? 'block' : 'hidden'"
          data-cypress="menu"
        >
          <li class="mb-6 lg:mb-0">
            <search-input />
          </li>
          <li>
            <theme-switcher :theme="theme" @themeChanged="updateTheme" />
          </li>
          <li>
            <a
              v-if="$route.path === '/'"
              href="/#about"
              v-scroll-to="'#about'"
              class="text-copy-primary hover:text-gray-600"
              data-cypress="about"
              >About</a
            >
            <g-link
              v-else
              to="/#about"
              class="text-copy-primary hover:text-gray-600"
              >About</g-link
            >
          </li>
          <li>
            <a
              v-if="$route.path === '/'"
              href="/#contact"
              v-scroll-to="'#contact'"
              class="text-copy-primary hover:text-gray-600"
              data-cypress="contact"
              >Contact</a
            >
            <g-link
              v-else
              to="/#contact"
              class="text-copy-primary hover:text-gray-600"
              >Contact</g-link
            >
          </li>
          <li>
            <g-link
              to="/blog"
              class="text-copy-primary hover:text-gray-600"
              data-cypress="blog"
              >Blog</g-link
            >
          </li>
        </ul>
      </nav>
    </header>
    <transition name="fade" appear>
      <main class="flex-grow">
        <slot />
      </main>
    </transition>
    <footer class="bg-teal-700 text-white">
      <div
        class="container mx-auto flex flex-col lg:flex-row items-center justify-between py-8"
      >
        <div class="mb-8 lg:mb-0">
          <div>
            Copyright {{ new Date().getFullYear() }}. All rights reserved.
          </div>
          <div>
            <a
              href="/rss.xml"
              class="text-white hover:text-gray-400 font-normal"
              >RSS Feed</a
            >
            |
            <a
              href="/sitemap.xml"
              class="text-white hover:text-gray-400 font-normal"
              >Sitemap</a
            >
          </div>
        </div>
        <ul class="flex items-center space-x-8">
          <li>
            <a
              href="https://github.com/scrambldchannel"
              target="_blank"
              class="text-white hover:text-gray-400"
            >
              <g-image src="../../static/github.svg" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/alexander-sutcliffe-b56921166/"
              target="_blank"
              class="text-white hover:text-gray-400"
            >
              <g-image src="../../static/linkedin.svg" />
            </a>
          </li>

          <li>
            <a
              href="https://twitter.com/scrambldchannel"
              target="_blank"
              class="text-white hover:text-gray-400"
            >
              <g-image src="../../static/twitter.svg" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import SearchInput from "../components/SearchInput";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default {
  components: {
    SearchInput,
    ThemeSwitcher,
  },
  mounted() {
    this.theme = localStorage.getItem("theme") || "theme-light";
  },
  data() {
    return {
      isOpen: false,
      theme: "",
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    updateTheme(theme) {
      this.theme = theme;
    },
  },
};
</script>

<style src="../css/main.css" />
