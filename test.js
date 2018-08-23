var dateformat = require('dateformat');
var now = new Date()
dateformat.masks.absensi = 'HH:MM'
let latestAbsensi = dateformat(now, "absensi");
console.log(dateformat(now, "absensi"));
console.log(latestAbsensi)

dateformat.masks.tanggalLahir = 'yyyy:mmmm:dd HH:MM'
let tanggalLahir = dateformat('1994/10/05 12:05', "tanggalLahir")
console.log(tanggalLahir)