import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './Components/Home'
import Tasks from './Components/Tasks'
import Calendar from './Components/Calendar'
import Insights from './Components/Insights'


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
