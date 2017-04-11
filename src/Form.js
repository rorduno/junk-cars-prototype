const React = require('react');
const Typeahead = require('react-bootstrap-typeahead').Typeahead
const data = require('./data/make-model.json')
const Weights = require('./data/data.json')

class Form extends React.Component {
  constructor(){
  	super()
		this.state = {makes: [], models: [], make: '', model: '', year: ''}
		this._handleMakeChange = this._handleMakeChange.bind(this)
		this._handleModelChange = this._handleModelChange.bind(this)
		this._handleSubmitQuote = this._handleSubmitQuote.bind(this)
  }

	componentWillMount() {
   	this.setState({makes: Object.keys(data)})
  }

	_handleMakeChange (e) {
		console.log(e[0])
    if(!!e[0]){
			this.setState({make: e[0]})
			this.setState({models: []})
      this.setState({model: ''})

			const modelsArry = data[e[0]]
				this.setState({ models: modelsArry.map( model => {
					return model.model
      	})
      })
		}
	}

	_handleModelChange (e) {
		if(!!e[0]){
			this.setState({model: e[0]})
		}
   }

	_handleSubmitQuote(e) {
			e.preventDefault()
      const self = this;
      let filteredArray = {};
      Weights.forEach( function(elem, index) {
          // console.log([elem["Make"], self.state.make, index]);
          if ( elem["Make"].toUpperCase() === self.state.make &&
               elem["Model"].toUpperCase() === self.state.model &&
               elem["Year"] > 0 ){
              filteredArray = elem;
          };
        }
      );
      // console.log( [self.state.make, self.state.model, filteredArray["Year"], filteredArray["Weight"]] );

      let msg =  "For Your " + filteredArray["Year"] + " " + self.state.make + " " + self.state.model;
          msg += "\nWould you like to accept this quote for $";
          msg += ( filteredArray["Weight"]/2000 )*75.00;
          msg += "?";
      const r = confirm( msg );
      if (r === true) {
          alert('Thank You! We will reach out to you soon, \nto schedule a PickUp!');
      } else {
          alert('Thank You!');
      }
	}

    render() {
      return (
      <div className="jumbotron">
      <div className="container">
      	<form>
					<div className="text-center" >
						<h3>Make*</h3>
						<Typeahead
								options={this.state.makes}
								onChange={this._handleMakeChange}
								placeholder="Select your Vehicle's Make"
								key="makes"
								bsSize="sm"
						/>
						<h3>Model*</h3>
						<Typeahead
								options={this.state.models}
								onChange={this._handleModelChange}
								placeholder="Select your Vehicle's Model"
								key="models"
								bsSize="sm"
						/>
        	</div>
          <div className="form-group">
            <h3>Year*</h3>
            <div className="">
              <select id="selectbasic" name="selectbasic" className="form-control">
                <option value="1995">1995</option>
                <option value="1996">1996</option>
                <option value="1997">1997</option>
                <option value="1998">1998</option>
                <option value="1999">1999</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
              </select>
            </div>
          </div>

        	<div className="form-group">
            <h3>Name*</h3>
            <div className="">
            <input id="textinput" name="textinput" type="text" placeholder="" className="form-control input-md" />
            </div>
          </div>
        	<div className="form-group">
            <h3>Phone or Email*</h3>
            <div className="">
            <input id="textinput" name="textinput" type="text" placeholder="" className="form-control input-md" />
            </div>
          </div>
          <div className="form-group">
            <h3>Zip Code*</h3>
            <div className="">
              <select id="selectbasic" name="selectbasic" className="form-control">
                <option value="60647">60647</option>
                <option value="60625">60625</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="singlebutton"></label>
            <div className="">
              <button onClick={this._handleSubmitQuote} id="singlebutton" name="singlebutton" className="btn btn-primary">Get Quote</button>
            </div>
          </div>
				</form>
				</div>
				</div>
      );
    }
}
module.exports = Form
