<script setup lang="ts">
import { useOrgStructureStore } from '@/stores/orgStructure'
import { nextTick, ref } from 'vue'
import TreeNode from './TreeNode.vue'

const orgStructure = useOrgStructureStore()
const showModalAdd = ref(false)
const showModalEdit = ref(false)
const editId = ref<number | null>(null)
const inputLabelRef = ref<HTMLInputElement | undefined>(undefined)
const editInputLabelRef = ref<HTMLInputElement | undefined>(undefined)
const inputLabel = ref<null | string>(null)
const inputAmount = ref<null | number>(null)

// const selectedItem: null | number = null
const addItem = () => {
  showModalAdd.value = !showModalAdd.value
  nextTick(() => {
    inputLabelRef.value?.focus()
  })
}
const handleAddCancel = () => {
  showModalAdd.value = false
}
const handleEditCancel = () => {
  showModalEdit.value = false
}
const handleAddSubmit = () => {
  if (inputLabel.value !== null && inputAmount.value !== null) {
    orgStructure.addItem(
      {
        label: inputLabel.value,
        amount: inputAmount.value,
      },
      orgStructure.selectedId ?? undefined
    )
    inputLabel.value = null
    inputAmount.value = null
    inputLabelRef.value?.focus()
  }
}
const handleNodeEdit = (id: number): void => {
  showModalEdit.value = true
  editId.value = id
  const object = orgStructure.getById(id)
  if (object !== null) {
    inputLabel.value = object.label
    inputAmount.value = object.amount
  }
  nextTick(() => {
    editInputLabelRef.value?.focus()
  })
}

const handleEditSubmit = () => {
  if (inputLabel.value !== null && inputAmount.value !== null && editId.value !== null) {
    orgStructure.editItem(editId.value, {
      label: inputLabel.value,
      amount: inputAmount.value,
    })
    editId.value = null
    inputLabel.value = null
    inputAmount.value = null
    showModalEdit.value = false
  }
}
const handleNodeDelete = (id: number): void => {
  orgStructure.deleteItem(id)
}
</script>

<template>
  <div
    class="modal-add-wrapper"
    tabindex="0"
    @keydown.esc="handleAddCancel"
    v-show="showModalAdd"
    @click.self="showModalAdd = false"
  >
    <Transition name="slide-fade" v-show="showModalAdd">
      <form @submit.prevent="handleAddSubmit" class="modal-add backdrop-blur">
        <h2 class="modal-add__title">Добавить объект</h2>
        <label for="modal-add__input-label" class="modal-add__label-label">Введите название:</label>
        <input
          ref="inputLabelRef"
          type="text"
          name="modal-add__input-label"
          id="modal-add__input-label"
          placeholder="Например: Центр 2"
          v-model="inputLabel"
        />
        <label for="modal-add__input-amount" class="modal-add__label-amount"
          >Введите фактическое кол-во:</label
        >
        <input
          type="number"
          name="modal-add__input-amount"
          id="modal-add__input-amount"
          placeholder="Например: 15"
          v-model="inputAmount"
        />
        <ul class="modal-add__actions">
          <li class="modal-add__action">
            <button type="submit" class="modal-add__btn-submit btn btn-primary">Добавить</button>
          </li>
          <li class="modal-add__action">
            <form @submit.prevent="handleAddCancel" class="modal-add__cancel">
              <button type="submit" class="modal-add__btn-cancel btn">Закрыть</button>
            </form>
          </li>
        </ul>
      </form>
    </Transition>
  </div>
  <div
    class="modal-add-wrapper"
    tabindex="0"
    @keydown.esc="handleEditCancel"
    v-show="showModalEdit"
    @click.self="showModalEdit = false"
  >
    <Transition name="slide-fade" v-show="showModalEdit">
      <form @submit.prevent="handleEditSubmit" class="modal-add backdrop-blur">
        <h2 class="modal-add__title">Изменить объект</h2>
        <label for="modal-add__input-label" class="modal-add__label-label">Введите название:</label>
        <input
          ref="editInputLabelRef"
          type="text"
          name="modal-add__input-label"
          id="modal-add__input-label"
          placeholder="Например: Центр 2"
          v-model="inputLabel"
        />
        <label for="modal-add__input-amount" class="modal-add__label-amount"
          >Введите фактическое кол-во:</label
        >
        <input
          type="number"
          name="modal-add__input-amount"
          id="modal-add__input-amount"
          placeholder="Например: 15"
          v-model="inputAmount"
        />
        <ul class="modal-add__actions">
          <li class="modal-add__action">
            <button type="submit" class="modal-add__btn-submit btn btn-primary">Добавить</button>
          </li>
          <li class="modal-add__action">
            <form @submit.prevent="handleEditCancel" class="modal-add__cancel">
              <button type="submit" class="modal-add__btn-cancel btn">Закрыть</button>
            </form>
          </li>
        </ul>
      </form>
    </Transition>
  </div>
  <main class="home">
    <!-- <div class="container home__container"> -->
    <div class="add backdrop-blur">
      <div class="add__container container">
        <form class="add__form" @submit.prevent="addItem">
          <button class="add__button btn" type="submit">
            <span class="add__button-plus">+</span>Добавить
          </button>
        </form>
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
        :key="`parent-node--${node.id}`"
        @edit="handleNodeEdit"
        @delete="handleNodeDelete"
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
// .home {
//   max-width: 100rem;
//   margin: 0 auto;

//   // &__container {
//   //   padding-top: $container-padding;
//   //   padding-bottom: $container-padding;
//   // }
// }
.slide-fade {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }
  &-enter-from,
  &-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
}
.modal-add {
  &-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: hsla(0, 0%, 0%, 0.2);
  }
  border-radius: $border-radius-md;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $container-padding * 2;

  label {
    margin-bottom: 0.5rem;
  }
  input {
    margin-bottom: 1rem;
  }
  &__title {
    margin: 0;
    margin-bottom: 1rem;
  }
  &__actions {
    list-style-type: none;
    padding: 0;
    margin: 0;
    // margin-top: 1rem;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr;
    @include mq(sm) {
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
    }
  }
  &__action .btn {
    width: 100%;
  }
  // &__btn-submit {

  // }
}
.add {
  padding: {
    top: 1rem;
    bottom: 1rem;
  }
  top: 0;
  align-self: flex-start;
  position: sticky;
  z-index: 15;
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
