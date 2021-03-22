export const mutationTypes = (m, area, todoTypes) => {
  const types = {}
  todoTypes.forEach((item) => (types[`${item}`] = `${m}_${area}_${item}`))
  return types
}
