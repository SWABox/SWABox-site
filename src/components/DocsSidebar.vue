<template>
  <aside class="docs-sidebar">
    <div class="sidebar-title">文档导航</div>
    <ul class="sidebar-menu">
      <li v-for="item in menu" :key="item.path" class="menu-item">
        <a
            :href="item.path"
            class="menu-link"
            :class="{ active: isActive(item.path) }"
            @click.prevent="$emit('navigate', item.path)"
        >
          {{ item.title }}
        </a>

        <ul v-if="item.children" class="sub-menu">
          <li v-for="child in item.children" :key="child.path" class="sub-menu-item">
            <a
                :href="child.path"
                class="sub-menu-link"
                :class="{ active: isActive(child.path) }"
                @click.prevent="$emit('navigate', child.path)"
            >
              {{ child.title }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

const props = defineProps({
  menu: Array,
  currentPath: String
})

defineEmits(['navigate'])

const route = useRoute()

const isActive = (path) => {
  if (path === '/docs/' && props.currentPath === '/docs') {
    return true
  }
  return props.currentPath.startsWith(path)
}
</script>

<style scoped>
.docs-sidebar {
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding-right: 20px;
  border-right: 1px solid #333;
}

.sidebar-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #818cf8;
  margin-bottom: 16px;
  padding-left: 10px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.menu-item {
  margin-bottom: 4px;
}

.menu-link {
  display: block;
  padding: 8px 12px;
  color: #aaa;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
}

.menu-link:hover {
  background: rgba(129, 140, 248, 0.1);
  color: #fff;
}

.menu-link.active {
  background: rgba(129, 140, 248, 0.2);
  color: #818cf8;
  font-weight: bold;
}

.sub-menu {
  list-style: none;
  padding-left: 16px;
  margin-top: 4px;
  font-size: 0.9em;
}

.sub-menu-link {
  display: block;
  padding: 6px 12px;
  color: #888;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
}

.sub-menu-link:hover {
  background: rgba(129, 140, 248, 0.08);
  color: #ddd;
}

.sub-menu-link.active {
  color: #818cf8;
  background: rgba(129, 140, 248, 0.15);
}
</style>