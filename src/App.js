import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './views/Home'
import Tasks from './views/Tasks'
import Calendar from './views/Calendar'
import Insights from './views/Insights'


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route to="/home" component={Home}/>
        <Route to="/tasks" component={Tasks}/>
        <Route to="/calendar" component={Calendar}/>
        <Route to="/insights" component={Insights}/>
        <Route to="/" component={Home}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
