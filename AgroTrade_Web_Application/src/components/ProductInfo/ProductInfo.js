import React,{Component} from 'react';
import './productStyle.css';
import Calendar from 'react-calendar';
export default class Farmer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cropname:'',
      price:0,
      quant : 0,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
}
  state = {
    date: new Date(),
  }
 
onChange = date => this.setState({ date })

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit} class="jotform-form">

            <input type="hidden" name="formID" value="200412672853451" />
  <input type="hidden" id="JWTContainer" value="" />
  <input type="hidden" id="cardinalOrderNumber" value="" />
    <div role="main" class="form-all">
      <ul class="form-section page-section">

      <div id="cid_1" class="form-input-wide" data-type="control_head">
        <div class="form-header-group ">
        <div class="header-text httal htvam">
        <h1 id="header_1" class="form-header" data-component="header">
        CROP INFORMATION
        </h1>
        </div>
        </div>
      </div>

      
      <li class="form-line jf-required" data-type="control_textbox" id="id_2">
        <label class="form-label form-label-left form-label-auto" id="label_2" for="input_2">
        CROP NAME
        <span class="form-required">
        *
        </span>
        </label>
        <div id="cid_2" class="form-input jf-required">
          <input type="text" value={this.state.fname} onChange={this.handleChange} id="input_2" name="cropname" data-type="input-textbox" class="form-textbox validate[required]" size="20"  placeholder=" " data-component="textbox" aria-labelledby="label_2" required="" />
        </div>
      </li>
            <li class="form-line" data-type="control_dropdown" id="id_13">
        <label class="form-label form-label-left form-label-auto" id="label_13" for="input_13"> TYPE OF CROP </label>
        <div id="cid_13" class="form-input">
          <select class="form-dropdown" id="input_13" name="q13_typeOf"  data-component="dropdown" aria-labelledby="label_13">
            <option value="">  </option>
            <option value="Dark-Green"> Dark-Green </option>
            <option value="Red and Orange"> Red and Orange </option>
            <option value="Starchy"> Starchy </option>
            <option value="Beans and Peas"> Beans and Peas </option>
            <option value="Other"> Other </option>
          </select>
        </div>
      </li>

      <li class="form-line jf-required" data-type="control_textbox" id="id_4">
        <label class="form-label form-label-left form-label-auto" id="label_4" for="input_4">
          EXPECTED PRICE per KG
          <span class="form-required">
            *
          </span>
        </label>
        <div id="cid_4" class="form-input jf-required">
          <input type="number" value={this.state.idno} onChange={this.handleChange} id="input_4" name="price" data-type="input-textbox" class="form-textbox validate[required]" size="20"  placeholder=" " data-component="textbox" aria-labelledby="label_4" required="" />
        </div>
      </li>


      <li class="form-line jf-required" data-type="control_textbox" id="id_5">
        <label class="form-label form-label-left form-label-auto" id="label_5" for="input_5">
          TOTAL QUANTITY
          <span class="form-required">
            *
          </span>
        </label>
        <div id="cid_5" class="form-input jf-required">
          <input type="text" value={this.state.email} onChange={this.handleChange}id="input_5" name="quant" data-type="input-textbox" class="form-textbox validate[required]" size="20"  placeholder=" " data-component="textbox" aria-labelledby="label_5" required="" />
        </div>
      </li>

      <li class="form-line jf-required" data-type="control_textbox" id="id_5">
        <label class="form-label form-label-left form-label-auto" id="label_5" for="input_5">
          EXPECTED EXPIRAY DATE
          <span class="form-required">
            *
          </span>
        </label>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </li>      


      <li class="form-line" data-type="control_button" id="id_12">
        <div id="cid_12" class="form-input-wide">
          <div style={{textalign:'center'}} class="form-buttons-wrapper ">
            <button id="input_12" type="submit" class="form-submit-button" data-component="button" data-content="">
              Submit
            </button>
          </div>
        </div>
      </li>

    </ul>

    
</div>

      </form>
    );
  }
}
