//function to make sure subtotals and totals are not numbers but currency

function formatCurrency(value) {
    if (typeof value == 'string') {
        var x = value.indexOf(".");
        var y = value.length;
        if (x === -1) {
            return value + ".00";
        } else if (y - x === 2) {
            return value + "0";
        } else {
            return value;
        }
    } else {
        return value.toFixed(2);
    }
}

//Item constructor

function Item(name, price, quantity) {
    var self = this;
    self.name = name;
    self.price = ko.observable(price);
    self.quantity = ko.observable(quantity);
    self.subtotal = ko.computed(function() {
        return self.quantity() * self.price();
    });

}

//knockout js viewmodel

function ViewModel() {
    var self = this;
    self.newItemName = ko.observable();
    self.newItemPrice = ko.observable(0);
    self.newItemQuantity = ko.observable(1);
    self.itemsInCart = ko.observableArray([]);
    self.grandtotal = ko.pureComputed(function() {
        var total = 0;
        $.each(self.itemsInCart(), function() { total += this.subtotal() });
        return total;
    });

    self.addNewItem = function () {

        var newItem = new Item(
            self.newItemName(),
            self.newItemPrice(),
            self.newItemQuantity()


        );


        self.itemsInCart.push(newItem);
        self.newItemName("");
        self.newItemPrice(0);
        self.newItemQuantity(1);

        //use sort() to alphabetise
        self.itemsInCart.sort(function (a, b)
        { return a.name == b.name ? 0 : (a.name < b.name ? -1 : 1) });

        //removes item if delete button is pressed
            self.removeItems = function (name) {
                self.itemsInCart.remove(name);
            };



    };

    self.addNewItemEnabled = ko.pureComputed(function() {
        var name = self.newItemName();
        var price = self.newItemPrice();



        return name && price && name.length;
    }, self);
}

ko.applyBindings(new ViewModel());
