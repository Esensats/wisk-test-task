<script setup lang="ts">
import { useOrgStructureStore } from '@/stores/orgStructure'
import TreeNode from './TreeNode.vue'

const orgStructure = useOrgStructureStore()
</script>

<template>
  <main class="home">
    <!-- <div class="container home__container"> -->
    <div class="add">
      <div class="container">
        <button class="add__button btn"><span class="add__button-plus">+</span>Добавить</button>
      </div>
    </div>
    <ul class="org-tree-head">
      <li class="org-tree-head__item"><span class="org-tree-head__span"></span></li>
      <li class="org-tree-head__item">
        <span class="org-tree-head__span">Общее количество</span>
      </li>
      <li class="org-tree-head__item">
        <span class="org-tree-head__span">Фактическое количество</span>
      </li>
      <li class="org-tree-head__item"><span class="org-tree-head__span">Действия</span></li>
    </ul>
    <ul class="org-tree">
      <TreeNode
        v-for="node in orgStructure.getComputedTree"
        :key="node.id"
        :node="node"
        class="org-tree__tree-node"
      />
    </ul>
    <!-- </div> -->
  </main>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use 'sass:color';
@use '@/scss' as *;
.home {
  max-width: 100rem;
  margin: 0 auto;

  // &__container {
  //   padding-top: $container-padding;
  //   padding-bottom: $container-padding;
  // }
}
.add {
  &__button {
    position: relative;
    padding-left: 2em;
    &-plus {
      font-size: 2em;
      position: absolute;
      left: 0.25em;
      line-height: 0.67em;
      font-weight: map.get($fonts-primary, fw, light);
    }
  }
}
.org-tree-head {
  padding: 0 0;
  margin: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 15rem 15rem 10rem;
  // gap: 0.5rem;
  background-color: map.get($color-theme, primary, 200, color);
  color: map.get($color-theme, primary, 200, text);

  &__item {
    padding: 0.75rem 1rem;
    box-sizing: border-box;

    &:not(:first-child) {
      border-left: 0.5px solid map.get($color-theme, primary, 200, text);
    }
  }
}
.org-tree {
  list-style-type: none;
  padding-left: 0;
  margin: 6px 0;
  &:deep(.tree-node__list) {
    padding-left: 0;
    // margin: 6px 0;
    list-style-type: none;
    background-color: color.scale(map.get($color-theme, accent, 600, color), $alpha: -75%);
    // &::after {
    //   content: '';
    //   display: block;
    //   position: absolute;
    //   bottom: 0;
    //   height: 1px;
    //   background-color: red;
    // }
  }
}
</style>
