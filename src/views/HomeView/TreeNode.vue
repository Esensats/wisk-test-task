<script setup lang="ts">
import type OrgNode from '@/types/OrgNode'
// import { computed } from '@vue/reactivity'
import { ref, computed, defineProps, defineEmits, nextTick } from 'vue'
import ChevronIcon from './icons/ChevronIcon.vue'

const props = defineProps<{
  node: OrgNode
}>()
const emit = defineEmits(['toggleCollapse'])

const showChildren = ref<boolean>(false)

const countKey = ref<number>(0)
const countDep = ref<number>(0)

const treeNodeList = ref<HTMLElement | null>(null)
// eslint-disable-next-line vue/return-in-computed-property
const computedHeight = computed<string | undefined>(() => {
  countDep.value
  showChildren.value
  treeNodeList.value
  // console.debug('bruh')
  console.debug(treeNodeList.value?.scrollHeight ?? 'Nah')
  if (
    showChildren.value === true &&
    treeNodeList.value &&
    (treeNodeList.value.classList.contains('slide-enter-active') ||
      treeNodeList.value.classList.contains('slide-leave-active'))
  ) {
    return `max-height: ${treeNodeList.value?.scrollHeight}px`
  } else {
    nextTick(() => {
      setTimeout(() => {
        console.log('showChildren.value :>> ', props.node.label, showChildren.value)
      }, 1000)
      if (treeNodeList.value) {
        console.debug('collapsed building', props.node.label)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        treeNodeList.value.style.maxHeight = ''
      }
    })
  }
})

const handleCollapseClick = (): void => {
  showChildren.value = !showChildren.value
  // nextTick(() => {
  //   if (showChildren.value && treeNodeList.value) {
  //     // console.debug('triggered expand', treeNodeList.value.scrollHeight)
  //     // setTimeout(() => {
  //     //   console.debug('expand', props.node.label, treeNodeList.value?.scrollHeight)
  //     // }, 1000)
  //     treeNodeList.value.style.maxHeight = treeNodeList.value.scrollHeight + 'px'
  //   }
  // })
  // if (!showChildren.value && treeNodeList.value) {
  //   // console.debug('triggered collapse', treeNodeList.value.scrollHeight)
  //   treeNodeList.value.style.maxHeight = '0px'
  // }
  // countKey.value++
  countDep.value++
  emit('toggleCollapse')
  // computedHeight.value = undefined
}

const handleChildCollapse = (): void => {
  emit('toggleCollapse')
  countDep.value++

  // setTimeout(() => {
  //   if (showChildren.value && treeNodeList.value) {
  //     console.debug('triggered child toggle', props.node.label, treeNodeList.value.scrollHeight)
  //     treeNodeList.value.style.maxHeight = treeNodeList.value.scrollHeight + 'px'
  //   }
  // }, 350)
  // computedHeight.value = undefined
  // countKey.value++
  // countDep.value++
}
// onMounted(() => {})
</script>

<template>
  <li class="tree-node" :key="`child-node-main--${node.id}`">
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
          <span class="tree-node__label" :style="!node.nodes ? 'margin-left: 1.5rem' : ''">{{
            node.label
          }}</span>
        </div>
      </li>
      <li class="tree-node__info-item">{{ node.total }}</li>
      <li class="tree-node__info-item">{{ node.amount }}</li>
      <li class="tree-node__info-item">Edit, Delete</li>
    </ul>
    <TransitionGroup name="slide">
      <ul
        :style="computedHeight"
        class="tree-node__list"
        ref="treeNodeList"
        v-if="showChildren"
        :key="`child-node-list--${countKey}--${node.id}`"
      >
        <!-- <div class="container tree-node__list-container"> -->
        <TreeNode
          v-for="subnode in node.nodes"
          @toggleCollapse="handleChildCollapse"
          :key="`child-node--${countKey}--${subnode.id}`"
          :node="subnode"
        />
        <!-- </div> -->
      </ul>
    </TransitionGroup>
  </li>
</template>

<style lang="scss">
.tree-node__list {
  transition: all 0.5s ease;
  overflow: hidden;
}
.slide {
  &-enter-from,
  &-leave-to {
    max-height: 0px;
  }
  // &-enter-active,
  // &-leave-active {
  //   position: absolute;
  // }
  // &-enter-to,
  // &-leave-from {
  //   height: auto;
  // }
}
</style>

<style scoped lang="scss">
.tree-node {
  box-shadow: inset 0 -0.5px 0 0 white;

  // &__list {
  //   overflow: hidden;
  // }

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
  }
  &__collapse-icon {
    // display: block;
    max-width: 1.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
    transform: rotate(180deg);
    transition: all 0.3s ease;

    &--collapsed {
      transform: rotate(90deg);
    }
  }

  // &__list {
  //   &-container {
  //     padding: 0;
  //   }
  // }
}
</style>
