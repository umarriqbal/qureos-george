import { Component } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { getSearchTokens, getFilteredMembers } from "../xhr/apiRequest";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

class QureosSearchBar extends Component {
  constructor(props) {
    super(props);
    this.isToken = props.isToken;
    this.placeHolder = props.placeHolder
      ? props.placeHolder
      : "Search for interests.";
    this.sendSearchItem = props.getSearchItemCallBack;
    this.sendChangedInput = props.changedInputCallBack;
    this.searchBarId = props.searchBarId;
    this.keyFormat = props.keyFormat ? props.keyFormat : "input";
    this.state = {
      minLength: 3,
      isLoading: false,
      options: [],
    };
    this.searchHandler = this.handleSearch.bind(this);
  }
  async handleSearch(query) {
    var searchResults = [];
    this.setState({ isLoading: true });
    if (this.isToken === true) {
      searchResults = await getSearchTokens(query);
    } else {
      searchResults = await getFilteredMembers({ nameToken: query });
    }
    if (searchResults.success === true) {
      this.setState({ isLoading: false, options: searchResults.data });
    } else {
      this.setState({ isLoading: false });
    }
  }
  render() {
    return (
      <AsyncTypeahead
        {...this.state}
        id={this.searchBarId}
        onSearch={this.searchHandler}
        onChange={(item) => this.sendSearchItem(item)}
        onInputChange={this.sendChangedInput}
        labelKey={this.keyFormat}
        placeholder={this.placeHolder}
      />
    );
  }
}

export default QureosSearchBar;
