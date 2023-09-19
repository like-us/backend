import jobBudget from './job-budget'
import jobHomeOwnership from './job-home-ownership'
import jobStage from './job-stage'
import jobStartDay from './job-start-day'
import tradeTypes from './tradetypes'
import trade from './trades'

const controller = {
  'job-budget': jobBudget,
  'job-home-ownership': jobHomeOwnership,
  'job-stage': jobStage,
  'job-start-day': jobStartDay,
  'trade-type': tradeTypes,
  'trade': trade
}

export type MetadataId = keyof typeof controller

export const METADATA_IDS = Object.keys(controller) as MetadataId[]

export default controller
