$(document).ready(function(){
    // set of unicorns that will be added to as new unicorns are added
    var unicorns = {
        "Randy": new Unicorn("Randy", "blue"),
        "Bob": new Unicorn("Bob", "green")
    };

    function move_unicorn(){
        /*
        * call this function to move a unicorn either from the pasture to
        * the corral, or from the corral to the pasture
        */
        var list_item = $(this).parent(); // get the parent of the move button
        if (list_item.attr("class") === "in-corral") {
            unicorns[list_item.attr("id")].roam()

            var the_pasture = $("#the-pasture");
            the_pasture.append(list_item);
            list_item.removeClass("in-corral").addClass("in-pasture");

        } else {
            unicorns[list_item.attr("id")].home()

            var the_corral = $("#the-corral");
            the_corral.append(list_item);
            list_item.removeClass("in-pasture").addClass("in-corral");
        }        
    }

    // any existing move button calls move_unicorn on click
    $(".move-btn").click(move_unicorn); 

    function add_unicorn(){
        /*
        * Call this function to add a unicorn to the total set of unicorns.
        * By default, any added unicorn starts in the corral.
        */
        var unicorn_inputs = $("#unicorn-inputs input");
        function check_inputs(all_inputs){
            /*
            * just check to make sure all the input fields are filled out.
            * If not, highlight the field with missing data
            */
            var truthy = true;
            for (var ii=0; ii<unicorn_inputs.length; ii++){
                if ($(unicorn_inputs[ii]).val() == ""){
                    truthy = false;
                    $(unicorn_inputs[ii]).addClass("incorrect-field");
                } else {
                    $(unicorn_inputs[ii]).removeClass("incorrect-field");                    
                }
            }

            return truthy;
        }
        if (check_inputs(unicorn_inputs)) {
            // after harvesting input data, add the unicorn and clear the fields
            var new_name = $("#unicorn-name").val(),
                new_color = $("#unicorn-color").val();
            $("#unicorn-name").val("");
            $("#unicorn-color").val("");

            unicorns[new_name] = new Unicorn(new_name, new_color);
            unicorns[new_name].notify_location();
            $("#"+new_name+" .move-btn").click(move_unicorn);
        }

    }

    /* 
    * should be able to add a unicorn by either clicking the big pink button, or
    * by pressing "enter" when in either input field.
    */
    $("#add-new-unicorn").click(add_unicorn);
    $("#unicorn-inputs input").keypress(function(evt){
        var keycode = (evt.keyCode ? evt.keyCode : evt.which);
        if (keycode == "13") {
            add_unicorn();
        }
    });

});

/*
* For now, there's just the pasture and the corral. They are both instances of
* the TheArea object.
*/
var pasture = new TheArea(),
    corral = new TheArea();

function Unicorn(name, color){
    /*
    * the Unicorn constructor function. Takes in a name and color as attributes.
    * The default location for any unicorn is in the corral
    */
    this.name = name;
    this.color = color;
    this.location = "corral";
    this.add_food = function(food){
        /*
        * method for specifying the unicorn's favorite food. This feature will 
        * be used later when feeding unicorns becomes possible.
        */
        this.food = food;
    };
    this.roam = function(){
        /* 
        * call this method to remove this unicorn from the corral and put it in
        * the pasture. There, they will feed.
        */
        this.location = "pasture";
        corral.remove_unicorn(this);
        pasture.add_unicorn(this);
        this.notify_location();
    };
    this.home = function(){
        /* 
        * call this method to remove this unicorn from the pasture and put it in
        * the corral. There, they will sleep.
        */
        this.location = "corral";
        pasture.remove_unicorn(this);
        corral.add_unicorn(this);
        this.notify_location();
    };
    this.notify_location = function(){
        /* 
        * call this method to set a notice about having moved this unicorn.
        */
        var msg = this.name + " is now in the " + this.location + ".";
        $("#message").text(msg);            
        $("#message").animate({
            opacity: 1
        }, 1000);
        setTimeout(function(){
            $("#message").animate({
                opacity: 0
            }, 1000)
        }, 2000);
    };
    this.to_html = function(){
        /* 
        * call this method to set the unicorn in the proper place to start.
        */
        $("#the-"+this.location)
            .append("<li id='"+this.name+"' class='in-corral'>" + 
                this.name + "<button class='move-btn'>Move</button></li>");
        }
    this.to_html();
}

function TheArea(){
    /*
    * The constructor function for any area. Has methods for adding and removing
    * resident unicorns.
    */
    this.unicorns = {};
    this.add_unicorn = function(unicorn){
        this.unicorns[unicorn.name] = unicorn;
    };
    this.remove_unicorn = function(unicorn){
        delete this.unicorns[unicorn.name];
    };
}

