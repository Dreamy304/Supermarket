class Product extends HTMLElement {
  connectedCallback() {
    getAllProducts()
    getCategories()
    this.innerHTML = `<div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Clients</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Clients</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Clients</li>
                </ol>
              </nav>
            </div>
            <div class="col-lg-6 col-5 text-right">
              <a href="#" class="btn btn-sm btn-neutral">New</a>
              <a href="#" class="btn btn-sm btn-neutral" id="filter" >Filters</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card">
            <!-- Card header -->
            <div class="card-header border-0">
              <h3 class="mb-0">Light table</h3>
            </div>
            <!-- Light table -->
            <div class="row" id="tb-products">
              
            </div>
            <!-- Card footer -->
            <div class="card-footer py-4">
              <nav aria-label="...">
                <ul class="pagination justify-content-end mb-0">
                  <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">
                      <i class="fas fa-angle-left"></i>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      <i class="fas fa-angle-right"></i>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
     </div>
    </div>`;
  }
}

customElements.define('sm-product', Product);

let getCategories = () => {
      let param = `query{categories{id,categoryName,isActive,createdDate,lastupdatedDate}}`
      let url = `${apis.CATEGORY}?query=${param}`
      getAPIdata(url, requestType.POST, {}).then((res)=>{
          populateCategories(res.data.categories)
      })
}

let populateCategories=(category)=>{
var filter=`<div class="dropdown">
              <a href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filter
              </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">`;

for (let index = 0; index < category.length; index++) {
  filter+=`<a class="dropdown-item fa fa-cog" href="#">&nbsp;${category[index].categoryName}</a>`
}
filter+=`</div></div>`
// $('.dropdown-menu').css('z-index',1001)
$('#filter').html(filter)
}

let getAllProducts = () => {
  let param = `query{products(clientId:"${user.clientId}"){id,productName,categoryId,brand,price,isActive,image,createdDate,lastupdatedDate}}`
  let url = `${apis.PRODUCT}?query=${param}`
  getAPIdata(url, requestType.POST, {}).then((res)=>{
      populateProductTable(res.data.products)
  })
}

let populateProductTable=(res)=>{
  // var table=`<table class="table align-items-center table-flush" id="dt-products">
  // <thead class="thead-light">
  //                 <tr>
  //                   <th scope="col" class="sort">Name</th>
  //                   <th scope="col" class="sort">Address</th>
  //                   <th scope="col" class="sort">Contact No</th>
  //                   <th scope="col" class="sort">Email</th>
  //                   <th scope="col" class="sort">Status</th>
  //                   <th></th>
  //                 </tr>
  //               </thead>
  //               <tbody class="list">
                // `
                var card='';
  for (let i = 0; i < res.length; i++) {

    card+=`<div class="col-xl-4 order-xl-2 m-2">
    <div class="card card-profile">
    <img src="./assets/img/theme/img-1-1000x600.jpg" alt="Image placeholder" class="card-img-top">
      <div class="row justify-content-center">
        <div class="col-lg-3 order-lg-2">
          <div class="card-profile-image">
            <a href="#">
              <img src="${res[i].image}" class="rounded-square">
            </a>
          </div>
        </div>
      </div>
      <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
       
      </div>
      <div class="card-body pt-0">
        <div class="text-center">
          <h5 class="h3">
            <span class="font-weight-light" style="color:white">Palak lelo palak</span>
          </h5>
          <div class="h5 font-weight-300">
            <i class="ni location_pin mr-2"></i>
          </div>
          <div class="h5 mt-4">
            <i class="ni business_briefcase-24 mr-2"></i>${res[i].productName}
          </div>
          <div>
            <i class="ni education_hat mr-2"></i>${res[i].brand}
            <i class="ni business_briefcase-24 mr-2"></i>Rs. ${res[i].price}
          </div>
        </div>
      </div>
    </div>
  </div>`

    {/* table+=`<tr>
    <th scope="row">
      <div class="media align-items-center">
        <div class="media-body">
          <span class="name mb-0 text-sm">${res[i].name}</span>
        </div>
      </div>
    </th>
    <td>
      ${res[i].address}
    </td>
    
    <td>
    ${res[i].contactNo}
    </td>
    <td>
    ${res[i].email}
    </td>
<td>
      <span class="badge badge-dot mr-4">
        <i class="bg-${res[i].isActive?"success":"warning"}"></i>
        <span class="status">${res[i].isActive===true?"Active":"Not Active"}</span>
      </span>
    </td>
    <td class="text-right">
      <div class="dropdown">
        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-ellipsis-v"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
          <a class="dropdown-item fa fa-plus" href="#">&nbsp;Add</a>
          <a class="dropdown-item fa fa-pencil" href="#">&nbsp;Update</a>
          <a class="dropdown-item fa fa-trash" href="#">&nbsp;Delete</a>
        </div>
      </div>
    </td>
  </tr>` */}
    
  }
  {/* table+=`</tbody>
  </table>`
  $('#tb-products').html(table);
  $('#dt-products').DataTable(); */}

  $('#tb-products').html(card);
}