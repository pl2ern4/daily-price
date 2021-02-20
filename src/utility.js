export const getChangedId = array =>{
    let changedId = [];
    const uniqueComodityArr = uniqueComodity(array);
    for(let o of uniqueComodityArr){
        changedId = [...changedId,...getChangedRates(array.filter(obj=>o===obj.comodity))];
    }
    return changedId;
}

const getChangedRates = param =>{
    const array = sortByDate(param);
    const len = array.length;
    const changedId = [];
    for(let o=1; o<=len-1;o++){
        if(array[o] && array[o-1].price!== array[o].price){
            changedId.push(array[o].id);
        }
    }
    return changedId;
}

export const getDate = params => (params && new Date(params) || new Date()).toDateString();

export const sortByDate = array =>array.sort((a,b)=>new Date(a.date) - new Date(b.date)>1 && -1 || 1);

const uniqueComodity= array => Array.from(new Set([...array.map(obj=>obj.comodity)]));