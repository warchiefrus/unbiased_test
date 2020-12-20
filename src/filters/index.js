import * as moment from 'moment'

export default {
  toDate(value) {
    if (!value) {
      return ''
    }
    return moment(value).format('MM/DD/YYYY')
  }
}
