$(document).ready(function(){
    var unicorns = {
        "Randy": new Unicorn("Randy", "blue"),
        "Bob": new Unicorn("Bob", "green")
    };

    function move_unicorn(){
        var list_item = $(this).parent();
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
    $(".move-btn").click(move_unicorn);

    function add_unicorn(){
        var unicorn_inputs = $("#unicorn-inputs input");
        function check_inputs(all_inputs){
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
            var new_name = $("#unicorn-name").val(),
                new_color = $("#unicorn-color").val();
            $("#unicorn-name").val("");
            $("#unicorn-color").val("");

            unicorns[new_name] = new Unicorn(new_name, new_color);
            $("#"+new_name+"  .move-btn").click(move_unicorn);
        }

    }

    $("#add-new-unicorn").click(add_unicorn);
    $("#unicorn-inputs input").keypress(function(evt){
        var keycode = (evt.keyCode ? evt.keyCode : evt.which);
        if (keycode == "13") {
            add_unicorn();
        }
    });

});

var pasture = new TheArea(),
    corral = new TheArea();

function Unicorn(name, color){
    this.name = name;
    this.color = color;
    this.location = "corral";
    this.add_food = function(food){
        this.food = food;
    };
    this.roam = function(){
        this.location = "pasture";
        corral.remove_unicorn(this);
        pasture.add_unicorn(this);
        this.notify_location();
    };
    this.home = function(){
        this.location = "corral";
        pasture.remove_unicorn(this);
        corral.add_unicorn(this);
        this.notify_location();
    };
    this.notify_location = function(){
        console.log(this.name + " is now in the " + this.location);
    };
    this.to_html = function(){
        $("#the-"+this.location)
            .append("<li id='"+this.name+"' class='in-corral'>" + this.name + "<button class='move-btn'>Move</button></li>");
        }
    this.to_html();
}

function TheArea(){
    this.unicorns = {};
    this.add_unicorn = function(unicorn){
        this.unicorns[unicorn.name] = unicorn;
    };
    this.remove_unicorn = function(unicorn){
        delete this.unicorns[unicorn.name];
    };
}

