export interface IRecipesSearch {
  searchList: Array<IDataRecipesSearch>
}

interface IDataRecipesSearch {
  name: string
  code: string
  id: number
}
