import type OrgNode from '@/types/OrgNode'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import entries from 'object.entries'

export const useOrgStructureStore = defineStore('orgStructure', () => {
  const tree = ref<OrgNode[]>([
    {
      id: 0,
      label: 'Нур-Султан',
      amount: 15,

      nodes: [
        {
          id: 20,
          label: 'Центр 1',
          amount: 10,
          nodes: [
            {
              id: 21,
              label: 'Управление 1',
              amount: 5,
              nodes: [
                {
                  id: 22,
                  label: 'Отдел 1',
                  amount: 10,
                },
                {
                  id: 23,
                  label: 'Отдел 2',
                  amount: 10,
                },
              ],
            },
            {
              id: 24,
              label: 'Управление 2',
              amount: 5,
              nodes: [
                {
                  id: 25,
                  label: 'Отдел 1',
                  amount: 10,
                },
                {
                  id: 26,
                  label: 'Отдел 2',
                  amount: 10,
                },
              ],
            },
          ],
        },
        {
          id: 27,
          label: 'Центр 2',
          amount: 10,
          nodes: [
            {
              id: 28,
              label: 'Управление 1',
              amount: 5,
              nodes: [
                {
                  id: 29,
                  label: 'Отдел 1',
                  amount: 10,
                },
                {
                  id: 30,
                  label: 'Отдел 2',
                  amount: 10,
                },
              ],
            },
            {
              id: 31,
              label: 'Управление 2',
              amount: 5,
              nodes: [
                {
                  id: 32,
                  label: 'Отдел 1',
                  amount: 10,
                },
                {
                  id: 33,
                  label: 'Отдел 2',
                  amount: 10,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 5,
      label: 'Алматы',
      amount: 20,
      nodes: [
        {
          id: 6,
          label: 'Центр 1',
          amount: 10,
          nodes: [
            {
              id: 7,
              label: 'Управление 1',
              amount: 5,
              nodes: [
                {
                  id: 11,
                  label: 'Отдел 1',
                  amount: 10,
                },
                {
                  id: 12,
                  label: 'Отдел 2',
                  amount: 10,
                },
              ],
            },
            {
              id: 10,
              label: 'Управление 2',
              amount: 5,
              nodes: [
                {
                  id: 13,
                  label: 'Отдел 1',
                  amount: 10,
                },
                {
                  id: 14,
                  label: 'Отдел 2',
                  amount: 10,
                },
              ],
            },
          ],
        },
        {
          id: 8,
          label: 'Центр 2',
          amount: 10,
          nodes: [
            {
              id: 142,
              label: 'Управление 1',
              amount: 5,
              nodes: [
                {
                  id: 15,
                  label: 'Отдел 1',
                  amount: 10,
                },
                {
                  id: 16,
                  label: 'Отдел 2',
                  amount: 10,
                },
              ],
            },
            {
              id: 17,
              label: 'Управление 2',
              amount: 5,
              nodes: [
                {
                  id: 18,
                  label: 'Отдел 1',
                  amount: 10,
                },
                {
                  id: 19,
                  label: 'Отдел 2',
                  amount: 10,
                },
              ],
            },
          ],
        },
      ],
    },
  ])
  /**
   * Calculates the total amount from all the child nodes and assigns them to "tota" of every object
   * @param root One object whose total gets calculated and written to it
   */
  const calcTotal = (root: OrgNode): number => {
    let total = root.amount
    if (root.nodes && root.nodes.length) {
      root.nodes.forEach((node) => {
        total += calcTotal(node)
      })
    }
    return (root.total = total)
  }

  /**
   * Adds "depth" property to each object in OrgNode[]
   * @param arr Array of objects to assign depth to each child object
   * @param depth Don't pass anything to it
   */
  const addDepth = (arr: OrgNode[], depth = 0) => {
    ;(arr || []).forEach((obj) => {
      obj.depth = depth
      if (obj.nodes && obj.nodes?.length) {
        addDepth(obj.nodes, depth + 1)
      }
    })
  }

  const tempTree = tree
  const getComputedTree = computed<OrgNode[]>(() => {
    addDepth(tempTree.value)
    tempTree.value.forEach((node) => calcTotal(node))
    console.debug(tempTree.value)
    return tempTree.value
  })

  return { tree, getComputedTree }
})
