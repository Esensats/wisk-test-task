<script setup lang="ts">
import type OrgNode from '@/types/OrgNode'
import { useOrgStructureStore } from '@/stores/orgStructure'
import { ref, defineProps } from 'vue'
import ChevronIcon from './icons/ChevronIcon.vue'

const emit = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()

const props = defineProps<{
  node: OrgNode
}>()

const orgStructure = useOrgStructureStore()
// orgStructure.printLabels()

const showChildren = ref<boolean>(false)

const treeNodeList = ref<HTMLElement | null>(null)

const handleCollapseClick = (): void => {
  showChildren.value = !showChildren.value
}

const handleSelect = (): void => {
  if (orgStructure.selectedId === props.node.id) {
    orgStructure.selectedId = null
  } else orgStructure.selectedId = props.node.id
}

const handleEdit = () => {
  emit('edit', props.node.id)
}
const handleChildEdit = (id: number): void => {
  emit('edit', id)
}

const handleDelete = (): void => {
  emit('delete', props.node.id)
}
const handleChildDelete = (id: number): void => {
  emit('delete', id)
}

// const handleEdit = (): void => {}
</script>

<template>
  <li
    class="tree-node"
    :class="{
      'tree-node--selected': orgStructure.selectedId === node.id,
    }"
    :key="`child-node-main--${node.id}`"
    @click.stop="handleSelect"
    @dblclick.stop="handleCollapseClick"
  >
    <ul class="tree-node__info">
      <li class="tree-node__info-item">
        <div
          class="tree-node__info-item-wrapper"
          :style="{ ...(node.depth && { marginLeft: node.depth * 1.5 + 'rem' }) }"
        >
          <ChevronIcon
            v-if="node.nodes"
            class="tree-node__collapse-icon"
            :class="{
              'tree-node__collapse-icon--collapsed': !showChildren,
            }"
            @click="handleCollapseClick"
          />
          <span class="tree-node__label" :style="!node.nodes ? 'margin-left: 2rem' : ''">{{
            node.label
          }}</span>
        </div>
      </li>
      <li class="tree-node__info-item">{{ node.total }}</li>
      <li class="tree-node__info-item">{{ node.amount }}</li>
      <li class="tree-node__info-item">
        <form @submit.prevent="handleEdit">
          <button type="submit" class="tree-node__action">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="tree-node__action-edit"
            >
              <path
                d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
              />
            </svg>
          </button>
        </form>
        <form @submit.prevent="handleDelete">
          <button type="submit" class="tree-node__action">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              class="tree-node__action-delete"
            >
              <path
                d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
              />
            </svg>
          </button>
        </form>
      </li>
    </ul>
    <ul
      class="tree-node__list"
      ref="treeNodeList"
      v-if="showChildren"
      :key="`child-node-list--${node.id}`"
    >
      <!-- <div class="container tree-node__list-container"> -->
      <TreeNode
        @edit="handleChildEdit"
        @delete="handleChildDelete"
        v-for="subnode in node.nodes"
        :key="`child-node--${subnode.id}`"
        :node="subnode"
      />
      <!-- </div> -->
    </ul>
  </li>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@/scss/tokens' as *;
.tree-node {
  box-shadow: inset 0 -0.5px 0 0 white;
  cursor: pointer;

  // &__list {
  //   overflow: hidden;
  // }
  &--selected {
    outline: 2px solid map.get($color-theme, accent, 600, color);
  }
  &__info {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr 15rem 15rem 10rem;

    max-height: 48px;
    transition: all 0.5s ease;
    overflow: hidden;
    // gap: 0.5rem;

    &-item-wrapper {
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
    }
    &-item {
      display: flex;
      align-items: center;
    }
  }
  &__collapse-icon {
    // display: block;
    max-width: 1.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
    transform: rotate(180deg);
    transition: all 0.2s ease-out;

    &--collapsed {
      transform: rotate(90deg);
    }
    &:hover {
      fill: map.get($color-theme, neutral, 500);
    }
  }
  &__action {
    background: none;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    & > svg {
      transition: all 0.2s ease;
    }
    &-edit {
      height: 1.35rem;
      fill: map.get($color-theme, primary, 200, color);
      margin-right: 0.5rem;
      margin-left: 0.5rem;
      &:hover {
        fill: map.get($color-theme, neutral, 500);
      }
    }
    &-delete {
      height: 1rem;
      width: 1rem;
      box-sizing: content-box;
      padding: 0.25rem;
      fill: map.get($color-theme, neutral, 100);
      background-color: map.get($color-theme, primary, 200, color);
      border-radius: 50%;
      &:hover {
        background-color: map.get($color-theme, neutral, 500);
      }
    }
  }
}
</style>
