import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';

class DisplayKaryawan extends Component {
  constructor(props) {
       super(props);
       this._isMounted = false;
       this.state = {value: '', karyawan: [] };
     }
     componentDidMount(){
       this._isMounted = true;
       axios.get(MyGlobleSetting.url + '/api/karyawan')
       .then(response => {
         const karyawan = response.data;
         this.setState({ karyawan });
       })
       .catch(function (error) {
         console.log(error);
       })
     }

     componentWillUnmount() {
        this._isMounted = false;
     }

     // tabRow(){
     //   if(this.state.products instanceof Array){
     //     return this.state.products.map(function(object, i){
     //         return <TableRow obj={object} key={i} />;
     //     })
     //   }
     // }

     confirmDelete(id) {
      let uri = MyGlobleSetting.url + `/api/karyawan/${id}`;
      axios.delete(uri);
      this.componentDidMount();
    }


  render(){
    const { karyawan } = this.state
    return (
      <div>
        <h1>Karyawan</h1>


        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/add-item">Create Karyawan</Link>
          </div>
        </div><br />


        <table className="table table-hover">
            <thead>
            <tr>
                <td>Karyawan ID</td>
                <td>Nama</td>
                <td>Divisi</td>
                <td>Jabatan</td>
                <td>Alamat</td>
                <td width="200px">Actions</td>
            </tr>
            </thead>
            <tbody>
            {karyawan.map((object, i) => (
              <tr key={i}>
                <td>
                  {object.iKaryawanId}
                </td>
                <td>
                  {object.vNamaKar}
                </td>
                <td>
                  {object.vNamaDiv}
                </td>
                <td>
                  {object.vNamaJab}
                </td>
                <td>
                  {object.vAlamat}
                </td>
                <td>
                  <Link to={"edit/"+object.iKaryawanId} className="btn btn-primary">Edit</Link>
                 <input type="button" onClick={() => this.confirmDelete(object.iKaryawanId)} value="Delete" className="btn btn-danger"/>
                </td>
              </tr>
              ))}
            </tbody>
        </table>
    </div>
    )
  }
}
export default DisplayKaryawan;