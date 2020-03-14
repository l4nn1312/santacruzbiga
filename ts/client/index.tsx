import "./styles/index.sass"

import { render, Component } from 'inferno';
import { Router, Route, browserHistory } from 'inferno-router';
import { Provider } from 'inferno-redux';
import { createStore } from 'redux';

const store = createStore(function(state, action) {
  switch (action.type) {
    case 'CHANGE_NAME':    
      return {
        name: action.name
      };
    default:
      return {
        name: 'TOM'
      };
  }
})

class App extends Component {
    render() {
        return <div>
            { this.props.children }
        </div>;
    }
}

class BasicComponent1 extends Component {
    render() {
        const store = this.context.store;
        const state = store.getState();

        const onClick = e => {
            e.preventDefault();
            store.dispatch({
                type: 'CHANGE_NAME',
                name: 'Jerry'
            });
        };

        return (
            <div className="basic">
                <a id="dispatch" onClick={ onClick }>
                    <span>Hello { state.name || 'Tom' }</span>
                </a>
            </div>
        );
    }
}

class BasicComponent2 extends Component {
    render() {
        const store = this.context.store;
        const state = store.getState();

        return (
            <div className="basic2">
                { state.name === 'Jerry' ? 'You\'re a mouse!' : 'You\'re a cat!' }
            </div>
        );
    }
}

render((
    <Provider store={ store }>
        <Router history={ browserHistory } component={ App }>
            <Route path='/next' component={ BasicComponent2 } />
            <Route path='/' component={ BasicComponent1 } />
        </Router>
    </Provider>
), document.getElementById("root"));