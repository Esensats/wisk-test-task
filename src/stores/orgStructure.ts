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
      label: 'label1',
      amount: 15,
      nodes: [
        {
          id: 1,
          label: 'label2',
          amount: 10,
          nodes: [
            {
              id: 2,
              label: 'label3',
              amount: 5,
            },
          ],
        },
        {
          id: 4,
          label: 'label5',
          amount: 10,
        },
      ],
    },
    {
      id: 5,
      label: 'label6',
      amount: 15,
      nodes: [
        {
          id: 6,
          label: 'label7',
          amount: 10,
          nodes: [
            {
              id: 7,
              label: 'label8',
              amount: 5,
            },
          ],
        },
        {
          id: 8,
          label: 'label9',
          amount: 10,
        },
      ],
    },
  ])

  /**
   * Adds depth field to every object in the passed OrgNode[]
   * @param arr Input array. GETS CHANGED
   * @param depth Don't pass it
   * @param index Don't pass it
   */
  const assignDepth = (arr: OrgNode[], depth = 0, index = 0): void => {
    if (index < arr.length) {
      arr[index].depth = depth
      if (arr[index].nodes && arr[index].nodes?.length) {
        return assignDepth(arr[index].nodes as OrgNode[], depth + 1, 0)
      }
      return assignDepth(arr, depth, index + 1)
    }
    return
  }

  /**
   * With side effects. Adds "total" property to each object in OrgNode[]
   * @param objArr
   * @param prop
   */
  const assignTotal = (objArr: OrgNode[], prop: string): number =>
    objArr
      .map((obj) => {
        // console.debug(entries(obj))
        return entries(obj).reduce(
          (sum: number, [key, val]: (number | string)[]) =>
            key == prop
              ? sum + parseInt(val as string)
              : Array.isArray(val)
              ? (obj.total = sum + assignTotal(val, prop))
              : 0,
          0
        )
      })
      .reduce((total, current) => total + current)

  const tempTree = tree
  const getComputedTree = computed<OrgNode[]>(() => {
    assignDepth(tempTree.value)
    assignTotal(tempTree.value, 'amount')
    // console.debug(tempTree.value)
    return tempTree.value
  })

  return { tree, getComputedTree }
})
