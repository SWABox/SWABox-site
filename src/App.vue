<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import Features from './components/Features.vue'
import TechStack from './components/TechStack.vue'
import DownloadSection from './components/DownloadSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import DocsView from './views/DocsView.vue'
import {onMounted} from "vue";

const isDocsPage = ref(false)

onMounted(() => {
  isDocsPage.value = window.location.pathname.includes('/docs')
})
</script>

<template>
  <div v-if="isDocsPage">
    <DocsView />
  </div>
  <div v-else>
    <NavBar />
    <main>
      <HeroSection />
      <Features />
      <TechStack />
      <DownloadSection />
    </main>
    <SiteFooter />
  </div>
</template>