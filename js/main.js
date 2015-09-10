'use strict';

(function (e) {

	var wordList = ['OCE', 'ANGRBE', 'FMR', 'FID', 'RPL', 'OMG', 'WAT', 'OCEFID', 'ANGRBERPL', 'FMROMG', 'FIDWAT', 'RPLOCE', 'OMGANGRBE', 'WATFMR'];

	var AcronymList = React.createClass({
		displayName: 'AcronymList',

		selectAcronym: function selectAcronym(e) {
			this.props.parent.resetState(e.currentTarget.getAttribute('data-cleantext'));
		},

		render: function render() {
			var self = this,
			    createItem = function createItem(itemText, index) {
				return React.createElement(
					'li',
					{ key: index, onClick: self.selectAcronym, 'data-cleantext': itemText.text, tabIndex: '0' },
					itemText.markup
				);
			};

			return React.createElement(
				'ul',
				{ className: 'list-unstyled text-uppercase acr-search--results' },
				this.props.parent.state.items.map(createItem)
			);
		}
	});

	var AcronymSearch = React.createClass({
		displayName: 'AcronymSearch',

		getInitialState: function getInitialState() {
			return { items: [], text: '' };
		},

		resetState: function resetState(text) {
			this.setState({ items: [], text: text });
			return;
		},

		onChange: function onChange(e) {

			var matchingList = [],
			    targetValue = e.target.value.toUpperCase(),
			    i;

			if (targetValue !== '') {

				for (i = 0; i < wordList.length; i++) {
					var matchedWord = wordList[i].toUpperCase(),
					    re = new RegExp(targetValue, 'g'),
					    boldedWord;

					if (matchedWord.indexOf(targetValue) !== -1) {

						boldedWord = matchedWord.replace(re, '<strong>' + targetValue + '</strong>');

						matchingList.push({
							'text': matchedWord,
							'markup': React.createElement('div', { dangerouslySetInnerHTML: { __html: boldedWord } })
						});
					}
				}
			}

			this.setState({
				items: matchingList,
				text: targetValue
			});
		},

		onFormSubmit: function onFormSubmit(e) {
			e.preventDefault();
			alert('This is where we would visit:\n\nhttp://acronym.fmr.com/' + this.state.text);
			this.resetState();
		},

		render: function render() {

			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					{ className: 'container-fluid' },
					'Acronym React Test'
				),
				React.createElement(
					'form',
					{ className: 'container-fluid form-inline acr-search--container', onSubmit: this.onFormSubmit },
					React.createElement(
						'div',
						{ className: 'form-group' },
						React.createElement(
							'div',
							null,
							React.createElement(
								'label',
								{ htmlFor: 'acr-search--searchbox' },
								'Search Acronyms'
							)
						),
						React.createElement(
							'div',
							{ className: 'acr-search--searchbox-container' },
							React.createElement('input', { autoComplete: 'off', className: 'form-control text-uppercase', id: 'acr-search--searchbox', type: 'text', onChange: this.onChange, value: this.state.text }),
							React.createElement(AcronymList, { parent: this })
						),
						React.createElement(
							'button',
							{ className: 'btn btn-block btn-primary' },
							'Search'
						)
					)
				)
			);
		}
	});

	React.render(React.createElement(AcronymSearch, null), document.getElementById('acr-search'));
})();
//# sourceMappingURL=main.js.map
