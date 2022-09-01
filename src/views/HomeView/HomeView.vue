<script setup lang="ts">
import { useOrgStructureStore } from '@/stores/orgStructure'
import TreeNode from './TreeNode.vue'

const orgStructure = useOrgStructureStore()
</script>

<template>
  <main class="home">
    <div class="container home__container">
      <div class="add">
        <button class="add__button btn"><span class="add__button-plus">+</span>Добавить</button>
      </div>
      <ul class="org-tree">
        <TreeNode
          v-for="node in orgStructure.getComputedTree"
          :key="node.id"
          :node="node"
          class="org-tree__tree-node"
        />
      </ul>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@/scss' as *;
.home {
  &__container {
    padding-top: $container-padding;
    padding-bottom: $container-padding;
  }
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
.org-tree:deep(.tree-node__list) {
  padding-left: 16px;
  margin: 6px 0;
}
</style>
