<template>
  <ul class="social-links">
    <li v-for="link in links" :key="link.name">
      <a
        :href="link.url"
        target="_blank"
        class="social-icon-link"
        :aria-label="link.name"
      >
        <img :src="link.icon" :alt="link.name" />
      </a>
    </li>
  </ul>
</template>

<script setup>
const links = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/guilherme.sousa53?igsh=eHp6ZHMxNWhzMGpt&utm_source=qr',
    icon: '/assets/instagram.svg'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/guilherme-sousa-bbb983184/',
    icon: '/assets/linkedin.svg'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/guilherme.sousa53?mibextid=LQQJ4d',
    icon: '/assets/facebook.svg'
  }
]
</script>

<style scoped>
.social-links {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.social-links li {
  display: inline-block;
}
</style>
