import { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.css';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';
import { CompanySearch } from './company';
import { searchCompanies } from './api';
import ListPortfolio from './Components/Portfolio/ListPortfolio/ListPortfolio';

function App() {
  const [search, setSearch]                   = useState<string>("");
  const [PortfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult]       = useState<CompanySearch[]>([]);
  const [serverError, setServerError]         = useState<string>("");
  const handleSearchChange                    = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  }
   const onPortfolioCreate = (e:any)=>{
    e.preventDefault();
    const exists = PortfolioValues.find((value)=>value === e.target[0].value);
    if(exists) return;
    const updatePortfolio = [...PortfolioValues, e.target[0].value];
    setPortfolioValues(updatePortfolio);
   };
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
   
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
    console.log(searchResult);
  };
  return (
    <div className = "App">
    <Search 
    onSearchSubmit     = {onSearchSubmit}
    search             = {search}
    handleSearchChange = {handleSearchChange}
     />
     <ListPortfolio
     portfolioValues={PortfolioValues}
     />
      <CardList 
      searchResults     = {searchResult}
      onPortfolioCreate = {onPortfolioCreate}
      />
      {serverError && <h1>{serverError}</h1>}
    </div>
  );
}

export default App;
