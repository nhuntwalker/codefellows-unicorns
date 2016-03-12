# unicorn rancher
# keeping track of unicorn locations
# locations: pasture, corral
# options for adding locations
# options for adding second ranch

class Unicorn(object):
    def __init__(self, color, name):
        self.color = color
        self.name = name
        self.location = "corral"
        corral.add_unicorn(self)

    def add_food(self, food):
        self.food = food

    def roam(self):
        self.location = "pasture"
        pasture.add_unicorn(self)
        corral.remove_unicorn(self)
        self.notify_location()

    def home(self):
        self.location = "corral"
        pasture.remove_unicorn(self)
        corral.add_unicorn(self)
        self.notify_location()

    def notify_location(self):
        print "{0} is now in the {1}".format(self.name, self.location)

class Area(object):
    def __init__(self):
        self.unicorns = {}

    def add_unicorn(self, unicorn):
        self.unicorns[unicorn.name] = unicorn

    def remove_unicorn(self, unicorn):
        self.unicorns.pop(unicorn.name)

    def list_all_unicorns(self):
        for unicorn_name in self.unicorns.keys():
            print unicorn_name


corral = Area()
pasture = Area()

randy = Unicorn("blue", "randy")
randy.roam()

