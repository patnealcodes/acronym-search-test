(function(e) {

	var wordList = [
		'OCE',
		'ANGRBE',
		'FMR',
		'FID',
		'RPL',
		'OMG',
		'WAT',
		'OCEFID',
		'ANGRBERPL',
		'FMROMG',
		'FIDWAT',
		'RPLOCE',
		'OMGANGRBE',
		'WATFMR'
	];

	var AcronymList = React.createClass({
		selectAcronym: function( e ) {
			this.props.parent.resetState( e.currentTarget.getAttribute('data-cleantext') );
		},

		render: function() {
			var
				self = this,
				createItem = function( itemText, index ) {
					return (
						<li key={index} onClick={self.selectAcronym} data-cleantext={itemText.text} tabIndex="0">{itemText.markup}</li>
					);
			};

			return (
				<ul className="list-unstyled text-uppercase acr-search--results">
					{this.props.parent.state.items.map(createItem)}
				</ul>
			);
		}
	});

	var AcronymSearch = React.createClass({
		getInitialState: function() {
			return {items: [], text: ''};
		},

		resetState: function( text ) {
			this.setState({ items: [], text: text });
			return;
		},

		onChange: function( e ) {

			var
				matchingList = [],
				targetValue = e.target.value.toUpperCase(),
				i
			;

			if( targetValue !== '' ) {

				for( i = 0; i < wordList.length; i++ ) {
					var
						matchedWord = wordList[i].toUpperCase(),
						re = new RegExp(targetValue,'g'),
						boldedWord
					;

					if( matchedWord.indexOf(targetValue) !== -1 ) {

						boldedWord = matchedWord.replace(re, '<strong>' + targetValue + '</strong>');

						matchingList.push({
							'text': matchedWord,
							'markup': <div dangerouslySetInnerHTML={{__html: boldedWord}}></div>
						});
					}
				}

			}

			this.setState({
				items: matchingList,
				text: targetValue
			});
		},

		onFormSubmit: function(e) {
			e.preventDefault();
			alert('This is where we would visit:\n\nhttp://acronym.fmr.com/' + this.state.text);
			this.resetState();
		},

		render: function() {

			return (
				<div>
					<h1 className="container-fluid">Acronym React Test</h1>
					<form className="container-fluid form-inline acr-search--container" onSubmit={this.onFormSubmit}>
						<div className="form-group">
							<div>
								<label htmlFor="acr-search--searchbox">Search Acronyms</label>
							</div>
							<div className="acr-search--searchbox-container">
								<input autoComplete="off" className="form-control text-uppercase" id="acr-search--searchbox" type="text" onChange={this.onChange} value={this.state.text} />
								<AcronymList parent={this} />
							</div>
							<button className="btn btn-block btn-primary">Search</button>
						</div>

					</form>
				</div>
			);
		}
	});

	React.render(
		<AcronymSearch />,
		document.getElementById('acr-search')
	);

})(); 