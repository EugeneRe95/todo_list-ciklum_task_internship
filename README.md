# todo_list-ciklum_task_internship-
Filterable Todo List
Functionality:
1. Create "todo" item
  •	displays modal window, all fields must be filled, otherwise is shown alert window
  •	all items store in LOCAL STORAGE, so after reloading all of them still will be displayed, all changes to be made by user will update local storage.
2.Each item has its own options-container, where it's possible to do some certain actions with "todo" item
  •	option "done" is set by default, as all of the items are set class open after creating. By clicking this option "todo" item changes its status to "done" and is updated by green box shadow; option is changed to "open". 
  •	option "edit" calls modal window; its fields are field with values of chosen "todo" item. After saving changes local storage is updated with edited item as well as UI.
  •	option "delete" removes "todo" item from local storage as well as from UI
3. Filtration
  •	by status
  •	by priority
  •	by title through changing search value
  •	all of these three options interact with each other, so the changing of the value of one will include values of others
