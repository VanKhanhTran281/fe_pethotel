import { ArrowRightOutlined, CheckCircleFilled, FilterOutlined } from '@ant-design/icons/lib/icons'
import { Select, Space } from 'antd'
import { useState } from 'react';
// import DropDown from '../../services/service/function/dropdown';
// import { datadropdown } from '../../services/service/data/data_dropdown';
// import FilterPrice from '../../services/service/function/filter_price';
import ProductDog from './product';
import ProductCat from '../cat/product';
import './index.css'

const Dog: React.FC = () => {

    const [sizeFilterS, setSizeFilterS] = useState<string | null>(null);
    const [sizeFilterM, setSizeFilterM] = useState<string | null>(null);
    const [sizeFilterL, setSizeFilterL] = useState<string | null>(null);
    const [sizeFilterXL, setSizeFilterXL] = useState<string | null>(null);
    const [fromPrice, setFromPrice] = useState<number | null>(null);
    const [toPrice, setToPrice] = useState<number | null>(null);
    const handleFilter = () => {
        const fromPriceValue = parseFloat(
            (document.getElementById('from-price') as HTMLInputElement)?.value || '1'
        );
        const toPriceValue = parseFloat(
            (document.getElementById('to-price') as HTMLInputElement)?.value || '8000000'
        );
        setFromPrice(fromPriceValue);
        setToPrice(toPriceValue);
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '1450px', marginTop: '20px' }}>
                <div>
                    <img src="/img/slider2.jpg" alt="" style={{ width: '1450px', height: '300px' }} />
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '1350px' }}>
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <div style={{ width: '307px', height: '700px', border: '1px solid #dee2e6' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <FilterOutlined style={{ fontSize: '25px' }} />
                                    <p style={{ fontSize: '20px', fontWeight: '600' }}>Bộ lọc tìm kiếm</p>
                                </div>
                                <fieldset style={{ border: 'none' }}>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <legend style={{ fontSize: '17px' }}>Lọc theo size</legend>
                                        <div>
                                            <label htmlFor="" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div>
                                                    <input type="checkbox" onClick={() => setSizeFilterS(sizeFilterS === 'S' ? null : 'S')} />
                                                </div>
                                                <span style={{ fontSize: '13px' }}>Chuồng size S</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div>
                                                    <input type="checkbox" onClick={() => setSizeFilterM(sizeFilterM === 'M' ? null : 'M')} />
                                                </div>
                                                <span style={{ fontSize: '13px' }}>Chuồng size M</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div>
                                                    <input type="checkbox" onClick={() => setSizeFilterL(sizeFilterL === 'L' ? null : 'L')}
                                                        style={{ backgroundColor: sizeFilterL === 'L' ? 'blue' : 'white' }} />
                                                </div>
                                                <span style={{ fontSize: '13px' }}>Chuồng size L</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div>
                                                    <input type="checkbox" onClick={() => setSizeFilterXL(sizeFilterXL === 'XL' ? null : 'XL')}
                                                        style={{ backgroundColor: sizeFilterXL === 'XL' ? 'blue' : 'white' }} />
                                                </div>
                                                <span style={{ fontSize: '13px' }}>Chuồng size XL</span>
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset style={{ border: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                                    <div>Tìm kiếm theo giá:</div>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <button style={{ backgroundColor: '#B3AE41', border: 'none' }}>Từ</button>
                                            <input type="text" id="from-price" style={{ width: '70px', outline: 'none' }} />
                                        </div>
                                        <ArrowRightOutlined />
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <button style={{ backgroundColor: '#B3AE41', border: 'none' }}>Đến</button>
                                            <input type="text" id="to-price" style={{ width: '70px', outline: 'none' }} />
                                        </div>
                                    </div>
                                    <button style={{ backgroundColor: '#B3AE41', width: '260px', height: '25px', outline: 'none', border: 'none' }} onClick={handleFilter}>LỌC</button>
                                </fieldset>
                                <fieldset style={{ border: 'none', marginTop: '30px', display: "flex", flexDirection: "column" }}>
                                    <div style={{ marginTop: '20px', textAlign: 'center', fontWeight: '600', fontSize: "20px" }}>Dịch vụ thú cưng được nhận khi ở khách sạn</div>
                                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <CheckCircleFilled />
                                            <div>2-3 bữa mỗi ngày</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <CheckCircleFilled />
                                            <div>Vệ sinh chuồng mỗi ngày</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <CheckCircleFilled />
                                            <div>Vui chơi mỗi ngày 2 lần</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <CheckCircleFilled />
                                            <div>Phòng có điều hòa 24/7</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <CheckCircleFilled />
                                            <div>Cung cấp ảnh các bé mỗi ngày</div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                <div style={{ height: '36px', width: '1020px', display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <p style={{ fontSize: '36px', fontWeight: '700',marginBottom:'0px' }}>Phòng khách sạn dành cho thú cưng</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '20px', fontWeight: '700' }}>Khách sạn dành cho chó</p>
                                    <ProductDog
                                        fromPrice={fromPrice}
                                        toPrice={toPrice}
                                        sizeFilterS={sizeFilterS}
                                        sizeFilterM={sizeFilterM}
                                        sizeFilterL={sizeFilterL}
                                        sizeFilterXL={sizeFilterXL}
                                    />
                                </div>
                                <div>
                                    <p style={{ fontSize: '20px', fontWeight: '700' }}>Khách sạn dành cho mèo</p>
                                    <ProductCat
                                        fromPrice={fromPrice}
                                        toPrice={toPrice}
                                        sizeFilterS={sizeFilterS}
                                        sizeFilterM={sizeFilterM}
                                        sizeFilterL={sizeFilterL}
                                        sizeFilterXL={sizeFilterXL}
                                    />
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
                        <h2>BẢNG GIÁ KHÁCH SẠN DÀNH CHO MÈO</h2>
                        <div >
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div className="hover_block" style={{ width: '592px', height: '281px', color: '#fff', backgroundColor: '#ffb703', borderRadius: '10px', display: 'flex' }}>
                                    <div style={{ width: '207px', borderRight: '1px solid #fff', padding: '25px 15px' }}>
                                        <div style={{ fontSize: '24px', textAlign: 'center', marginTop: '20px' }}>Size M: Các bé mèo dưới 3kg</div>
                                        <div style={{ width: '60%', height: '2px', margin: 'auto', backgroundColor: '#fff', marginTop: '10px' }}></div>
                                        <div style={{ fontSize: '26px', fontWeight: '700', marginTop: '20px' }}>120.000vnd</div>
                                        <div style={{ fontSize: '18px', textAlign: 'right', fontStyle: 'italic' }}>trên ngày</div>
                                    </div>
                                    <div style={{ width: '385px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <CheckCircleFilled />
                                                <div>2-3 bữa mỗi ngày</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <CheckCircleFilled />
                                                <div>Vệ sinh chuồng mỗi ngày</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <CheckCircleFilled />
                                                <div>Vui chơi mỗi ngày 2 lần</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <CheckCircleFilled />
                                                <div>Phòng có điều hòa 24/7</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <CheckCircleFilled />
                                                <div>Cung cấp ảnh các bé mỗi ngày</div>
                                            </div>
                                        </div>
                                        <div style={{ marginLeft: '300px' }}>
                                            <img src="https://fagopet.vn/tassets/images/img_2.png" alt="" width='50px' style={{ right: '20px', bottom: '20px' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="hover_block" style={{ width: '592px', height: '281px', color: '#fff', backgroundColor: '#8ecae6', borderRadius: '10px', display: 'flex' }}>
                                    <div style={{ width: '207px', borderRight: '1px solid #fff', padding: '25px 15px' }}>
                                        <div style={{ fontSize: '24px', textAlign: 'center', marginTop: '20px' }}>Size L: Các bé mèo trên 3kg</div>
                                        <div style={{ width: '60%', height: '2px', margin: 'auto', backgroundColor: '#fff', marginTop: '10px' }}></div>
                                        <div style={{ fontSize: '26px', fontWeight: '700', marginTop: '20px' }}>150.000vnd</div>
                                        <div style={{ fontSize: '18px', textAlign: 'right', fontStyle: 'italic' }}>trên ngày</div>
                                    </div>
                                    <div style={{ width: '385px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <CheckCircleFilled />
                                                <div>2-3 bữa mỗi ngày</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <CheckCircleFilled />
                                                <div>Vệ sinh chuồng mỗi ngày</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <CheckCircleFilled />
                                                <div>Vui chơi mỗi ngày 2 lần</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <CheckCircleFilled />
                                                <div>Phòng có điều hòa 24/7</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <CheckCircleFilled />
                                                <div>Cung cấp ảnh các bé mỗi ngày</div>
                                            </div>
                                            <div style={{ marginLeft: '300px' }}>
                                                <img src="https://fagopet.vn/tassets/images/img_2.png" alt="" width='50px' style={{ right: '20px', bottom: '20px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '50px' }}>
                    <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
                        <h2>BẢNG GIÁ KHÁCH SẠN DÀNH CHO CHÓ</h2>
                        <div style={{ display: 'flex', gap: '20px', color: '#fff' }}>
                            <div className="hover_block" style={{ padding: '0px 20px', width: '384.66px', height: '500px', backgroundColor: '#fb8500', borderRadius: '10px' }}>
                                <div style={{ fontSize: '26px', marginTop: '25px' }}>Size M: Các bé chó dưới 5kg</div>
                                <div style={{ width: '30%', height: '2px', backgroundColor: '#fff', marginTop: '20px' }}></div>
                                <div style={{ fontSize: '26px', textAlign: 'right', fontWeight: '700', marginTop: '20px' }}>150.000vnd</div>
                                <div style={{ fontSize: '18px', textAlign: 'right', fontStyle: 'italic' }}>trên ngày</div>
                                <img src="https://fagopet.vn/tassets/images/img_3.png" alt="" width='120px' />
                                <div style={{ textAlign: 'right' }}>
                                    <img src="https://fagopet.vn/tassets/images/img_4.png" alt="" width='50px' />
                                </div>
                                <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>2-3 bữa mỗi ngày</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Vệ sinh chuồng mỗi ngày</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Vui chơi mỗi ngày 2 lần</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Phòng có điều hòa 24/7</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Cung cấp ảnh các bé mỗi ngày</div>
                                    </div>
                                </div>
                            </div>
                            <div className="hover_block" style={{ padding: '0px 20px', width: '384.66px', height: '500px', backgroundColor: '#219ebc', borderRadius: '10px' }}>
                                <div style={{ fontSize: '26px', marginTop: '25px' }}>Size L: Các bé chó dưới 5kg</div>
                                <div style={{ width: '30%', height: '2px', backgroundColor: '#fff', marginTop: '20px' }}></div>
                                <div style={{ fontSize: '26px', textAlign: 'right', fontWeight: '700', marginTop: '20px' }}>180.000vnd</div>
                                <div style={{ fontSize: '18px', textAlign: 'right', fontStyle: 'italic' }}>trên ngày</div>
                                <img src="https://fagopet.vn/tassets/images/img_3.png" alt="" width='120px' />
                                <div style={{ textAlign: 'right' }}>
                                    <img src="https://fagopet.vn/tassets/images/img_4.png" alt="" width='50px' />
                                </div>
                                <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>2-3 bữa mỗi ngày</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Vệ sinh chuồng mỗi ngày</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Vui chơi mỗi ngày 2 lần</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Phòng có điều hòa 24/7</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Cung cấp ảnh các bé mỗi ngày</div>
                                    </div>
                                </div>
                            </div>
                            <div className="hover_block" style={{ padding: '0px 20px', width: '384.66px', height: '500px', backgroundColor: '#ffb703', borderRadius: '10px' }}>
                                <div style={{ fontSize: '26px', marginTop: '25px' }}>Size XL: Các bé chó dưới 5kg</div>
                                <div style={{ width: '30%', height: '2px', backgroundColor: '#fff', marginTop: '20px' }}></div>
                                <div style={{ fontSize: '26px', textAlign: 'right', fontWeight: '700', marginTop: '20px' }}>220.000vnd</div>
                                <div style={{ fontSize: '18px', textAlign: 'right', fontStyle: 'italic' }}>trên ngày</div>
                                <img src="https://fagopet.vn/tassets/images/img_3.png" alt="" width='120px' />
                                <div style={{ textAlign: 'right' }}>
                                    <img src="https://fagopet.vn/tassets/images/img_4.png" alt="" width='50px' />
                                </div>
                                <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>2-3 bữa mỗi ngày</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Vệ sinh chuồng mỗi ngày</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Vui chơi mỗi ngày 2 lần</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Phòng có điều hòa 24/7</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <CheckCircleFilled />
                                        <div>Cung cấp ảnh các bé mỗi ngày</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '50px' }}>
                    <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
                        <h2>QUY TRÌNH CHĂM SÓC THÚ CƯNG TẠI KHÁCH SẠN</h2>
                        <div>
                            <table style={{backgroundColor:'#219ebc',width:'1194px',borderRadius:'10px',color:'#fff'}}>
                                <thead style={{color:'black',height:'100px '}}>
                                    <tr>
                                        <th style={{textAlign:'center',fontSize:'20px',fontWeight:'700',borderRight:'1px solid #fff'}}>Các bước</th>
                                        <th style={{textAlign:'center',fontSize:'20px',fontWeight:'700'}}>Chi tiết công việc chăm sóc các bé chó mèo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{width:'200px',height:'70px',textAlign:'center',fontSize:'16px',fontWeight:'600',borderRight:'1px solid #fff',borderBottom:'1px solid #fff'}}>Bước 1</td>
                                        <td style={{textAlign:'left',borderBottom:'1px solid #fff',paddingLeft:'30px'}}>
                                            Vệ sinh chuồng trại cho các bé, giúp các bé luôn sạch sẽ, 
                                            không mắc bệnhtrong quá trình lưu trú tại khách sạn
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px',height:'70px',textAlign:'center',fontSize:'16px',fontWeight:'600',borderRight:'1px solid #fff',borderBottom:'1px solid #fff'}}>Bước 2</td>
                                        <td style={{textAlign:'left',borderBottom:'1px solid #fff',paddingLeft:'30px'}}>
                                            Cho các bé ăn sáng với thịt trộn cơm 
                                            (làm từ thịt sạch gồm gà, cá biển, chim cút, thịt bò và rau củ) 
                                            hoặc hạt Royal Canin, pate Royal Canin (nếu bé không ăn được cơm trộn thịt) 
                                            trong quá trình lưu trú tại khách sạn
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px',height:'70px',textAlign:'center',fontSize:'16px',fontWeight:'600',borderRight:'1px solid #fff',borderBottom:'1px solid #fff'}}>Bước 3</td>
                                        <td style={{textAlign:'left',borderBottom:'1px solid #fff',paddingLeft:'30px'}}>
                                            Kiểm tra sức khỏe thường xuyên cho các bé, 
                                            theo dõi những biểu hiện bất thường để kịp thời 
                                            đưa ra phương án thích hợp và thông báo cho cha mẹ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px',height:'70px',textAlign:'center',fontSize:'16px',fontWeight:'600',borderRight:'1px solid #fff',borderBottom:'1px solid #fff'}}>Bước 4</td>
                                        <td style={{textAlign:'left',borderBottom:'1px solid #fff',paddingLeft:'30px'}}>
                                            Cho các bé ăn trưa (chiều) với thịt trộn cơm 
                                            (làm từ thịt sạch gồm gà, cá biển, chim cút, thịt bò và rau củ) 
                                            hoặc hạt Royal Canin, pate Royal Canin (nếu bé không ăn được cơm trộn thịt)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px',height:'70px',textAlign:'center',fontSize:'16px',fontWeight:'600',borderRight:'1px solid #fff',borderBottom:'1px solid #fff'}}>Bước 5</td>
                                        <td style={{textAlign:'left',borderBottom:'1px solid #fff',paddingLeft:'30px'}}>
                                            Cho các bé vận động như chơi đồ chơi tại phòng hoặc đi dạo 
                                            vào buổi tối để nâng cao sức khỏe (có thể vận động riêng hoặc vận 
                                            động tập thể tùy theo yêu cầu của bố mẹ)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px',height:'70px',textAlign:'center',fontSize:'16px',fontWeight:'600',borderRight:'1px solid #fff',borderBottom:'1px solid #fff'}}>Bước 6</td>
                                        <td style={{textAlign:'left',borderBottom:'1px solid #fff',paddingLeft:'30px'}}>
                                            Cho các bé về chuồng nghỉ ngơi, có bổ sung hạt 
                                            Royal Canin để các bé tối đói có thể ăn
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px',height:'70px',textAlign:'center',fontSize:'16px',fontWeight:'600',borderRight:'1px solid #fff'}}>Bước 7</td>
                                        <td style={{textAlign:'left',paddingLeft:'30px'}}>
                                            Vệ sinh cơ thể cho các bé cứ mỗi 3 ngày / lần.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dog