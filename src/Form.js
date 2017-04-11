const React = require('react');
const Typeahead = require('react-bootstrap-typeahead').Typeahead
const data = require('./data/make-model.json')

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

	_handleSubmitQuote() {
      const r = confirm("Would you like to accept this quote for $350?");
      if (r == true) {
          alert('Thank You! We will reach out to you soon!')
      } else {
          alert('Thank You!')
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
								bsSize="md"
						/>
						<h3>Model*</h3>
						<Typeahead
								options={this.state.models}
								onChange={this._handleModelChange}
								placeholder="Select your Vehicle's Model"
								key="models"
								bsSize="md"
						/>
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
            <label className="control-label" for="singlebutton"></label>
            <div className="">
              <button onClick={this._handleSubmitQuote}id="singlebutton" name="singlebutton" className="btn btn-primary">Get Quote</button>
            </div>
          </div>
				</form>
				</div>
				</div>
      );
    }
}
module.exports = Form
