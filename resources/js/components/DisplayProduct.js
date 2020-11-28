import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';

class DisplayProduct extends Component {
  constructor(props) {
       super(props);
       this._isMounted = false;
       this.state = {value: '', products: [] };
     }
     componentDidMount(){
       this._isMounted = true;
       axios.get(MyGlobleSetting.url + '/api/products')
       .then(response => {
         const products = response.data;
         this.setState({ products });
       })
       .catch(function (error) {
         console.log(error);
       })
     }

     componentWillUnmount() {
        this._isMounted = false;
     }

     tabRow(){
       if(this.state.products instanceof Array){
         return this.state.products.map(function(object, i){
             return <TableRow obj={object} key={i} />;
         })
       }
     }

     confirmDelete(id) {
      let uri = MyGlobleSetting.url + `/api/products/${id}`;
      axios.delete(uri);
      this.componentDidMount();
    }


  render(){
    const { products } = this.state
    return (
      <div>
        <h1>Products</h1>


        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/add-item">Create Product</Link>
          </div>
        </div><br />


        <table className="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Product Title</td>
                <td>Product Body</td>
                <td width="200px">Actions</td>
            </tr>
            </thead>
            <tbody>
            {products.map((object, i) => (
              <tr key={i}>
                <td>
                  {object.id}
                </td>
                <td>
                  {object.title}
                </td>
                <td>
                  {object.body}
                </td>
                <td>
                  <Link to={"edit/"+object.id} className="btn btn-primary">Edit</Link>
                 <input type="button" onClick={() => this.confirmDelete(object.id)} value="Delete" className="btn btn-danger"/>
                </td>
              </tr>
              ))}
            </tbody>
        </table>
    </div>
    )
  }
}
export default DisplayProduct;