import random

def main():
    names = get_list()
    create_groupings(names)

def create_groupings(list):
    #Ask user for the group size
    while True:
        try:
            group_size = int(input("Enter group size: "))
            break
        except ValueError:
            print("Please Enter a number")

    #Ask the user if they want to shuffle
    shuffle = input("Do you want to shuffle (Enter Y for yes and N for no): ")

    #shuffle the list if they choose Yes
    if shuffle == "Y":
        random.shuffle(list)
   
    #print every item
    for item in list:
        print(item)
        #create a space if the count gets to the group size
        if (list.index(item) + 1) % group_size == 0:
            print("\n")



def get_list():
    #get the list from the user
    items = input('Enter names: ')
    #split the user input into an array
    return items.split(',')
   
main()