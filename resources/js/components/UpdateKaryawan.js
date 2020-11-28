import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select'
import { Link, browserHistory } from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';


class UpdateKaryawan extends Component {
  constructor(props) {
      super(props);
      this.state = {getvaldivname: '' , getvaljabname: '' , selectedValuePlaceholder: 'select', karvNamaKar: '', karvAlamat: '' , divisi: [] , jabatan: [] , kariDivisiId: '', kariJabatanId: '' , karnamajab: '' , karnamadiv:'' };
      this.handleChange1 = this.handleChange1.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleChange3 = this.handleChange3.bind(this);
      this.handleChange4 = this.handleChange4.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount(){
    axios.get(MyGlobleSetting.url + `/api/karyawan/${this.props.params.iKaryawanId}/edit`)
    .then(response => {
      this.setState({ 
        getvaldivname: response.data.vNamaDiv, 
        getvaljabname: response.data.vNamaJab, 
        kariDivisiId: response.data.iDivisiId, 
        kariJabatanId: response.data.iJabatanId, 
        karvNamaKar: response.data.vNamaKar, 
        karvAlamat: response.data.vAlamat 
      });
    })
    .catch(function (error) {
      console.log(error);
    })

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


  handleSubmit(event) {
    event.preventDefault();
    const products = {
      iDivisiId: this.state.kariDivisiId,
      iJabatanId: this.state.kariJabatanId,
      vNamaKar: this.state.karvNamaKar,
      vAlamat: this.state.karvAlamat
    }
    let uri = MyGlobleSetting.url + '/api/karyawan/'+this.props.params.iKaryawanId;
    axios.patch(uri, products).then((response) => {
          browserHistory.push('/display-item');
    });
  }
  render(){
    return (
      <div>
        <h1>Update Karyawan</h1>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/display-item" className="btn btn-success">Return to Karyawan</Link>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Product Title</label>
                <input type="text"
                  className="form-control"
                  value={this.state.karvNamaKar}
                  onChange={this.handleChange1} />
            </div>


            <div className="form-group">
              <label>Divisi:</label>
              <Select
                placeholder={this.state.getvaldivname}
                options={this.state.divisi} 
                onChange={this.handleChange3} />
            </div>

            <div className="form-group">
              <label>Jabatan:</label>
              <Select 
                placeholder={this.state.getvaljabname} 
                options={this.state.jabatan} 
                onChange={this.handleChange4} /> 
            </div>
            

            <div className="form-group">
                <label name="product_body">Product Body</label>
                <textarea className="form-control"
                  onChange={this.handleChange2} value={this.state.karvAlamat}></textarea>  
            </div>


            <div className="form-group">
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
    )
  }
}
export default UpdateKaryawan;