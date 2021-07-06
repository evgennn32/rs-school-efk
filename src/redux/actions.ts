export function changeCategory(newCategoryID: number) : {type: string; payload: number}{
  return {
    type: 'CHANGE_CATEGORY',
    payload: newCategoryID
  }
}
