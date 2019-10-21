import React, { createContext } from "react";

const context = createContext();

export default {
  Provider: context.Provider,
  withConsumer: Component => props => (
    <context.Consumer>
      {(value = {}) => <Component {...props} {...value} />}
    </context.Consumer>
  )
};
