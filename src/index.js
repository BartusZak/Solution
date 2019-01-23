import React from 'react';
import { render } from 'react-dom';
// import { ConnectedRouter } from "react-router-redux";
// import { PersistGate } from "redux-persist/integration/react";

// import storeCreator from "./store";
// import App from "./containers/App";

// const { store } = storeCreator;

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  React.render(<div>Twoja stara</div>, document.getElementById('root'));
}
