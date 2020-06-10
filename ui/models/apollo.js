import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from 'subscriptions-transport-ws';

const GRAPHQL_ENDPOINT = "//localhost:3000/graphql";

const httpLink = new HttpLink({
    uri: `http:${GRAPHQL_ENDPOINT}`
});
  
const wsLink = new WebSocketLink({
    uri: `ws:${GRAPHQL_ENDPOINT}`,
    options: {
        reconnect: true
    }
});
  
const terminatingLink = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
);
  
const link = ApolloLink.from([terminatingLink]);

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});