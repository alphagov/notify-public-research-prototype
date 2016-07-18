import { PropTypes } from 'react'

PropTypes.message = PropTypes.shape({
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
})

PropTypes.messages = PropTypes.arrayOf(PropTypes.message)

export default PropTypes
