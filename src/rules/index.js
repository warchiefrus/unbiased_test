import { parsePhoneNumberFromString } from 'libphonenumber-js'
import * as moment from 'moment'

export default {
  fieldRequired: v => {
    if (typeof v === 'boolean') {
      return true
    }
    return !!v || 'Please fill in data'
  },
  UKCellphone: v => {
    if (v) {
      let phoneNumber = parsePhoneNumberFromString(`+44${v}`, 'UK')
      if (phoneNumber) {
        if (phoneNumber.isValid()) {
          return true
        }
      }
      return 'Please input valid phone'
    }
    return true
  },
  airflightNumber: v => {
    const pattern1 = new RegExp(/^([A-Z]{3}|[A-Z\d]{2})(?:\s?)(\d{1,4})$/, 'i')
    const pattern2 = new RegExp(/^([A-Z]{1})(?:\s?)(\d{1,5})$/, 'i')
    const pattern3 = new RegExp(/^([A-Z]{1})(?:\s?)(\d{1,5})([A-Z]{1})$/, 'i')
    if (v && (pattern1.test(v) || pattern2.test(v) || pattern3.test(v))) {
      return true
    }
    return 'Please input valid airflight number'
  },
  todayOrMore: v => {
    if (moment(v, 'MM/DD/YYYY').isValid()) {
      const val = moment(v)
      const today = moment().startOf('day')
      return val >= today ? true : 'Arrival date must be today or more'
    }
    return 'Invalid date'
  }
}
