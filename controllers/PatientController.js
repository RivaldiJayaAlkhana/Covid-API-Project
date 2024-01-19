// import Model Patient
const Patient = require("../models/Patient");

// buat class PatientController
class PatientController {
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.
    const patients = await Patient.all();

    if(patients.length > 0) {
      const data = {
        message: "Menampilkkan semua pasien",
        data: patients,
      };
  
      return res.status(200).json(data);
    }

    //else
    const data = {
      message: "Data pasien tidak ada",
    };
    return res.status(200).json(data);
    
  }

  async store(req, res) {
    // validasi sederhana
    // handle jika salah satu data tidak dikirim

    //destructing object req.body
    const {name, phone, address, status, in_date_at, out_date_at} = req.body;

    //jika data undefined maka kirim response error
    if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
      const data = {
        message: "Semua data harus dikirim",
      };

      return res.status(422).json(data);
    }

    // else
    const patient = await Patient.create(req.body);

    const data = {
      message: "Menambahkan data Pasien",
      data: patient,
    };

    return res.status(201).json(data);
  }

  async update(req, res) {
    const { id } = req.params;
    const patientToUpdate = await Patient.find(id);
  
    if (!patientToUpdate) {
      const data = {
        message: `Pasien tidak ditemukan`,
      };
      return res.status(404).json(data);
    }
  
    const updatedPatient = await Patient.update(id, req.body);
    const data = {
      message: `Mengedit data pasien`,
      data: updatedPatient,
    };
  
    res.status(200).json(data);
  }
  

  async destroy(req, res) {
    const { id } = req.params;
    const patientToDelete = await Patient.find(id);
  
    if (!patientToDelete) {
      const data = {
        message: `Pasien tidak ditemukan`,
      };
      return res.status(404).json(data);
    }
  
    await Patient.delete(id);
  
    const data = {
      message: `Menghapus data pasien`,
    };
  
    res.status(200).json(data);
  }
  

  async show(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);
  
    if (!patient) {
      const data = {
        message: `Pasien tidak ditemukan`,
      };
      return res.status(404).json(data);
    }
  
    const data = {
      message: `Menampilkan detail Pasien`,
      data: patient,
    };
  
    res.status(200).json(data);
  }


  async positive(req, res) {
    // Mengambil data positif dari database menggunakan model Patient
    const positiveResourceData = await Patient.getPositiveResources();

    if (positiveResourceData.length === 0) {
      const response = {
        message: "Tidak ada pasien yang positif",
      };
      return res.status(404).json(response);
    }

    const responseData = {
      message: "Menampilkan Pasien Positif",
      total: positiveResourceData.length,
      data: positiveResourceData,
    };

    res.status(200).json(responseData);
  }

  async recovered(req, res) {
    // Mengambil data pasien dengan status "recovered" dari database menggunakan model Patient
    const recoveredResourceData = await Patient.getRecoveredResources();

    if (recoveredResourceData.length === 0) {
      const response = {
        message: "Tidak ada pasien yang sembuh",
      };
      return res.status(404).json(response);
    }

    const responseData = {
      message: "Menampilkan Pasien yang telah sembuh",
      total: recoveredResourceData.length,
      data: recoveredResourceData,
    };

    res.status(200).json(responseData);
  }

  async dead(req, res) {
    const deadResourceData = await Patient.getDeadResources();

    if (deadResourceData.length === 0) {
      const response = {
        message: "Tidak ada pasien yang telah meninggal",
      };
      return res.status(404).json(response);
    }

    const responseData = {
      message: "Menampilkan Pasien yang Telah Meninggal",
      total: deadResourceData.length,
      data: deadResourceData,
    };

    res.status(200).json(responseData);
  }

  async search(req, res) {
    const { name } = req.params;

    const searchedResourceData = await Patient.getByName(name);

    if (searchedResourceData.length === 0) {
      const response = {
        message: "Data Pasien tidak ada",
      };
      return res.status(404).json(response);
    }

    const responseData = {
      message: "Data Pasien ditemukan",
      data: searchedResourceData,
    };

    res.status(200).json(responseData);
  }
  
}





// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
