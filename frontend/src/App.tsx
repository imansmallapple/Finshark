import './App.css';
import Card from './Components/Card/Card';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';

function App() {
  return (
    <div className="App">
      <Search />
      <CardList />
    </div>
  );
}

export default App;
