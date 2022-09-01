<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="main-header">
    <div class="container main-header__container">
      <nav class="main-header__nav">
        <span class="main-header__link-wrapper">
          <RouterLink to="/" class="main-header__link main-header__link-main">{{
            $route.meta.title
          }}</RouterLink>
        </span>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use 'sass:color';
@use '@/scss/index' as *;
.main-header {
  background-color: $header-color-bg;
  color: $header-color-text;
  min-height: map.get($sizes, 100) * 1.25;
  display: flex;
  align-items: center;

  &__nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
    gap: 1rem;
  }

  &__link {
    // &-wrapper {
    // }
    padding: 0.25rem 0.5rem;
    border-radius: $border-radius-xs;
    text-transform: uppercase;
    font-weight: map.get($fonts-primary, fw, light);
    color: $header-color-text;
    text-decoration: none;

    &:hover {
      background-color: color.scale($color-accent, $alpha: -50%, $lightness: 50%);
    }

    &.router-link-exact-active {
      &:hover {
        background: none;
      }
    }

    &-main {
      font-weight: map.get($fonts-primary, fw, semibold);
    }
  }
}
</style>
