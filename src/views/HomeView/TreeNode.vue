<script setup lang="ts">
import type OrgNode from '@/types/OrgNode'

defineProps<{
  node: OrgNode
}>()
</script>

<template>
  <li class="tree-node">
    <span class="tree-node__label">{{ node.label }} - {{ node.total }} - {{ node.amount }}</span>
    <ul class="tree-node__list">
      <TreeNode v-for="subnode in node.nodes" :key="subnode.id" :node="subnode" />
    </ul>
  </li>
</template>
