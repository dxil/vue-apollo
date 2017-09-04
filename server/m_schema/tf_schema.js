import mongoose from 'mongoose'

const Company = mongoose.model('company', new mongoose.Schema({
  _id: String,
  name: String,
  shareCode: String,
  shareType: String,
}), 'company')

const Application = mongoose.model('application', new mongoose.Schema({
  _id: String,
  corporationId: String,
  name: String,
  meetingId: String
}), 'application')

const Meeting = mongoose.model('meeting', new mongoose.Schema({
  _id: String,
  name: String,
  status: String
}), 'meeting')
export {Company, Application, Meeting}