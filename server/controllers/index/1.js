import {Meeting} from '../../m_schema/tf_schema'

const getMeeting = (req, res) => {
  let name = req.query.name || ''
  // console.log(name)
  Meeting.findOne({name: name}, (err, doc) => {
    if (err) throw err
    // console.log(doc)
    res.send(doc)
  })
}

export default getMeeting