let titel = document.getElementById('titel');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create'
let tmp ;   
function getTotal(){
    if (price.value !='') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = "#040"
        
    }else{
        total.innerHTML = '';
        total.style.background = "#a00d02";
    }
    
}
//creatr product
  let datapro ;
 if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
    
 }else{
    datapro = [];
 }

submit.onclick = function(){
    let newpro = {
        titel:titel.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
       
       
    }
    if (titel.value!=''
     && price.value != '' 
     && category.value != ''
     && newpro.count < 100) {
        if (mood === "create") {
            if (newpro.count > 0) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                    
                }
                
            }
            else{
                datapro.push(newpro)
            }
            
        }else{ 
            datapro[tmp]=newpro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.background = 'block';
        }
       
    }
 
    

    //save localstorage
   
    localStorage.setItem('product',JSON.stringify(datapro))
    
    clearDate()
    showData()
}

//clear inputs
   function clearDate(){
    titel.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
    
   }

//read
function showData(){

    getTotal();
    let table ='';

    for (let i = 0; i < datapro.length; i++) {
        table += 
        `<tr>
        <td>${i+1}</td>
        <td>${datapro[i].titel}</td>
        <td>${datapro[i].parse}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick = "updataData(${i})" id="Update">Update</button></td>
        <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
        </tr>`
        
        
    }



    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if (datapro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick = "deleteAll()">DeleteAll (${datapro.length})</button>
        `
    }else{
        btnDelete.innerHTML = ""
    }
}
 showData();
 

// delete
function deleteData(i){
   datapro.splice(i,1);
   localStorage.product = JSON.stringify(datapro);
   showData()
}

function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData()
}

// count









//updata
 function updataData(i){
    titel.value = datapro[i].titel,
   
    price.value = datapro[i].price,
    taxes.value = datapro[i].taxes,
    ads.value = datapro[i].ads,
    discount.value = datapro[i].discount,
    getTotal(),
    count.style.display = "none"
    category.value = datapro[i].category,
    submit.innerHTML = 'updata',
    mood = 'updata',
    tmp = i
    scroll({
        top : 0,
        behavior:'smooth'
    })
 }

//search
let searchMood = 'title';

function getSearchMood(id){
    let search = document.getElementById('search');
    if (id == 'searchtitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.value = "";
    showData();

}

function searchData(value){
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < datapro.length; i++) {
               if ( datapro[i].titel.includes(value.toLowerCase())){
                table += 
                `<tr>
                <td>${i}</td>
                <td>${datapro[i].titel}</td>
                <td>${datapro[i].parse}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick = "updataData(${i})" id="Update">Update</button></td>
                <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                </tr>`

               }
            
        }
        
    }else{
        for (let i = 0; i < datapro.length; i++) {
            if ( datapro[i].category.includes(value.toLowerCase())){
             table += 
             `<tr>
             <td>${i}</td>
             <td>${datapro[i].titel}</td>
             <td>${datapro[i].parse}</td>
             <td>${datapro[i].taxes}</td>
             <td>${datapro[i].ads}</td>
             <td>${datapro[i].discount}</td>
             <td>${datapro[i].total}</td>
             <td>${datapro[i].category}</td>
             <td><button onclick = "updataData(${i})" id="Update">Update</button></td>
             <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
             </tr>`

            }
         
     }

    }
    document.getElementById('tbody').innerHTML = table;

}



//clean data