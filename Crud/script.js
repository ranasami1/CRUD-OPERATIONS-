let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('submit');
let search = document.getElementById('search'); 
let mood = 'create';
let temp;

//functions
//get total
function getTotal(){
     if(price.value !=""){
        let result = (+price.value + +taxes.value) - +discount.value;
        total.innerHTML = result;
        total.style.background ='lightgreen';
     }
     else{
        total.innerHTML ='';
        total.style.background='rgb(184, 122, 50)';
     }
}

//creat product
//save lacalstorage

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}
else{
    dataPro = [];
}

 function cr(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        
    }

    //count
    if (mood === 'create')
    {
    if(newpro.count > 1){
        for( let i = 0 ; i < newpro.count ; i++){
            dataPro.push(newpro);
        }
    }
    else{
        dataPro.push(newpro);
    }
    }
    else{
    dataPro[temp] = newpro;
    mood = 'create';
    submit.innerHTML ='Create';
    count.style.display = 'block';
        }
    
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
} 

//clear inputs
 function clearData(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    discount.value ='';
    total.innerHTML='';
    count.value='';
    category.value='';
 }


//read

function showData(){
    getTotal();
    let table ='';
    for(let i = 0 ; i < dataPro.length ; i++){
        table += `
        <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update </button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete </button></td>
        </tr> 
        `
    } 

    document.getElementById('tbody').innerHTML = table; 
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick='deleteAll()'> Delete All (${dataPro.length}) </button>
        `
    }
    else{
        btnDelete.innerHTML ='';
    }
}
showData();


//delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();

}

//delete all
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


//update

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = "none";
    submit.innerHTML='Update';
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior:"smooth",

    })

}

//search
let searchMood = 'title';
function getsearchMood(id)
{
    if(id == 'searchtitle'){
        searchMood = 'title';
        search.placeholder = 'search by title';
    }
     else if(id == 'searchcategory')
     {
        searchMood = 'category';
        search.placeholder = 'search by category';
    }
search.focus()
search.value ='';
showData();
  
}
function searchData(value)
{
    let table = '';
    if(searchMood == 'title'){
        for( let i = 0 ; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td><button onclick="updateData(${i})" id="update">Update </button></td>
                                <td><button onclick="deleteData(${i})" id="delete">Delete </button></td>
                    </tr> 
                    `


            }
        }  
    }
    else{
        for( let i = 0 ; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td><button onclick="updateData(${i})" id="update">Update </button></td>
                                <td><button onclick="deleteData(${i})" id="delete">Delete </button></td>
                    </tr> 
                    `


                }    }

    }

    document.getElementById('tbody').innerHTML = table;

}


