import React, {Component} from 'react'
import SimpleReactCalendar from 'simple-react-calendar'
import './calendar.css'
 
class Calendar extends Component {
  render() {
    return <SimpleReactCalendar activeMonth={new Date()} />
  }
}
export default Calendar;