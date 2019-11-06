import React,{ Component }from 'react';
import { connect } from 'dva';
import ProductList from './components/ProductList';

class Products extends Component { 

    componentDidMount() {
        const { dispatch } = this.props;
    
        if (dispatch) {
          dispatch({
            type: 'product/fetchProduct',
          });
        }
    }

    render() {
        let { proList } = this.props.product;
        return (
            <ProductList products={proList} />
        );
    }
};


export default connect(({ product }) => ({
    product
}))(Products);