import React, { Component } from 'react';
import { Image, FlatList, StyleSheet, Text, View } from 'react-native';

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

export default class SampleAppMovies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loaded: false
		};
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		fetch(REQUEST_URL).then((response) => response.json()).then((responseData) => {
			this.setState({
				data: this.state.data.concat(responseData.movies),
				loaded: true
			});
		});
	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}

		return (
			<FlatList
				data={this.state.data}
				renderItem={this.renderMovie}
				style={styles.list}
				keyExtractor={(item) => item.id}
			/>
		);
	}

	renderLoadingView() {
		return (
			<View style={styles.container}>
				<Text>Loading movies...</Text>
			</View>
		);
	}

	renderMovie({ item }) {
		return (
			<View style={styles.container}>
				<Image source={{ uri: item.posters.thumbnail }} style={styles.thumbnail} />
				<View style={styles.rightContainer}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.year}>{item.year}</Text>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5fcff'
	},
	rightContainer: {
		flex: 1
	},
	title: {
		fontSize: 20,
		marginBottom: 8,
		textAlign: 'center'
	},
	year: {
		textAlign: 'center'
	},
	thumbnail: {
		width: 53,
		height: 81
	},
	list: {
		paddingTop: 20,
		backgroundColor: '#f5fcff'
	}
});
