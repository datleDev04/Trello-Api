import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title : Joi.string().required().min(3).max(5).trim().strict(),
    description : Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // set abortEarly : false
    // fix lỗi trả về lỗi sớm và không valid các trường còn lại
    await correctCondition.validateAsync(req?.body, { abortEarly: false })
    next()
  } catch (error) {
    // console.log(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   error: new Error(error).message
    // })
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew
}