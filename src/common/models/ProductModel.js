/**
 * Model used to manage the products, extra metadata for each product, and the product cache, in the application.
 * @param $q
 * @param inventoryService
 * @constructor
 */
var ProductModel = function($q, inventoryService) {

    var productCache = {};
    var productWithCategoryCollection = {};


    /**
     * Get all product categories, from cache if available. If the categories have not been cached we will load them with the Inventory Service.
     * @returns {Promise.promise|*}
     */
    this.getProductsCategories = function()
    {
        var deferred = $q.defer();
        var _that = this;
        if( productWithCategoryCollection.length > 0 )
        {
            deferred.resolve(productWithCategoryCollection);
        }
        else
        {
            inventoryService.getItemsWithCategories()
                .success(function(data) {
                    // group items by category
                    _that.productWithCategoryCollection = _that.itemsGroupedByCategory(data.items);
                    deferred.resolve(_that.productWithCategoryCollection);
                });

        }
        return deferred.promise;
    };

    /**
     * Get a single category with the InventoryService.
     * @param categoryId
     * @returns {Promise.promise|*}
     */
    this.getCategory = function( categoryId )
    {
        var deferred = $q.defer();
        var _that = this;
        inventoryService.getCategory(categoryId).success(function(data){
            for( var item in data.category.items )
            {
                // merge the clover data with our product data
                data.category.items[item] = _that.getProduct(data.category.items[item]);
            }

            //todo: cache this result
            deferred.resolve( data.category );
        });
        return deferred.promise;
    };


    /**
     * Merge the Clover product data with our MOCK data for the extra properties we need.
     * Eventually this method could call an db/service to get real data
     * @param item
     * @returns {*}
     */
    this.getProduct = function(item)
    {
        if( productCache[item.id] !== undefined )
        {
            return productCache[item.id];
        }
        else
        {
            // The clover API will return product with the code in one of two properties. .code or .itemCode
            var product = {};
            if( item.code !== undefined)
            {
                product = products[item.code];
                product.itemCode = item.code;
            }else if( item.itemCode !== undefined)
            {
                product = products[item.itemCode];
                product.code = item.itemCode;
            }

            // set default
            if( product.unitQty === undefined )
            {
                product.unitQty = 1;
            }


            // merge the MOCK data with the Clover data
            for( var key in product )
            {
                item[key] = product[key];
            }
            productCache[item.id] = item;
            return item;
        }
    };


    /**
     * Take all of the products and group them into different data sets based on their category.
     * @param items
     * @returns {{}}
     */
    this.itemsGroupedByCategory = function(items) {
        var categories = {};
        var _that = this;

        angular.forEach(items, function(item)
        {
            item = _that.getProduct(item);

            angular.forEach(item.categories, function(category) {
                var commonCategory = categories[category.id];

                if (!commonCategory) {
                    commonCategory = categories[category.id] = category;
                    commonCategory.items = [item];
                } else {
                    commonCategory.items.push(item);
                }
            });
        });

        return categories;
    };


    // A Fake Description for all products, based on the Bacon Ipsum generator.
    var baconIpsum = "<p>Bacon ipsum dolor sit amet hamburger venison shankle, ut beef ribs tail leberkas commodo deserunt mollit drumstick elit doner labore sint. Anim andouille sirloin in beef ribs. Meatball non swine, shankle capicola veniam consequat occaecat pancetta eu salami dolor dolore consectetur. Aliquip tri-tip pork enim biltong corned beef proident ribeye laborum qui ut ut. Fugiat t-bone doner, shank short ribs meatloaf pancetta tail exercitation tenderloin anim ullamco drumstick. Andouille turkey nisi duis, cow sunt biltong flank bacon pork ex sirloin dolor.</p><p>Jowl magna nostrud, reprehenderit venison proident tempor elit ullamco aliquip sausage shank do. Cupidatat kielbasa dolore, excepteur frankfurter velit beef ball tip tail exercitation corned beef commodo doner. Incididunt ribeye turkey nostrud, eiusmod aute rump in pancetta. Leberkas pork exercitation, ground round in jerky duis. Ham hock labore meatball spare ribs tail t-bone.</p>";


    /**
     * MOCK data for all of the products defined in the Clover API.
     */
    var products = {};
    // jeans
    products['UM01001'] = {code:"UM01001",name:"Levis 505 Bombshell Boyfriend", tags:"womens,jeans", images:"UM01001-1.png,UM01001-2.png,UM01001-3.png", description:baconIpsum};
    products['UM01002'] = {code:"UM01002",name:"Washed Denim Overall", tags:"womens,jeans", images:"UM01002-1.png,UM01002-2.png,UM01002-3.png", description:baconIpsum};
    products['UM01003'] = {code:"UM01003",name:"Oil Stained Destroyed Boyfriend Jean", images:"UM01003-1.png,UM01003-2.png,UM01003-3.png", tags:"womens,jeans", description:baconIpsum};
    products['UM01004'] = {code:"UM01004",name:"Raw Destroyed Boyfriend", tags:"womens,jeans", images:"UM01004-1.png,UM01004-2.png,UM01004-3.png", description:baconIpsum};
    products['UM01005'] = {code:"UM01005",name:"Bonsai Boy Crop", tags:"womens,jeans", images:"UM01005-1.png,UM01005-2.png,UM01005-3.png", description:baconIpsum};
    products['UM01006'] = {code:"UM01006",name:"Rascal Washed Overall", tags:"womens,jeans", images:"UM01006-1.png,UM01006-2.png,UM01006-3.png", description:baconIpsum};

    // sweaters
    products['UM02001'] = {code:"UM02001",name:"Perimeter Cardigan", tags:"womens,sweater", images:"UM02001-1.png,UM02001-2.png,UM02001-3.png", description:baconIpsum};
    products['UM02002'] = {code:"UM02002",name:"Solid Fringe Maxi Cardi", tags:"womens,sweater", images:"UM02002-1.png,UM02002-2.png,UM02002-3.png", description:baconIpsum};
    products['UM02003'] = {code:"UM02003",name:"Bonsai Boy Cardigan", tags:"womens,sweater", images:"UM02003-1.png,UM02003-2.png,UM02003-3.png", description:baconIpsum};
    products['UM02004'] = {code:"UM02004",name:"Wow Cardi", tags:"womens,sweater", images:"UM02004-1.png,UM02004-2.png,UM02004-3.png", description:baconIpsum};
    products['UM02005'] = {code:"UM02005",name:"Swing Time Cardigan", tags:"womens,sweater", images:"UM02005-1.png,UM02005-2.png,UM02005-3.png", description:baconIpsum};
    products['UM02006'] = {code:"UM02006",name:"Hendrix Yarn Fringe Poncho", tags:"womens,sweater", images:"UM02006-1.png,UM02006-2.png,UM02006-3.png", description:baconIpsum};

    // tops
    products['UM03001'] = {code:"UM03001",name:"We The Free Little League Tee", tags:"womens,top,shirt", images:"UM03001-1.png,UM03001-2.png,UM03001-3.png", description:baconIpsum};
    products['UM03002'] = {code:"UM03002",name:"Sweater Pieced Pullover", tags:"womens,top,shirt", images:"UM03002-1.png,UM03002-2.png,UM03002-3.png", description:baconIpsum};
    products['UM03003'] = {code:"UM03003",name:"Eye For Detail Top", tags:"womens,top,shirt", images:"UM03003-1.png,UM03003-2.png,UM03003-3.png", description:baconIpsum};
    products['UM03004'] = {code:"UM03004",name:"We The Free Diamond Washed Tee", tags:"womens,top,shirt", images:"UM03004-1.png,UM03004-2.png,UM03004-3.png", description:baconIpsum};
    products['UM03005'] = {code:"UM03005",name:"We The Free Urban Cowgirl Henley", tags:"womens,top,shirt", images:"UM03005-1.png,UM03005-2.png,UM03005-3.png", description:baconIpsum};
    products['UM03006'] = {code:"UM03006",name:"We The Free Ruffle Pullover", tags:"womens,top,shirt", images:"UM03006-1.png,UM03006-2.png,UM03006-3.png", description:baconIpsum};

    // dresses
    products['UM04001'] = {code:"UM04001",name:"Roomy Ruffle Dress", tags:"womens,dress", images:"UM04001-1.png,UM04001-2.png,UM04001-3.png", description:baconIpsum};
    products['UM04002'] = {code:"UM04002",name:"Skyfall Embroidered Dress", tags:"womens,dress", images:"UM04002-1.png,UM04002-2.png,UM04002-3.png", description:baconIpsum};
    products['UM04003'] = {code:"UM04003",name:"Raven Off The Shoulder Dress", tags:"womens,dress", images:"UM04003-1.png,UM04003-2.png,UM04003-3.png", description:baconIpsum};
    products['UM04004'] = {code:"UM04004",name:"Sunset Stripe Slip", tags:"womens,dress", images:"UM04004-1.png,UM04004-2.png,UM04004-3.png", description:baconIpsum};
    products['UM04005'] = {code:"UM04005",name:"Tie Dye Cap Sleeve Maxi", tags:"womens,dress", images:"UM04005-1.png,UM04005-2.png,UM04005-3.png", description:baconIpsum};
    products['UM04006'] = {code:"UM04006",name:"Looks Like An Angel Maxi Dress", tags:"womens,dress", images:"UM04006-1.png,UM04006-2.png,UM04006-3.png", description:baconIpsum};

    // skirts
    products['UM05001'] = {code:"UM05001",name:"Abbie's Limited Edition Skirt", tags:"womens,skirt", images:"UM05001-1.png,UM05001-2.png,UM05001-3.png", description:baconIpsum};
    products['UM05002'] = {code:"UM05002",name:"Patched Beach Skirt", tags:"womens,skirt", images:"UM05002-1.png,UM05002-2.png,UM05002-3.png", description:baconIpsum};
    products['UM05003'] = {code:"UM05003",name:"Printed Tattered Circles Maxi", tags:"womens,skirt", images:"UM05003-1.png,UM05003-2.png,UM05003-3.png", description:baconIpsum};
    products['UM05004'] = {code:"UM05004",name:"Romance Beach Skirt", tags:"womens,skirt", images:"UM05004-1.png,UM05004-2.png,UM05004-3.png", description:baconIpsum};
    products['UM05005'] = {code:"UM05005",name:"Boho Print Convertible Maxi", tags:"womens,skirt", images:"UM05005-1.png,UM05005-2.png,UM05005-3.png", description:baconIpsum};
    products['UM05006'] = {code:"UM05006",name:"Heirloom Maxi Skirt", tags:"womens,skirt", images:"UM05006-1.png,UM05006-2.png,UM05006-3.png", description:baconIpsum};

};

ProductModel.$inject = ['$q', 'inventoryService'];
module.exports = ProductModel;


