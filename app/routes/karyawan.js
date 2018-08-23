let karyawanController = require('../controllers/karyawancontroller')

module.exports = (app) =>{
    app.get('/karyawan/:nip',isLoggedIn,karyawanController.detailKaryawan)
    app.get('/karyawan',isLoggedIn,karyawanController.listKaryawan)
    app.get('/karyawan/aktifkan/:nip',isLoggedIn,karyawanController.aktifkanKaryawan)
    app.get('/karyawan/nonaktifkan/:nip',isLoggedIn,karyawanController.nonAktifkanKaryawan)
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }
}

