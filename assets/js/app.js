
var products = {books: [], albums: []};
var selectCategories = ''; // items to be shown in the dropdown lists
var html = ''; // temporary variable used to add html to content div


// some books
products.books = [
	{
		id: 'book1',
		name: 'The godfather',
		price: '50',
		img: 'b1.jpg',
		category: 'Literature',
		author: 'Mario Puzo'
	},
	{
		id: 'book2',
		name: 'The deal of a lifetime',
		price: '10',
		img: 'b2.jpg',
		category: 'Fiction',
		author: 'Fredrick Backman'
	}
];

// some albums
products.albums = [
	{
		id: 'album1',
		name: 'Ghost stories',
		price: '10',
		img: 'a1.jpg',
		category: 'Music',
		author: 'Coldplay'
	},
	
	{
		id: 'album2',
		name: 'Ghost story',
		price: '15',
		img: 'a1.jpg',
		category: 'Music',
		author: 'Coldplay'
	},
	{
		id: 'album3',
		name: 'lol',
		price: '52',
		img: 'a2.jpg',
		category: 'Music',
		author: 'he5a'
	},
	{
		id: 'album4',
		name: 'bo',
		price: '125',
		img: 'a1.jpg',
		category: 'Music',
		author: 'no'
	}
];


$(document).ready(function () {

	// selected product kind from the dropdown list
	var selectedCategory = '';

	// Find all product kinds available
	for (var element in products) {
		selectCategories += '<option value="' + element + '">' + element + '</option>';
	}
	// Add these products to the select tag
	$('#category_select').append($(selectCategories));

	// this is used to change the page content when the user tries to search
	// for a specific product
	// it shows all the products that their names contains the letters he is typing
	// regardless of these letters are in the beginning of a word on in it
	$('#search').keyup(debounce(function() {
		$('#content').empty();
	    var val = $(this).val();
	    var noResults = true; // flag used to check if a product was found or not
	    var searchResults = []; // temporary array used to store search results
	    // search depending on the selected option
	    if (selectedCategory == 'all') {
	    	for (var element in products) {
				searchResults = _.filter(products[element], function(item){ return item.name.toLowerCase().indexOf(val) > -1; });
				if (searchResults.length > 0) {
					display(searchResults);
					noResults = false;
				}
		    }
		    
	    } else {
	    	searchResults = _.filter(products[selectedCategory], function(item){ return item.name.toLowerCase().indexOf(val) > -1; });
	    	if (searchResults.length > 0) {
				display(searchResults);
				noResults = false;
			}
	    }

	    // If no product found
	    if (noResults) {
	    	$('#content').append('<h1 class="products no-products">There are no products match your criteria currently</h1>');
	    }
	    noResults = true;
		

	}, 300));

	// Real time page content change when the selected option is changed
	$('#category_select')
  		.change(function () {
  			$('#content').empty();
		    
		    $( 'select option:selected' ).each(function() {
		    	selectedCategory = $(this).val() + '';
		    });
		    if (selectedCategory == 'all') {
		    	displayAll();
		    }
		    else if (products[selectedCategory].length == 0) {
				$('#content').append('<h1 class="products no-products">There is no products in this kind, kindly try to select another kind<br />or insert some products</h1>');
		    } else display(products[selectedCategory]);
		    
		})
  	.change();

  	// Change page content into a form that is used to add a new product
  	// this page contains an option that allows the user to add a new product kind
  	// when he does add a new kind, it updates the dropdown instantly
  	$('#add_product').click(function(){
		addForm();
		// if cancelled, go back
		$('#cancel_btn').click(function(){
			displayAll();
		});

		// when the user submits the data he entered
		// update products' object
		$('#add_product_form').submit(function( event ) {
			event.preventDefault();
			var kind = $('#category_select_in').find(":selected").text();
			console.log(products[kind]);
			var temp = {};
			
			console.log(kind + products[kind].length);
			temp.id = kind + products[kind].length;
			temp.name = $('#name').val();
			temp.price = $('#price').val();
			temp.category = $('#category').val();
			temp.author = $('#author').val();
			temp.img = 'a2.jpg';
			console.log(temp);
			products[kind].push(temp);
			displayAll();
		});
		
		// here is the option mentioned above
		// this link when clicked, opens a modal containing an input field
		// user is asked to enter his desired product kind
		// if the entered kind exists, an error message appears
		$('#add_kind').click(function(){
	  		$('#addKindModal').modal('show');
  			console.log('Hello');
			$('#add_kind_form').submit(function(event) {
				event.preventDefault();
				console.log('CLICKEDDDD');
				var newKind = $('#kind').val().toLowerCase();
				for (var element in products) {
					if (element == newKind) {
						var kindExist = true;
						console.log('bdan');
						
					}
				}
				if (kindExist) {
					$('#kind_error').html('This kind already exists, please try another one!');
				} else {
					products[newKind] = [];
					udateList(newKind);
					console.log(products);
					$('#addKindModal').modal('hide');
				}
				
			});
	  	});
	});
	
});


// show all products from all kinds
function displayAll(){
	$('#content').empty();
	for (var element in products) {
		if (element.length != 0) {
			display(products[element]);
		}
	}
};

// show ONLY selected kind's products
function display(kind){
	
	html = '<div class="products">';
	for (var i = 0; i < kind.length; i++) {
		console.log(i);
		console.log(kind[i].id);
		
		if((i+1) % 4 == 0 || i == 0){
			html += '<div class="row">';
		}
		
		html += '<div class="col-md-3">'
				+ '<div class="product" id="' + kind[i].id + '">'
				+ '<div class="product-img">'
				+ '<img src="./assets/img/' + kind[i].img + '" class="product-img-s"/>'
				+ '</div>'
				+ '<div class="product-name">'
				+ '<h4>' + kind[i].name + '</h4>'
				+ '</div>'
				+ '<div class="product-price">'
				+ '<h5>' + kind[i].price + '</h5>'
				+ '</div>'
				+ '<div class="product-category">'
				+ '<h6>' + kind[i].category + '</h6>'
				+ '</div>'
				+ '<div class="product-author">'
				+ '<p>' + kind[i].author + '</p>'
				+ '</div></div></div>'
				;		
	}
	html += '</div></div>';

	$('#content').append($(html));
	html = '';

};

// Create the add product's form
function addForm(){
	$('#content').empty();	
	html = `<div class="col-md-8 col-xs-12 col-md-push-2 no-padding">
                <div class="middle-content">
                    <div class="container-fluid">
                        <div class="col-md-8 col-md-push-2 col-xs-12">
                            <div class="col-md-12 col-xs-12">
							    <div class="row">
							        <div class="col-md-12">
							            <h1>Add new Item</h1>
							        </div>
							    </div>
							    <div class="row">
							        <div class="col-md-12 padding-top">
							            <form id="add_product_form" method="post">
							                <div class="form-group">
							                    <div class="input-item">
								                    <label for="name">Product Kind:</label>
								                    <select id="category_select_in" name="category_select_in" class="form-control">

			                `
			                + selectCategories +
			                `
			                						</select>
			                						<sub>Can't find your desired kind <a href="#" class="small-link" id="add_kind"
			                							>ADD NEW KIND</a></sub>
			            						</div>
			            						<div class="input-item">
								                    <label for="name">Product Name:</label>
								                    <input type ="text" maxlength="100" class="form-control custom-input" id="name" name="name" placeholder="Name of the product" required>
							                    </div>
							                    <div class="input-item">
								                    <label for="name">Product price:</label>
								                    <input type ="number" class="form-control custom-input" id="price" name="price" placeholder="Price" required>
							                    </div>
							                    <div class="input-item">
								                    <label for="name">Product category:</label>
								                    <input type ="text" maxlength="100" class="form-control custom-input" id="category" name="category" placeholder="Product's category" required>
							                    </div>
							                    <div class="input-item">
								                    <label for="name">Product Author/Creator:</label>
								                    <input type ="text" maxlength="100" class="form-control custom-input" id="author" name="author" placeholder="Author/Creator" required>
							                    </div>
							     	            <!--
							     	            <div class="input-item">
												    <label class="img-input-label" for="img">Product picture</label>
												    <input type="file" id="img" accept=".jpg, .jpeg, .png">
												</div>
												-->
							                    <div class="input-item right-btns">
								                    <div class="input-item inline">
									                    <button type="submit" class="btn custom-btn submit-btn">
									                        Add
									                    </button>
								                    </div>
								                    <div class="input-item inline">
									                    <a class="btn custom-btn cancel-btn" id="cancel_btn">
								                            Cancel
									                    </a>
								                    </div>
							                    </div>
							                </div>
							            </form>
							        </div>
							    </div>
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
	
	$('#content').append($(html));
	html = '';
};

// update the select dropdown list with new added product kind
function udateList(kind){
	var tempKind = '<option value="' + kind + '">' + kind + '</option>';
	$('#category_select').append($(tempKind));
	$('#category_select_in').append($(tempKind));
};

// wait some time before checking search results
function debounce(func, wait, immediate) {
  	var timeout;
  	return function() {
    	var context = this,
      	args = arguments;
    	var later = function() {
	      	timeout = null;
	      	if (!immediate) func.apply(context, args);
    	};
    	var callNow = immediate && !timeout;
    	clearTimeout(timeout);
    	timeout = setTimeout(later, wait);
    	if (callNow) func.apply(context, args);
  	};
};
