import React from 'react';
import classnames from 'classnames';

class GameForm extends React.Component {
  state = {
    _id: this.props.game ? this.props.game._id : null,
    title: this.props.game ? this.props.game.title : '',
    cover: this.props.game ? this.props.game.cover : '',
    price: this.props.game ? this.props.game.price : '',
    year: this.props.game ? this.props.game.year : '',
    company: this.props.game ? this.props.game.company : '',
    errors: {},
    loading: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.game._id,
      title: nextProps.game.title,
      cover: nextProps.game.cover,
      price: nextProps.game.price,
      year: nextProps.game.year,
      company: nextProps.game.company
    });
  }

  handleChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // validation
    let errors = {};
    if (this.state.title === '') errors.title = "Can't be empty";
    if (this.state.cover === '') errors.cover = "Can't be empty";
    if (this.state.price === '') errors.price = "Can't be empty";
    if (this.state.year === '') errors.year = "Can't be empty";
    if (this.state.company === '') errors.company = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { _id, title, cover, price, year, company } = this.state;
      this.setState({ loading: true });
      this.props.saveGame({ _id, title, cover, price, year, company })
        .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
    }
  }

  render() {
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        <h1>Add new game</h1>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

        <div className={classnames('field', { error: !!this.state.errors.title})}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            id="title"
          />
          <span>{this.state.errors.title}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.company})}>
          <label htmlFor="company">Company Name</label>
          <input
            name="company"
            value={this.state.company}
            onChange={this.handleChange}
            id="company"
          />
          <span>{this.state.errors.title}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.price})}>
          <label htmlFor="price">Price</label>
          <input
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
            id="price"
          />
          <span>{this.state.errors.price}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.year})}>
          <label htmlFor="year">Year</label>
          <input
            name="year"
            value={this.state.year}
            onChange={this.handleChange}
            id="year"
          />
          <span>{this.state.errors.year}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.cover})}>
          <label htmlFor="cover">Cover URL</label>
          <input
            name="cover"
            value={this.state.cover}
            onChange={this.handleChange}
            id="cover"
          />
          <span>{this.state.errors.cover}</span>
        </div>

        <div className="field">
          {this.state.cover !== '' && <img src={this.state.cover} alt="cover" className="ui small bordered image"/>}
        </div>

        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    );
    return (
      <div>
        { form }
      </div>
    );
  }
}


export default GameForm;
