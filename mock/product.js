const listData = (req,res)=>{
    console.log('req--------', req)
    console.log('res=---------', res)
    res.json([
        { name: 'dva', id: 1 },
        { name: 'antd', id: 2 }
    ])
}
export default {
    'GET /api/product': listData
}