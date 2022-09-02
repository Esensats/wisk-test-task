<script setup lang="ts">
import type OrgNode from '@/types/OrgNode'

defineProps<{
  node: OrgNode
}>()
</script>

<template>
  <li class="tree-node">
    <ul class="tree-node__info">
      <li class="tree-node__info-item">
        <span
          class="tree-node__label"
          :style="{ ...(node.depth && { marginLeft: node.depth * 1.5 + 'rem' }) }"
          >{{ node.label }}</span
        >
      </li>
      <li class="tree-node__info-item">{{ node.total }}</li>
      <li class="tree-node__info-item">{{ node.amount }}</li>
      <li class="tree-node__info-item">Edit, Delete</li>
    </ul>
    <ul class="tree-node__list">
      <!-- <div class="container tree-node__list-container"> -->
      <TreeNode v-for="subnode in node.nodes" :key="subnode.id" :node="subnode" />
      <!-- </div> -->
    </ul>
  </li>
</template>

<style scoped lang="scss">
.tree-node {
  box-shadow: inset 0 -0.5px 0 0 white;

  &__info {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr 15rem 15rem 10rem;
    // gap: 0.5rem;

    &-item {
      padding: 0.75rem 1rem;
    }
  }

  // &__list {
  //   &-container {
  //     padding: 0;
  //   }
  // }
}
</style>
