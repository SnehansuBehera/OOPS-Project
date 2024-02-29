from abc import ABC, abstractmethod

# ABSTRACT CLASS
class Bank(ABC):
    def __init__(self, name, age):
        # ENCAPSULATION
        self.name = name
        self.age = age

    # ABSTRACT METHOD
    @abstractmethod
    def withdraw(self):
        pass

    # ABSTRACT METHOD
    @abstractmethod
    def printDetails(self):
        pass

class Account(Bank):
    def __init__(self, name, id, n, a, b):
        # INHERITANCE
        self.b = b
        self.name = name
        self.id = id
        super().__init__(n, a)

    def withdraw(self,amt):
        # IMPLEMENTATION OF WITHDRAW METHOD
        if amt <= self.b:
            self.b-=amt
            print(f"Balance : ${self.b}\n")
        else :
            print(f"SORRY BALANCE IS LESS (BALANCE : ${self.b}) .\n") 

    def printDetails(self):
        # POLYMORPHISM
        super().printDetails()
        print(f"Owner Name: Mr. {self.name}")
        print(f"Account ID: {self.id}")
        print(f"Balance : ${self.b}")

def banking(accounts):
    # POLYMORPHISM
    for acc in accounts:
        acc.printDetails()
        print('\n\n')

def main():
    b1 = Account("Mr. Bob", 20025, "Bob", 20, 1000)
    b2 = Account("Mr. Tom", 20120, "Tom", 35, 1500)
    
    b1.withdraw(500)
    b2.withdraw(300)
    accounts = [b1, b2]
    banking(accounts)


    b1.withdraw(5000)
    b2.withdraw(5000)
    accounts = [b1, b2]
    banking(accounts)

if __name__ == "__main__":
    main()
