import { useState } from 'react';
import {getChangedId , sortByDate, getDate} from './utility';
import data from './services/data.json';
function App() {
  const [sortPriceFlag, setSortPriceFlag] = useState(true);
  const [filter, setFilter] = useState({});
  const [price, setPrice] = useState([...data]);

  if (!price) {
    return (<div className='no-data-found'>
      <p>Oops! looks like some error, Please Click on the button</p>
      <p><button onClick={() => window.location.reload()}>Click Me!!</button></p>
    </div>);
  }
  const sortPrice = (a,b)=>{
    if(!sortPriceFlag){
      return a.price > b.price ? -1 : 1; 
    }
      return a.price < b.price ? -1 : 1;
  }

  const handleFilter = ({key, value}) =>{
    const newFilter = {...filter, [key]:value};
    const filteredData = data.filter(obj=>{
      const comodityFilter = newFilter.comodity ? obj.comodity===newFilter.comodity : true;   
      const priceFilter = newFilter.category ? obj.category===newFilter.category : true;   
      const categoryFilter = newFilter.price ? `${obj.price}`===`${newFilter.price}` : true;   

      return comodityFilter && priceFilter && categoryFilter;
    })
    setFilter({...newFilter})
    setPrice([...filteredData]);
  }

  const getOption=(type, value)=>{
    let array = !Object.keys(filter).length ? data : price;
    array = array.map(obj=>obj[type])
    let selectOption = new Set([...array]);
    selectOption = Array.from(selectOption);
    if(!array){
      return null;
    }
    return (
      <select onChange={e=>handleFilter({key:type, value:e.target.value, e})} name={type} defaultValue="disable">
          <option value="disable" disabled='disabled'>Select {value}</option>
          {selectOption && selectOption.map((obj,key)=><option key={`option_${type}_${key}`} value={obj}>{obj}</option>)}
      </select>
    )
  }
  const hightlightPrice = getChangedId(data);
  return (
    <div className='App'>
      <div className='header'>
        <div className='header-body'>
          <div>
            Daily Price!!
              </div>
          <div>
            Price on {getDate()}
          </div>
        </div>
        <div className='moving-header'>Daily Price doesn't gauranteed of correct price at particular time!!</div>
      </div>
      <div className='content'>
        <div className='filter'>
               { getOption('comodity', 'Commodity') }
               { getOption('price', 'Price') }
               { getOption('category', 'Category') }
               <button onClick={()=>setPrice([...data])}>Reset</button>
        </div>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Comodity</th>
              <th onClick={e=>setSortPriceFlag(!sortPriceFlag)}>Price Today</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {
              sortByDate(price).sort(sortPrice).map((obj, key) => (
                <tr className={hightlightPrice.indexOf(obj.id)>-1 && "higlight" || ""} key={`price-${key}`}>
                  <td>{obj.comodity}</td>
                  <td>
                    <p>{obj.price}</p>
                    <p>Prices was updated on {getDate(obj.date)}</p>
                  </td>
                  <td>{obj.category}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {(!price.length && <div className='no-data-found'>No Data Found for selected Filter</div>) || null}
      </div>
    </div>
  );
}

export default App;
