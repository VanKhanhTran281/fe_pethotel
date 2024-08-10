import { ArrowRightOutlined } from "@ant-design/icons";

  const FilterPrice: React.FC = () => {
    return (
      <fieldset style={{ border: 'none',display:'flex',flexDirection:'column',gap:'10px', marginTop:'20px'}}>
        <div>Tìm kiếm theo giá:</div>
        <div style={{display:'flex',gap:'5px'}}>
            <div style={{display:'flex',gap:'5px'}}>
                <button style={{backgroundColor:'#B3AE41',border:'none'}}>Từ</button>
                <input type="text" style={{width:'70px',outline:'none'}}/>
            </div>
            <ArrowRightOutlined />
            <div style={{display:'flex',gap:'5px'}}>
                <button style={{backgroundColor:'#B3AE41',border:'none'}}>Đến</button>
                <input type="text" style={{width:'70px',outline:'none'}}/>
            </div>
        </div>
        <button style={{backgroundColor:'#B3AE41',width:'260px',height:'25px',outline:'none',border:'none'}}>LỌC</button>
      </fieldset>
    );
  };
  
  export default FilterPrice;