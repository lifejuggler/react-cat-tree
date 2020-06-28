import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import '../style.css';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="navigation-wrapper">
          <a
            className="title"
            href="https://github.com/lifejuggler/react-cat-tree"
            taget="_blank"
          >
            React Cat Tree - Meow
          </a>
          <a
            className="github-button"
            href="https://github.com/lifejuggler/react-cat-tree"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star lifejuggler/react-cat-tree on GitHub"
          >
            Star
          </a>
          <a className="link" href="./storybook" target="_blank">
            View Storybook
          </a>
        </div>
        <div className="description">
          Drag-and-drop sortable component for nested data and hierarchies
        </div>
        <iframe
          title="sandbox"
          src="https://codesandbox.io/embed/github/lifejuggler/react-cat-tree/tree/master/website/sandbox?odemirror=1&view=preview"
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
