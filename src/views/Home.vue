<template>
  <TurnstileGate v-if="!verified" @pass="verified = true" />

  <div v-else id="app">
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

<script setup>
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import Features from '../components/Features.vue'
import TechStack from '../components/TechStack.vue'
import DownloadSection from '../components/DownloadSection.vue'
import SiteFooter from '../components/SiteFooter.vue'
import TurnstileGate from '../components/TurnstileGate.vue'
import { ref } from 'vue'

const verified = ref(false)
</script>

<style scoped>
main {
  min-height: 100vh;
}
</style>