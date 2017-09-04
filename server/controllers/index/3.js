import {Meeting} from '../../m_schema/tf_schema'
import {Application} from '../../m_schema/tf_schema'
import {Company} from '../../m_schema/tf_schema'

const getMeetingApplicationCompany = async (req, res) => {
  let name = req.query.name || ''
  // console.log(name)
  let m_doc = await Meeting.findOne({name: name})
  let a_doc = await Application.findOne({meetingId: m_doc._id, type: '上市公司'})
  let c_doc = await Company.findOne({_id: a_doc.corporationId})
  let _m_doc = JSON.parse(JSON.stringify(m_doc))
  _m_doc.application = a_doc
  let __m_doc = JSON.parse(JSON.stringify(_m_doc))
  __m_doc['application'].company = c_doc
  // console.log(__m_doc)
  res.send(__m_doc)
}

export default getMeetingApplicationCompany