import {Meeting} from '../../m_schema/tf_schema'
import {Application} from '../../m_schema/tf_schema'

const getMeetingApplication = async (req, res) => {
  let name = req.query.name || '';
  let _m_doc = JSON.stringify(await Meeting.findOne({name: name}));
  let m_doc = JSON.parse(_m_doc);
  let a_doc = await Application.findOne({meetingId: m_doc._id, type: '上市公司'})
  m_doc.application = a_doc
  // console.log(m_doc)
  res.send(m_doc)
}

export default getMeetingApplication