import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import Signin from './Signin';
import { auth } from '../nhost';
import { UserContext } from '../Contexts/User/UserContext';
import { generateApolloProviderClient } from '../apollo/client';

class PrivateRoute extends Component {

  constructor(props) {
    super(props);

    this.client = false;
  }

  render() {
    return (
      <UserContext.Consumer>
        {user => {
          return (
            <Route
              {...this.props}
              render={props => {

                if (!auth.isAuthenticated()) {
                  return (
                    <Signin
                      {...this.props}
                    />
                  );
                }

                if (!this.client) {
                  this.client = generateApolloProviderClient();
                }

                return (
                  <ApolloProvider client={this.client}>
                    {this.props.render()}
                  </ApolloProvider>
                );

              }}
            />
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default PrivateRoute;
