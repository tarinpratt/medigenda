import React, { Component } from 'react'
import './editPastAppt'

class EditPastAppt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copay: '',
            docBill: '',
            insuranceBill: '',
            otherNotes: '',
        };
    }

    handleChangeCopay = e => {
        this.setState({ date: e.target.value })
      };
      handleChangeDocBill = e => {
        this.setState({ time: e.target.value })
      };
      handleChangeInsuranceBill = e => {
        this.setState({ apptLocation: e.target.value })
      };
      handleChangeOtherNotes = e => {
        this.setState({ apptDoctor: e.target.value })
      };


    render() {
        return (
            <form>
                <div className="copay">
                <label htmlFor="Co-pay">Co-pay
             <input 
             name="copay"
             type="text"
             value={this.state.copay}
             onChange={this.handleChangeCopay}
              ></input>
              </label>
              </div>
              <div className="docBill">
              <label htmlFor="docBill">Bill From Doctor
             <input 
             name="docBill"
             type="text"
             value={this.state.docBill}
             onChange={this.handleChangeDocBill}
              ></input>
              </label>
              </div>
              <div className="insuranceBill">
              <label htmlFor="insuranceBill">Insurance says I owe
             <input 
             name="insuranceBill"
             type="text"
             value={this.state.insuranceBill}
             onChange={this.handleChangeInsuranceBill}
              ></input>
              </label>
              </div>
              <div className="otherNotes">
             <label htmlFor="otherNotes">Other Notes
             <input 
             name="otherNotes"
             type="text"
             value={this.state.otherNotes}
             onChange={this.handleChangeOtherNotes}
              ></input>
              </label>
              </div>
              <button type="submit">Save</button>
         </form>
       
        )
}
}
export default EditPastAppt;