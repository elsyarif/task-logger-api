
Event Task Log app
#Stack NodeJS,Express,MongoDB,ReactJS
	----================----
		    Feature
	------------------------
* User
(User Hanya dapat merubah/menghapus event apa yg di buat saja)
* Todo List 		(realtime)
(Kegiatan yang akan di kerjakan)
* Event Scheduler	(realtime)
  -- Full Calender
( Penjadwalan Tugas berdasarkan tanggal)
* Event Task		(realtime)
(membuat event dengan banayak tugas dengan waktu penyelesaiannya)
* Loger			(realtime)
()
	------------DATA-------------
* Todo List
  id, title, description, status, create_at, update_at, user_groupid, 
* Event Scheduler
  id, title, description, sart_date, end_date, create_at, update_at, user_groupid,
* Event Task
  id, title, description, status, create_at, update_at, user_groupid,
	-- events (json)
		id, title, sart_date, end_date, 

	------------PAGES-------------
* User Register
* User Login

# Data Show Filter by User Login/User Group
* Todo List
  - Create Todo
  - Update Todo
* Event Scheduler
  - Create Scheduler (Full Calender)
  - List Scheduler 
* Event Task
  - Create Event
  - List Event
