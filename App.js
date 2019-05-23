import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      people: []
    }
    this.fetchPeople()
  }

  async fetchPeople() {
    // fetch people
    let response = await fetch('https://swapi.co/api/people')
    let json = await response.json()
    this.setState({
      people: json["results"]
    })
  }

  async componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          fullWidth
          style={styles.list}
          data={this.state.people.map(p => ({ key: p.name, ...p }))}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <Text style={{ fontWeight: 'bold' }} key={item.name}>{item.name}</Text>
                <Text
                  style={{ paddingLeft: 5, color: 'grey' }}
                >{`Born  in ${item.birth_year}, ${item.name} weighs ${(item.mass * 2.2).toFixed(0)} pounds and appeared in ${item.films.length} film${item.films.length > 1 ? 's' : ''}`}
                </Text>
              </View>
            )

          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 50,
    padding: 10
  },
  listItem: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 5
  },
  list: {
    flex: 1,
  }
});
