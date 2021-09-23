pengertian emit broadcase di socket.io

##socket.io event task broadcase dataflow

*apakah perlu menggunakan room untuk membuat notofikasi*

1. user berhasil login 
	kemudian kirim siaran ke semua user yang telah login kecuali user sendiri.
	flsh message (notofikasi)

2. new user register
	kirim siaran kesemua user yang telah login 
	flsh message (notofikasi)

3. data create, update, delete
	realtime data show ke semua user jika berada pada page tersebut
	atau bisa juga berupa notifikasi ke user group yang berhubungan dengan data tersebut kecuali user yang membuat tidak perlu menampilkan notifikasi. 
	user sipa yang melakukan dan isi datanya.
	(notifiksai) 

4. apa yang perlu dipersiapkan. ?
