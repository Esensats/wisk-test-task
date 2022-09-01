interface OrgNode {
  id: number
  label: string
  amount: number
  nodes?: OrgNode[]
  depth?: number
  total?: number
}

export default OrgNode
