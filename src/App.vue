<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import Features from './components/Features.vue'
import TechStack from './components/TechStack.vue'
import DownloadSection from './components/DownloadSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <Features />
    <TechStack />
    <DownloadSection />
  </main>
  <SiteFooter />
</template>