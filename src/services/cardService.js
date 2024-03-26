import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }

    const createdColumn = await cardModel.createNew(newCard)

    const getNewCard = await cardModel.findById(createdColumn.insertedId)
    return getNewCard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}