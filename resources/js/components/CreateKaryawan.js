import React, {Component} from 'react';
import Select from 'react-select'
import {browserHistory} from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';


class CreateKaryawan extends Component {
  constructor(props){
    super(props);
    this.state = {karvNamaKar: '', karvAlamat: '' , divisi: [] , jabatan: [] , kariDivisiId: '', kariJabatanId: '' , karnamajab: '' , karnamadiv:'' };

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

    componentDidMount(){
     this._isMounted = true;
       axios.get(MyGlobleSetting.url + '/api/test/getDiv')
       .then(response => {
         const data = response.data;
         const options = data.map(d => ({
            "value" : d.iDivisiId,
            "label" : d.vNamaDiv
          }))
         this.setState({divisi: options});
       })
       .catch(function (error) {
         console.log(error);
       })

       axios.get(MyGlobleSetting.url + '/api/test/getJab')
       .then(response => {
         const data = response.data;
         const options = data.map(d => ({
            "value" : d.iJabatanId,
            "label" : d.vNamaJab
          }))
         this.setState({jabatan: options});
       })
       .catch(function (error) {
         console.log(error);
       })
   }

  handleChange1(e){
    this.setState({
      karvNamaKar: e.target.value
    })
  }
  handleChange2(e){
    this.setState({
      karvAlamat: e.target.value
    })
  }
  handleChange3(e){
    this.setState({
      kariDivisiId:e.value, 
      karnamadiv:e.label
    })
  }
  handleChange4(e){
    this.setState({
      kariJabatanId:e.value, 
      karnamajab:e.label
    })
  }

  handleSubmit(e){
    e.preventDefault();
    const karyawan = {
      iDivisiId: this.state.kariDivisiId,
      iJabatanId: this.state.kariJabatanId,
      vNamaKar: this.state.karvNamaKar,
      vAlamat: this.state.karvAlamat
    }
    let uri = MyGlobleSetting.url + '/api/karyawan';
    axios.post(uri, karyawan).then((response) => {
      browserHistory.push('/display-item');
    });
  }


    render() {
      return (
      <div>
        <h1>Create Karyawan</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Nama Karyawan:</label>
                <input type="text" className="form-control" onChange={this.handleChange1} />
              </div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Divisi:</label>
                <Select options={this.state.divisi} onChange={this.handleChange3}  />
              </div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Jabatan:</label>
                <Select onChange={this.handleChange4} options={this.state.jabatan} />
              </div>
            </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Alamat:</label>
                  <textarea className="form-control col-md-6" onChange={this.handleChange2}></textarea>
                </div>
              </div>
            </div><br />
            <div className="form-group">
              <button className="btn btn-primary">Add Karyawan</button>
            </div>
        </form>
  </div>
      )
    }
}
export default CreateKaryawan;